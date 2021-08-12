import Product from '../models/product.js';
import dotenv from 'dotenv';
import log4js from 'log4js';
import { errors, alerts } from '../constants.js';

dotenv.config();

const logger = log4js.getLogger('default');

//CREATE NEW PROD AND SEND TO DB
const newProduct = async (req, res) => {
    const product = req.body;
    const { name, amount, description, alcoholLevel, price } = product;

    const productExists = await Product.findOne({ name: name });
    if (productExists) {
        return res.status(400).json({ error: errors.nameExists });
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
    const newProduct = new Product(product);

    try {
        newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ error: error });
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
    const product = req.body;

    let selectedProd = await Product.findOne({ name: product.name });

    // Find the existing resource by finding the product ID
    Product.findByIdAndUpdate(
        selectedProd._id,
        product,
        { new: true },
        (err, product) => {
            if (err) return res.status(500).send(err);
            return res.send(product);
        }
    );
};

//DELETE SINGLE PRODUCT FROM DB
const deleteProduct = async (req, res) => {
    let test = req.query;
    let selectedProd = await Product.findOne({ name: req.body.name });

    console.log(test);

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
