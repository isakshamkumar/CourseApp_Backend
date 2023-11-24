import jwt from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express'
import { log } from 'console';
// const { Response } = require('express');
export const SECRET = 'SECr3ts';  // This should be in an environment variable in a real application

export const authenticateJwt = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      if(!user){
        return res.status(500).json({message:'User not found'});
      }
      if(typeof user ==="string"){
        return res.status(200).json({message:"something went wrong"});
      }
      // req.userId = user.id;
      req.headers["userId"]=user.id
      // console.log(req.headers);
      // console.log(req);
      
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// module.exports = {
//     authenticateJwt,
//     SECRET
// }