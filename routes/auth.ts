
import jwt from 'jsonwebtoken'

import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
import { User } from "../db/index.js";
const router = express.Router();

  router.post('/signup', async (req, res) => {//we did not needed to defoine explicitely rytpes here in req and res because router if from x express and it have already predefrrined types but we had to do in midleware because the auithentiate middleware was a middleware tjhat we wrote, so its a function and typescripty foes not know that is was a middleqware and wasas like give me the types
    //also inn jwt verify and sign, we didnt need to explcitely write types , functionns of a library thjat has a callback functi0on--> these libraries already have types and are already inferred by ts
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req, res) => {
      const userId = req.headers["userId"]
      const user = await User.findOne({ _id: userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

  export default router;