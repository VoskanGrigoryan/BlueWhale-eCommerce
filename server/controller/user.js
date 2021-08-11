import User from '../models/user.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import log4js from 'log4js';
import path from 'path';
import jwt from 'jsonwebtoken';
// import jwt from 'json-web-token';

import { errors, notifications } from '../constants.js';

dotenv.config();
const __dirname = path.resolve(path.dirname(''));
const logger = log4js.getLogger('default');

//Nodemailer configuration
const Transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
    },
});

const registerUser = async (req, res) => {
    const userData = req.body;
    const { email, userName, password } = userData;

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
        return res.status(400).json({ error: errors.emailExists });
    }

    if (password == null || password == undefined || password.length < 5) {
        logger.error(errors.passwordInvalid);
        return res.status(409).json({ error: errors.passwordInvalid });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    userData.password = passwordHashed;

    const newUser = new User(userData);

    try {
        newUser.save();

        const mailOptions = {
            from: 'Gmail',
            to: email,
            subject: 'Account succesfully created!',
            html: `
            <img src="cid:unique@kreata.ee" width="1052" height="400"/>
            <h3>Hello ${userName}! This email was sent in order to notify you that an account was
            created for the online store <h2>BlueWhale™</h2> using the following email: ${email}
            If you did not create an account in this website please reach out to our support team. <br />
            <hr />Regards, BlueWhale Development Team
            </h3>`,
            attachments: [
                {
                    filename: 'bwCover.png',
                    path: __dirname + '\\files\\bwCover.png',
                    cid: 'unique@kreata.ee',
                },
            ],
        };

        //sending action
        Transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                logger.error(err);
                return err;
            }
            logger.info('Register notification email sent to user 👌');
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json({ err });
    }
};

const loginUser = async (req, res) => {
    const userData = req.body;
    const { email, password } = userData;

    let user = await User.findOne({ email: email });

    if (!user) {
        return (
            res.status(404).send({ error: 'No hay usuario' }),
            logger.error(errors.userDoesntExist)
        );
    }
    let userPassword = user.password;

    const validPassword = await bcrypt.compareSync(password, userPassword);

    if (!validPassword) {
        res.status(409).json({ error: 'Contraseña no valida' });
        logger.error(errors.passwordInvalid);
        return;
    }

    // const token = jwt.sign(
    //     {
    //         exp: Math.floor(Date.now() / 1000) + 60 * 60,
    //         data: { email: email, id: user._id },
    //     },
    //     process.env.ACCESS_TOKEN_SECRET
    // );

    try {
        let payload = {
            email: email,
            userName: user.userName,
            id: user._id,
        };

        //create the access token with the shorter lifespan
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
        });

        //create the refresh token with the longer lifespan
        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: process.env.REFRESH_TOKEN_LIFE,
        });

        payload.refreshToken = refreshToken;

        res.cookie('jwt', accessToken, { secure: true, httpOnly: true });
        logger.info(notifications.success + '👌');
        res.status(200).send(payload);
    } catch (err) {
        console.log(err);
    }
};

const allUsers = async (req, res) => {
    let users = await User.find();

    if (users.length === 0) {
        return res.status(409).json({ alert: alerts.noUsers });
    }

    res.status(200).send(users);
};

const test1 = (req, res) => {
    res.status(200).send('Testing a test');
};
export { registerUser, loginUser, test1, allUsers };
