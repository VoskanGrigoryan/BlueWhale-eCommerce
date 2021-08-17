import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, requried: true },
    addressNumber: { type: Number, required: true },
    city: { type: String, required: true },
    postalCode: { type: Number, required: true },
});

const User = mongoose.model('users', userSchema);

export default User;
