'use strict';

const express = require('express');
const router = express.Router();
const logger = require('modules/logger');
const _ = require('lodash');

router.get('/pets', (req, res, next) => {
    let aggregatedPets = req.locals.data.pets;

    const type = req.query.type;
    const age_gt = req.query.age_gt;
    const age_lt = req.query.age_lt;
    if (type) {
        aggregatedPets = getPetsByType(aggregatedPets, type);
    } 
    if(age_gt) {
        aggregatedPets = getPetsByAgeGt(aggregatedPets, age_gt);
    }

    if(age_lt) {
        aggregatedPets = getPetsByAgeLt(aggregatedPets, age_lt);
    }

    res.json(aggregatedPets);
});

const getPetsByType = (pets, type) => {
    let result = [];
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].type == type) {
            result.push(pets[i]);
        }
    }

    return result;
}


const getPetsByAgeLt = (pets, age_lt) => {
    let result = [];
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].age < age_lt) {
            result.push(pets[i]);
        }
    }
    return result;
}

const getPetsByAgeGt = (pets, age_gt) => {
    let result = [];
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].age > age_gt) {
            result.push(pets[i]);
        }
    }
    return result;
}

router.get('/pets/populate', (req, res, next) => {
	const pets = req.locals.data.pets;
	const users = req.locals.data.users;

	let result = []

	for (let i = 0; i < pets.length; i++) {
		let newPet = pets[i];
		newPet.user = users[pets[i].userId - 1];
        result.push(newPet);
    }

    const type = req.query.type;
    const age_gt = req.query.age_gt;
    const age_lt = req.query.age_lt;
    if (type) {
        result = getPetsByType(result, type);
    } 

    if(age_gt) {
        result = getPetsByAgeGt(result, age_gt);
    }

    if(age_lt) {
        result = getPetsByAgeLt(result, age_lt);
    }

    res.json(result);
});

router.param('id', (req, res, next, id) => {
    const pets = req.locals.data.pets;
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].id == id) {
            req.locals.pet = pets[i];
            break;
        }
    }

    if (!req.locals.pet) {
        return next('Not Found');
    }

    return next();
});

router.get('/pets/:id', (req, res, next) => {
    res.json(req.locals.pet);
});

router.get('/pets/:id/populate', (req, res, next) => {
	const users = req.locals.data.users;
	const pet = req.locals.pet;
	let populatedPet = pet;
	populatedPet.user = users[pet.userId - 1];
    res.json(populatedPet);
});

module.exports = router;
