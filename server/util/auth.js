const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Database = require('./database');

// Create a passport middleware to handle User login
passport.use('login', new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, (username, password, done) => {
    try {
        const database = new Database();
        const user = database.fetchClient(username, true);

        if (user == null || user.password !== password) {
            return done(null, false, { message: 'Wrong username or password' });
        }

        return done(null, user, { message: 'Logged in successfully' });
    } catch (error) {
        return done(error);
    }
}));

// This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));
