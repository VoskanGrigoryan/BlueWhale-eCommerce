import Order from '../models/order.js';
import User from '../models/user.js';
import dotenv from 'dotenv';
import path from 'path';
import nodemailer from 'nodemailer';
import date from 'date-and-time';
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
    const payload = {};

    if (userID === undefined || userID === null || userID === '') {
        payload.error = errors.userIDInvalid;
        return res.status(409).send({
            error: errors.userIDInvalid,
        });
    }
    if (cart.products.length <= 0) {
        payload.error = errors.noProductsInCart;
        return res.status(409).send({
            error: errors.noProductsInCart,
        });
    }
    if (orderTime === undefined || orderTime === null || orderTime === '') {
        payload.error = errors.noOrderTime;
        return res.status(409).send({
            error: errors.noOrderTime,
        });
    }
    if (arrivalTime === undefined || arrivalTime === null || arrivalTime === '') {
        payload.error = errors.noArrivalTime;
        return res.status(409).send({
            error: errors.noArrivalTime,
        });
    }
    if (
        deliveryCost === undefined ||
        deliveryCost === null ||
        deliveryCost === '' ||
        deliveryCost.value < 0
    ) {
        payload.error = errors.noDeliveryCost;
        return res.status(409).send({
            error: errors.noDeliveryCost,
        });
    }

    //Random Number generator for order ID
    // const orderID = Math.floor(100000 + Math.random() * 900000000000000);

    //Could add option for order finished/in progress
    //So that I can store finished orders in the same collection
    (payload.userID = userID),
        (payload.cart = cart.products),
        (payload.orderTime = orderTime),
        (payload.arrivalTime = arrivalTime),
        (payload.deliveryCost = deliveryCost);

    try {
        const order = new Order(payload);
        order.save();

        res.status(200).send(payload);
    } catch (err) {
        res.status(409).send(err);
    }
};

//CONFIRMS ORDER & SEND EMAIL NOTIFICATION
const confirmOrder = async (req, res) => {
    //ORDER DETAILS LIKE PRODUCT, PRICE MISSING!
    const { userID } = req.body;
    const payload = {};

    let orderExists = await Order.findOne({
        userID: userID,
    });
    let user = await User.findOne({ _id: userID });

    const { _id, orderTime, deliveryCost, cart } = orderExists;
    const { email, userName } = user;

    if (!orderExists) {
        payload.error = errors.orderDoesntExist;
        return res.status(409).send(payload);
    }

    console.log(cart);

    const formatDate = date.format(orderTime, 'ddd, MMM DD YYYY');
    const getProducts = () => {
        let elements = '';
        cart.forEach((element) => {
            elements += `<ul><li><strong>Product name:</strong> ${element.name}<ul>
                    <li><strong>Quantity</strong>: ${element.amount}</li>
                    <li><strong>Description: </strong>${element.description}</li>
                    <li><strong>Alcohol level:</strong> ${element.alcoholLevel}</li>
                    <li><strong>Price:</strong> $${element.price}</li></ul></li></ul>`;
        });

        return elements;
    };
    getProducts();

    const mailOptions = {
        from: 'Gmail',
        to: user.email,
        subject: 'BlueWhale order purchase confirmation',
        html: `
            <img src="cid:unique@kreata.ee" width="auto" height="400"/>
            <h2>Hello ${userName}!</h2>

            <h3 style="margin:0">
                From the BlueWhale sales team we wanted to let you know that your purchase has been confirmed and you'll
                be receiving your order in the next 3-5 business days. Remember that you'll need the order code for when
                the delivery arrives with your purchase. Order Code: ${_id}.
            </h3>
            <h3>
                This is the information regarding your purchase:
            </h3>
            <h3 style="margin:0">
                Order time: ${formatDate},

            </h3>
            <h3 style="margin:0">
                Delivery cost: ${deliveryCost}
            </h3>
            <h3>
                ${getProducts()}
            </h3>
            <h3>
                In case that you did not order any of these products please contact our support team! Someone might be
                using your email without your consent. <Strong>Support:</Strong> blue.whale.support@gmail.com
            </h3>
            <h3 style="margin:0">We thank for buying at our online store & we hope that you are happy with your purchase. Best regards, <h2>BlueWhale sales team</h2></h3>
            `,
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
