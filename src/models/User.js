import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name:  { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    role:       { type: String, default: 'user', enum: ['user', 'admin'] }
}, { timestamps: true }); 

export default model('User', userSchema);

