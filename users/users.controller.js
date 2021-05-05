const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/login', login);
router.post('/register', register);
router.get('/current', getCurrent);
router.get('/:username', getByUserName);
router.put('/:username', update);
router.delete('/:username', _delete);

module.exports = router;

function login(req, res, next) {
    userService.login(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByUserName(req, res, next) {
    userService.getByUserName(req.params.username)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.username, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.username)
        .then(() => res.json({}))
        .catch(err => next(err));
}