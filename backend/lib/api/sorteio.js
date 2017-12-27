/**
 * Modulo responsável por conter todos os metódos relacionados a rota Sorteio
 */
module.exports = () => {

    const express = require('express');
    const router = express.Router();

    const controller = require('../collection/pessoaController')();
    const sorteio = require('../sorteioSuffle.js');
    const email = require('../email.js');

    /**
     * Função relacionada ao Verb POST Sorteio, responsavel por realizar o sorteio e enviar o email
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Retorna as Pessoas ja com os amigos selecionados
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