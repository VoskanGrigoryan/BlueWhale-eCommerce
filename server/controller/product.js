import Product from '../models/product.js';
import dotenv from 'dotenv';
import log4js from 'log4js';
import date from 'date-and-time';
import { errors, alerts } from '../util/constants.js';

dotenv.config();

const logger = log4js.getLogger('default');

//CREATE NEW PROD AND SEND TO DB
const newProduct = async (req, res) => {
    const { name, amount, description, alcoholLevel, price, imageUrl } = req.body;

    try {
        const productExists = await Product.findOne({ name: name });
        if (productExists) {
            return res.status(409).json({ error: errors.nameExists });
        }

        if (
            name === null ||
            name === '' ||
            name === undefined ||
            amount === '' ||
            amount === null ||
            amount === undefined ||
            description === '' ||
            description === null ||
            description === undefined ||
            alcoholLevel === '' ||
            alcoholLevel === null ||
            alcoholLevel === undefined ||
            price === '' ||
            price === null ||
            price === undefined
        ) {
            return res.status(409).json({ error: errors.payloadInvalid });
        }

        const currentTime = new Date();
        const newDate = date.format(currentTime, 'YYYY/MM/DD');

        const payload = {
            name: name,
            amount: amount,
            description: description,
            alcoholLevel: alcoholLevel,
            price: price,
            imageUrl: imageUrl,
            creationDate: newDate,
        };

        const newProduct = new Product(payload);
        newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(409).send({ error: err });
    }
};

//GET ALL PRODUCTS FROM DB
const getProducts = async (req, res) => {
    let products = await Product.find();

    if (products.length === 0) {
        return res.status(409).json({ alert: alerts.noProducts });
    }

    res.status(200).send(products);
};

//UPDATE SINGLE PRODUCT FROM DB
const updateProduct = async (req, res) => {
    let product = req.body;

    // let test = req.query;

    let selectedProd = await Product.findOne({ _id: product.id });
    let existingProdName = await Product.findOne({ name: product.name });

    if (existingProdName) {
        return res.status(409).json({ error: errors.productNameExists });
    }
    if (!selectedProd) {
        return res.status(409).json({ error: errors.productDoesntExist });
    }

    let payload = {
        name: product.name,
        amount: product.amount,
        description: product.description,
        alcoholLevel: product.alcoholLevel,
        price: product.price,
    };

    // Find the existing resource by finding the product ID
    Product.findByIdAndUpdate(
        selectedProd._id,
        payload,
        { new: true },
        (err, payload) => {
            if (err) return res.status(500).send(err);
            return res.send(payload);
        }
    );
};

//DELETE SINGLE PRODUCT FROM DB
const deleteProduct = async (req, res) => {
    // let test = req.query;
    let selectedProd = await Product.findOne({ name: req.body.name });

    if (!selectedProd) {
        return res.status(404).json({ error: errors.productDoesntExist });
    }

    Product.findByIdAndRemove(selectedProd._id, (err, selectedProd) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: 'Product deleted succesfully!',
            id: selectedProd._id,
        };
        return res.status(200).send(response);
    });
};

export { newProduct, getProducts, updateProduct, deleteProduct };
