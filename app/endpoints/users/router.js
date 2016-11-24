'use strict';

const express = require('express');
const router = express.Router();
const logger = require('modules/logger');
const _ = require('lodash');

router.get('/users', (req, res, next) => {
    let users = req.locals.data.users
    const havePet = req.query.havePet;
    if (havePet) {
        const pets = req.locals.data.pets;
        let userIdsWithPet = [];
        for (let i = 0; i < pets.length; i++) {
            if (pets[i].type == havePet && !userIdsWithPet.includes(pets[i].userId)) {
                userIdsWithPet.push(pets[i].userId);
            }
        }
        logger.debug(userIdsWithPet);

        users = _.sortBy(getUsersByUserIds(users, userIdsWithPet), 'id');

    }
    res.json(users);
});

router.get('/users/populate', (req, res, next) => {
    let users = req.locals.data.users
    const pets = req.locals.data.pets;
    const havePet = req.query.havePet;
    if (havePet) {
        let userIdsWithPet = [];
        for (let i = 0; i < pets.length; i++) {
            if (pets[i].type == havePet && !userIdsWithPet.includes(pets[i].userId)) {
                userIdsWithPet.push(pets[i].userId);
            }
        }
        logger.debug(userIdsWithPet);

        users = _.sortBy(getUsersByUserIds(users, userIdsWithPet), 'id');

    }

    for (let i = 0; i < users.length; i++) {
        users[i].pets = getAllUserPets(pets, users[i].id);
    }
    res.json(users);
});

const getAllUserPets = (pets, userId) => {
    let userPets = [];
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].userId == userId) {
            userPets.push(pets[i]);
        }
    }
    return userPets;
}

const getUsersByUserIds = (allUsers, userIds) => {
    let users = [];
    userIds.forEach(userId => {
        users.push(allUsers[userId - 1]);
    });
    return users;
}

router.param('id', (req, res, next, id) => {
    if (!isNumeric(id)) {
        return next('route');
    }
    const users = req.locals.data.users;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            req.locals.user = users[i];
            break;
        }
    }

    if (!req.locals.user) {
        return next('Not Found');
    }

    return next();
});

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

router.get('/users/:id', (req, res, next) => {
    res.json(req.locals.user);
});

router.get('/users/:id/pets', (req, res, next) => {
    const id = req.params.id;
    const pets = req.locals.data.pets;
    let userPets = [];
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].userId == id) {
            userPets.push(pets[i]);
        }
    }
    res.json(userPets);
});


router.get('/users/:id/populate', (req, res, next) => {
    const id = req.params.id;
    const pets = req.locals.data.pets;

    let userWithPets = req.locals.user;
    userWithPets.pets = getAllUserPets(pets, id);
    res.json(userWithPets);
});


router.param('username', (req, res, next, username) => {
    const users = req.locals.data.users;
    for (let i = 0; i < users.length; i++) {
        logger.debug(users[i].username)
        if (users[i].username == username) {
            req.locals.user = users[i];
            break;
        }
    }

    if (!req.locals.user) {
        return next('Not Found');
    }

    return next();
});

router.get('/users/:username', (req, res, next) => {
    res.json(req.locals.user);
});

router.get('/users/:username/pets', (req, res, next) => {
    const id = req.locals.user.id;
    const pets = req.locals.data.pets;
    let userPets = [];
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].userId == id) {
            userPets.push(pets[i]);
        }
    }
    res.json(userPets);
});

router.get('/users/:username/populate', (req, res, next) => {
    const id = req.locals.user.id;
    const pets = req.locals.data.pets;

    let userWithPets = req.locals.user;
    userWithPets.pets = getAllUserPets(pets, id);
    res.json(userWithPets);
});



module.exports = router;
