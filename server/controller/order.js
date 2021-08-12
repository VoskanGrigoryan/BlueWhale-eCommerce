import Order from '../models/order.js';
import dotenv from 'dotenv';
import { errors } from '../util/constants.js';

dotenv.config();

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

export { createOrder };
