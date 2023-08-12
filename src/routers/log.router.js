import { Router } from 'express';
import userModel from '../models/users.model.js';
import cartModel from '../models/cart.model.js';
import { JWT_COOKIE_NAME } from '../utils.js';
import passport from 'passport';
import { generateToken, createHash } from '../utils.js';

const router = Router();

router.post('/in', passport.authenticate('login', { session: false }), async (req, res) => {
    const { user } = req;
    const token = generateToken(user);
    res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true });
    res.status(200).json({ message: 'User logged in successfully' });
});

router.get('/out', (req, res) => {
    res.clearCookie(JWT_COOKIE_NAME)
    res.status(200).json({ message: 'User logged out successfully' });
});

// router.post('/register', async (req, res) => {
//     const { email, password, first_name, last_name } = req.body;
//     if (!email || !password || !first_name || !last_name) return res.status(400).json({ message: 'Some fields are missing' });
//     if (await userModel.findOne({ email: email })) return res.status(400).json({ message: 'User already exists' });
//     if (password.length < 6) return res.status(400).json({ message: 'Password too short' });
//     try {
//         const cart = new cartModel();
//         await cart.save();
//         const newUser = await userModel.create({
//             first_name: first_name,
//             last_name: last_name,
//             email: email,
//             password: createHash(password),
//             cart: cart._id.toString()
//         });
//         const token = generateToken(newUser);
//         res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true });
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message, yo: 'emtra aca?' });
//     }
// });

router.post('/register', passport.authenticate('register'), async (req, res) => {
    const { user } = req;
    const token = generateToken(user);
    res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true });
    res.status(201).json({ message: 'User registered successfully' });
});

export default router;