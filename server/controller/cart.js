import Cart from '../models/cart.js';
import User from '../models/user.js';
import dotenv from 'dotenv';
import date from 'date-and-time';
import { errors } from '../util/constants.js';

dotenv.config();

//CREATE NEW CART AND INSERT IN 'carts' COLLECTION
const newCart = async (req, res) => {
    const { userEmail } = req.body;

    const currentTime = new Date();
    const newDate = date.format(currentTime, 'YYYY/MM/DD HH:mm:ss');

    try {
        let user = await User.findOne({ email: userEmail });
        let cartExists = await Cart.findOne({ userID: user._id });

        if (cartExists) {
            return res.status(409).send({ error: errors.cartExists });
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

//ADDS AN ITEM TO THE CART
const addItem = async (req, res) => {
    const { userEmail } = req.body;

    let user = await User.findOne({ email: userEmail });
    let cartExists = await Cart.findOne({ userID: user._id });

    if (!cartExists) {
        return res.status(409).send({ error: errors.cartDoesntExist });
    }

    const payload = {
        products: req.body.products,
    };

    //useFindAndModify maybe a better approach? No time to test, findById works but might become deprecated
    Cart.findByIdAndUpdate(cartExists._id, payload, { new: true }, (err, payload) => {
        if (err) return res.status(500).send(err);
        return res.send(payload);
    });
};

const deleteItem = async (req, res) => {
    // Options with query params to long for cart option

    const { cartID, userID, productID } = req.body;

    if (!cartID || !userID) {
        return res.status(404).json({ error: errors.currentParamsNotValid });
    }

    let userCart = await Cart.findOne({ _id: cartID });

    if (!userCart) {
        return res.status(409).json({ error: errors.cantCartFindById });
    }

    const arrItems = userCart.products;
    if (arrItems.length > 0) {
        // const item = arrItems.find((item) => item.prodID === productID);

        let findItem = arrItems.findIndex((item) => {
            return item.prodID === productID;
        });

        if (findItem !== -1) arrItems.splice(findItem, 1);
    }

    const payload = {
        products: arrItems,
    };

    Cart.findByIdAndUpdate(cartID, payload, { new: true }, (err, payload) => {
        if (err) return res.status(500).send(err);
        return res.send(payload);
    });
};

//ONLY FOR TESTING, SHOULD NOT BE USED IN APP
const getCarts = async (req, res) => {
    let shoppingCarts = await Cart.find();

    if (shoppingCarts.length === 0) {
        return res.status(409).json({ alert: errors.noCartsInDB });
    }

    res.status(200).send(shoppingCarts);
};

export { newCart, getCarts, addItem, deleteItem };
