"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const jwt = require("jsonwebtoken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const express = require('express');
const express_1 = __importDefault(require("express"));
const index_1 = require("../middleware/index");
const index_js_1 = require("../db/index.js");
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //also inn jwt verify and sign, we didnt need to explcitely write types , functionns of a library thjat has a callback functi0on--> these libraries already have types and are already inferred by ts
    const { username, password } = req.body;
    const user = yield index_js_1.User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new index_js_1.User({ username, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, index_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield index_js_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, index_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
router.get('/me', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const user = yield index_js_1.User.findOne({ _id: userId });
    if (user) {
        res.json({ username: user.username });
    }
    else {
        res.status(403).json({ message: 'User not logged in' });
    }
}));
// module.exports = router
exports.default = router;
