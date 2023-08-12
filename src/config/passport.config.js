import passport from 'passport';
import jwt from 'passport-jwt';
import { JWT_PRIVATE_KEY, extractCookie } from '../utils.js';
import { createHash, isValidPassword } from '../utils.js';

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {

    passport.use('register', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: JWT_PRIVATE_KEY,
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {

        const {first_name, last_name, email } = req.body
        try {
            const user = await UserModel.findOne({email: username})
            if(user) {
                console.log("User already exits");
                return done(null, false)
            }

            const newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password)
            }
            const result = await UserModel.create(newUser)
            
            return done(null, result)
        } catch (error) {
            return done("[LOCAL] Error al obtener user " + error)
        }


    }))      

    passport.use('login', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: JWT_PRIVATE_KEY,
        usernameField: 'email',
    }, async (email, password, done) => {
        try{
            const user = await userModel.findOne({ email });
            if (!user) return done(null, false, { message: 'User not found' });
            if (!isValidPassword(user, password)) return done(null, false, { message: 'Invalid password' });
            const token = generateToken(user);
            user.token = token;
            return done(null, user, { message: 'Logged in successfully' });
        } catch (err){
            return done(err);
        }
    }));

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: JWT_PRIVATE_KEY
    }, async (payload, done) => {
        try{
            return done(null, payload);
        } catch (err){
            return done(err);
        }
    }));
}

export default initializePassport;