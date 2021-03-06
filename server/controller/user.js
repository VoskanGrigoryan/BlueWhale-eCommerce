import User from '../models/user.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import log4js from 'log4js';
import path from 'path';
import jwt from 'jsonwebtoken';
// import jwt from 'json-web-token';

import { errors, notifications } from '../util/constants.js';

dotenv.config();
const __dirname = path.resolve(path.dirname(''));
const logger = log4js.getLogger('default');

//NODEMAILER CONFIG
const Transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
    },
});

//REGISTERS USER & SEND NOTIFICATION EMAIL
const registerUser = async (req, res) => {
    const userData = req.body;
    const { email, userName, password, phone, address, addressNumber, city, postalCode } =
        userData;

    const payload = {};
    let val = 0;

    //CHECKS IF THERE IS A BODY
    if (Object.keys(req.body).length === 0) {
        payload.error = errors.noPayload;
        return res.status(400).json(payload);
    }

    //EMAIL VALID: CHECKS THAT EMAIL FIELD EXISTS
    if (email === null || email === '' || email === undefined) {
        payload.error = errors.emailNotValid;
        return res.status(400).json(payload);
    }
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
        payload.error = errors.emailExists;
        return res.status(400).json(payload);
    }

    const validateEmail = (email) => {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(regexEmail)) {
            return val++;
        } else {
            return val--;
        }
    };
    validateEmail(email);

    //EMAIL VALID: CHECKS THAT THE EMAIL IS VALID STRING
    if (val === -1) {
        payload.error = errors.emailNotValid;
        return res.status(409).json(payload);
    }

    //PHONE VALID: CHECKS IF THERE IS A PHONE IN DB
    if (phone === null || phone === '' || phone === undefined) {
        payload.error = errors.phoneNotValid;
        return res.status(400).json(payload);
    }
    const phoneExists = await User.findOne({ phone: phone });
    if (phoneExists) {
        payload.error = errors.phoneExistsInDB;
        return res.status(400).json(payload);
    }

    //ADDRESS VALID: CHECKS ADDRESS & ADDRESS NUMBER
    if (address === null || address === '' || address === undefined) {
        payload.error = errors.addressExists;
        return res.status(400).json(payload);
    }

    if (addressNumber === null || addressNumber === '' || addressNumber === undefined) {
        payload.error = errors.addressNumberNotValid;
        return res.status(400).json(payload);
    }

    //USERNAME VALID: CHECKS IF USERNAME EXISTS & IF IT'S VALID
    if (userName === null || userName === '' || userName === undefined) {
        payload.error = errors.userNameInvalid;
        return res.status(400).json(payload);
    }
    const userNameExists = await User.findOne({ userName: userName });
    if (userNameExists) {
        payload.error = errors.userNameExists;
        return res.status(400).json(payload);
    }

    //PASSWORD VALID: CHECKS THAT THE PASSWORD FIELD EXISTS
    if (password === null || password === undefined || password.length < 5) {
        logger.error(errors.passwordInvalid);
        payload.error = errors.passwordInvalid;
        return res.status(409).json(payload);
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
            created for the online store <h2>BlueWhale???</h2> using the following email: ${email} and address ${address}.
            If you did not create an account in this website please reach out to our support team.</h3>
            <h3>Regards, BlueWhale Development Team</h3>`,
            attachments: [
                {
                    filename: 'bwCover.png',
                    path: __dirname + '\\util\\files\\bwCover.png',
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
            logger.info('Register notification email sent to user ????');
        });

        payload.email = email;
        payload.userName = userName;
        payload.password = password;

        res.status(200).json(payload);
    } catch (err) {
        res.status(400).json({ err });
    }
};

//LOGS IN THE USER AND SENDS BACK USER DATA & ACCESS TOKEN
const loginUser = async (req, res) => {
    const userData = req.body;
    const { email, password } = userData;

    let user = await User.findOne({ email: email });

    if (!user) {
        return (
            res.status(401).send({ error: errors.unathorizedLogin }),
            logger.error(errors.userDoesntExist)
        );
    }
    let userPassword = user.password;

    const validPassword = await bcrypt.compareSync(password, userPassword);

    if (!validPassword) {
        res.status(401).json({ error: errors.userDoesNotExist });
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
        const payload = {
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
        logger.info(notifications.success + '????');
        res.status(200).send(payload);
    } catch (err) {
        console.log(err);
    }
};

//ONLY FOR TESTING, SHOULD NOT BE USED IN APP
const allUsers = async (req, res) => {
    let users = await User.find();

    if (users.length === 0) {
        return res.status(409).json({ alert: alerts.noUsers });
    }

    res.status(200).send(users);
};

export { registerUser, loginUser, allUsers };
