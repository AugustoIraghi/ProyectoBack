import { JWT_PRIVATE_KEY, extractCookie } from '../utils.js';
import { createHash, isValidPassword } from '../utils.js';
import userModel from '../models/users.model.js';

export const registerMiddleware = async (req, res, next) => {
    const { email, password, first_name, last_name } = req.body;
    if (!email || !password || !first_name || !last_name) return res.status(400).json({ message: 'Some fields are missing' });
    if (await userModel.findOne({ email: email })) return res.status(400).json({ message: 'User already exists' });
    if (password.length < 6) return res.status(400).json({ message: 'Password too short' });
    try {
        const cart = new cartModel();
        await cart.save();
        const newUser = await userModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: createHash(password),
            cart: cart._id.toString()
        });
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const loginMiddleware = async (req, res, next) => {
    try{
        const { user } = req;
        const userDB = await userModel.findOne({ email: user.email });
        if (!userDB) return res.status(400).json({ message: 'User not found' });
        if (!isValidPassword(userDB.email, userDB.password)) return res.status(400).json({ message: 'Invalid password' });
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const authenticateToken = (req, res, next) => {
    let token = req.headers.auth
    if (!token) token = extractCookie(req);
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, JWT_PRIVATE_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    })
}