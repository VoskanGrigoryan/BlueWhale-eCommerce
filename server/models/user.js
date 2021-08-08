import mongoose from 'mongoose';

var userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('users', userSchema);

export default User;
