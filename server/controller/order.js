import Order from '../models/order.js';
import User from '../models/user.js';
import dotenv from 'dotenv';
import path from 'path';
import nodemailer from 'nodemailer';
import { errors } from '../util/constants.js';

dotenv.config();

//NODEMAILER CONFIG
const Transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    requireTLS: true,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
    },
});
const __dirname = path.resolve(path.dirname(''));

//CREATES ORDER
const createOrder = async (req, res) => {
    const { userID, cart, orderTime, arrivalTime, deliveryCost } = req.body;

    if (userID === undefined || userID === null || userID === '') {
        return res.status(409).send({ error: errors.userIDInvalid });
    }
    if (cart.products.length <= 0) {
        return res.status(409).send({ error: errors.noProductsInCart });
    }
    if (orderTime === undefined || orderTime === null || orderTime === '') {
        return res.status(409).send({ error: errors.noOrderTime });
    }
    if (
        arrivalTime === undefined ||
        arrivalTime === null ||
        arrivalTime === ''
    ) {
        return res.status(409).send({ error: errors.noArrivalTime });
    }
    if (
        deliveryCost === undefined ||
        deliveryCost === null ||
        deliveryCost === '' ||
        deliveryCost.value < 0
    ) {
        return res.status(409).send({ error: errors.noDeliveryCost });
    }

    //Could add option for order finished/in progress
    //So that I can store finished orders in the same collection
    const payload = {
        userID: userID,
        cart: cart.products,
        orderTime: orderTime,
        arrivalTime: arrivalTime,
        deliveryCost: deliveryCost,
    };

    const order = new Order(payload);
    order.save();

    res.status(200).send(payload);
};

//CONFIRMS ORDER & SEND EMAIL NOTIFICATION
const confirmOrder = async (req, res) => {
    //ORDER DETAILS LIKE PRODUCT, PRICE MISSING!
    const { userID } = req.body;
    const payload = {};

    let orderExists = await Order.findOne({ userID: userID });
    // let orderExists = await User.findOne({ _id: userID });
    if (!orderExists) {
        payload.error = errors.orderDoesntExist;
        return res.status(409).send(payload);
    }

    const mailOptions = {
        from: 'Gmail',
        to: orderExists.email,
        subject: 'BlueWhale order purchase confirmation',
        html: `
            <img src="cid:unique@kreata.ee" width="1052" height="400"/>
            <h2>Hi!</h2> <h3>We wanted to let you know that the product you purchased has been successfully processed
            Remember that your order should arrive in the next 4-5 business days but it may take a little longer due to COVID.
            Also remember that you will need your ID the day that the delivery arrives so that our staff can verify your identity.
            <br />
            We thank you deeply for your purchase and we hope that you'll be more than satisfied with your order
            Best regards, <h2>BlueWhale™</h2> Sales Team
            </h3>`,
        attachments: [
            {
                filename: 'bwCover.png',
                path: __dirname + '\\util\\files\\bwCover.png',
                cid: 'unique@kreata.ee',
            },
        ],
    };

    Transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            payload.error = err;
            return res.status(500).send(payload);
        }
    });

    payload.alert =
        "CONGRATS YOU CONFIRMED YOUR PRODUCT, YOU'LL BE RECEIVING IT IN THE NEXT 4-5 BUSINESS DAYS!";

    res.status(200).send(payload);
};

export { createOrder, confirmOrder };
