const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Database = require('../util/database');
const { extractUserId } = require('../util/helpers');

router.get('/users/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userId = extractUserId(req);
    const database = new Database();
    const client = database.fetchClientData(userId);

    const response = {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email
    };

    res.json(response);
});

router.get('/orders', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userId = extractUserId(req);
    const database = new Database();
    const orders = database.fetchClientOrders(userId);

    res.json(orders);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        try {
            if (err || !user) {
                const error = info && info.message
                    ? { publicMessage: info.message }
                    : new Error('An Error occured');
                return next(error);
            }
            req.login(user, { session: false }, (error) => {
                if (error) return next(error);
                const body = { _id: user.id, email: user.email };
                const token = jwt.sign({ user: body }, 'top_secret');
                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;
