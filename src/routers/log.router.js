import { Router } from 'express';
import userModel from '../models/users.model.js';
import cartModel from '../models/cart.model.js';
import { JWT_COOKIE_NAME, isValidPassword } from '../utils.js';
import { generateToken, createHash } from '../utils.js';
import { loginMiddleware, registerMiddleware } from '../config/middleware.config.js';

const router = Router();

router.post('/in', loginMiddleware, async (req, res) => {
    const token = generateToken(user);
    res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true });
    res.status(200).json({ message: 'User logged in successfully' });
});

router.get('/out', (req, res) => {
    res.clearCookie(JWT_COOKIE_NAME)
    res.status(200).json({ message: 'User logged out successfully' });
});

router.post('/register', registerMiddleware, async (req, res) => {
        const token = generateToken(newUser);
        res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true });
        res.status(201).json({ message: 'User registered successfully' });
});

export default router;