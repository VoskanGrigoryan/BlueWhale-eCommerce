import Cart from '../models/cart.js';
import User from '../models/user.js';
import dotenv from 'dotenv';
import date from 'date-and-time';
import { errors, alerts } from '../constants.js';

dotenv.config();

// const logger = log4js.getLogger('default');

//CREATE NEW CART AND INSERT IN 'carts' COLLECTION
const newCart = async (req, res) => {
    const { userEmail } = req.body;

    const currentTime = new Date();
    const newDate = date.format(currentTime, 'YYYY/MM/DD HH:mm:ss');

    try {
        let user = await User.findOne({ email: userEmail });
        let cartExists = await Cart.findOne({ userID: user._id });

        if (cartExists) {
            return res
                .status(409)
                .send({ error: 'Cart already exists for this user' });
        }
        const payload = {
            userID: user._id,
            active: true,
            products: [],
            creationDate: newDate,
        };

        const shoppingCart = new Cart(payload);
        shoppingCart.save();

        res.status(200).send(payload);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const addItem = async (req, res) => {
    const { userEmail } = req.body;

    let user = await User.findOne({ email: userEmail });
    let cartExists = await Cart.findOne({ userID: user._id });

    console.log(cartExists);

    if (!cartExists) {
        return res.status(409).send({ error: "Cart doesn't exist" });
    }

    const payload = {
        products: req.body.products,
    };

    //useFindAndModify maybe a better approach? No time to test, findById works but might become deprecated
    Cart.findByIdAndUpdate(
        cartExists._id,
        payload,
        { new: true },
        (err, payload) => {
            if (err) return res.status(500).send(err);
            return res.send(payload);
        }
    );

    // const shoppingCart = new Cart(payload);
    // shoppingCart.save();

    // res.status(200).send(shoppingCart);
};

const deleteItem = async (req, res) => {};

const getCarts = async (req, res) => {
    let shoppingCarts = await Cart.find();

    if (shoppingCarts.length === 0) {
        return res.status(409).json({ alert: 'No shopping carts in the DB' });
    }

    res.status(200).send(shoppingCarts);
};

export { newCart, getCarts, addItem };
