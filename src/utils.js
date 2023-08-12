import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

export const JWT_PRIVATE_KEY = 'secret';
export const JWT_COOKIE_NAME = 'token';

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

export const generateToken = (user) => {
    const token = jwt.sign({ user }, JWT_PRIVATE_KEY, { expiresIn: '24h' });
    return token;
}

export const authenticateToken = (req, res, next) => {
    let token = req.headers.auth
    if (!token) token = req.signedCookies[JWT_PRIVATE_KEY].token;
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, JWT_PRIVATE_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    })
}

export const extractCookie = (req) => {
    let token = null;
    if (req && req.signedCookies) token = req.signedCookies[JWT_COOKIE_NAME];
    return token;
}

export const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, { session: false }, (err, user, info) => {
            if (err) return res.status(500).json({ message: err });
            if (!user) return res.status(401).json({ message: info.message });
            req.user = user;
            next();
        })(req, res, next);
    }
}