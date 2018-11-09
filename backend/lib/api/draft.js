/**
 * Module responsible to contain all handler for draw route
 */
module.exports = () => {

    const express = require('express');
    const router = express.Router();

    const controller = require('../collection/peopleController')();
    const sorteio = require('../drawSuffle.js');
    const email = require('../email.js');

    /**
     * Handler for POST verb on draw route
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Returns people with each matched friend
     */
    let post = async (req, res, next) => {

        try {

            let users = await controller.get();

            let usersShuffled = sorteio(users).doIt();

            await controller.updateAmigo(usersShuffled);

            email().send(usersShuffled);
            
            res.json(usersShuffled);
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    };

    router.post('/', post);

    return router;
};
