import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    description: { type: String, required: true },
    alcoholLevel: { type: String, requried: true },
    price: { type: Number, required: true },
});

const Product = mongoose.model('products', productSchema);

export default Product;
