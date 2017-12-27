module.exports = () => {

    const express = require('express');
    const router = express.Router();

    const controller = require('../collection/pessoaController')();
    const sorteio = require('../sorteioSuffle.js');
    const email = require('../email.js');

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