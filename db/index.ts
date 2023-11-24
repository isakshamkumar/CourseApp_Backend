import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});

export const User = mongoose.model('Users', userSchema);
export const Todo = mongoose.model('Todos', todoSchema);

// module.exports = {
//     User,
//     Todo
// }