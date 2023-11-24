"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const { Response } = require('express');
exports.SECRET = 'SECr3ts'; // This should be in an environment variable in a real application
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!user) {
                return res.status(500).json({ message: 'User not found' });
            }
            if (typeof user === "string") {
                return res.status(200).json({ message: "something went wrong" });
            }
            // req.userId = user.id;
            req.headers["userId"] = user.id;
            // console.log(req.headers);
            // console.log(req);
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
// module.exports = {
//     authenticateJwt,
//     SECRET
// }
