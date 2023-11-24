"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// const mongoose = require("mongoose");/
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
const auth_1 = __importDefault(require("./routes/auth"));
// const authRoutes = require("./routes/auth");
// const todoRoutes = require("./routes/todo");
const todo_1 = __importDefault(require("./routes/todo"));
const cors = require("cors");
app.use(cors());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/todo", todo_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
mongoose_1.default.connect('mongodb+srv://ksaksham39:QW7RHJSn2I541PlH@cluster0.arjz0gc.mongodb.net/Todo_Data', { dbName: "Todo_Data" });
