import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    userID: { type: String, required: true },
    cart: [],
    orderTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    deliveryCost: { type: Number, required: true },
});

const Order = mongoose.model('orders', orderSchema);

export default Order;
