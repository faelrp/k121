/**
 * Modulo responsável por conter todos os metódos relacionados a rota Pessoas
 */
module.exports = () => {

    const express = require('express');
    const router = express.Router();

    const controller = require('../collection/pessoaController')();

    /**
     * Função relacionada ao Verb GET Pessoas
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Todas as Pessoas cadastradas
     */
    let get = async (req, res, next) => {

        try {
            let result = await controller.get();
            res.json(result);
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    };

    /**
     * Função relacionada ao Verb GET Pessoas pelo ID
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Retorna uma pessoa com base no id da mesma
     */
    let getById = async (req, res, next) => {

        try {
            let result = await controller.get(req.params);
            res.json(result);
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    };

    /**
     * Função relacionada ao Verb PUT Pessoas
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Pessoa que foi atualizada
     */
    let put = async (req, res, next) => {

        try {
            let result = await controller.edit(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    };

    /**
     * Função relacionada ao Verb POST Pessoas, onde faz a inserção de uma nova pessoa
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Pessoa que foi inserida
     */
    let post = async (req, res, next) => {

        try {
            let result = await controller.insert(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    };

    /**
     * Função relacionada ao Verb DELETE Pessoas, responsavel por remover uma determinada
     * Pessoa pelo ID
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Pessoa que foi atualizada
     */
    let remove = async (req, res, next) => {

        try {
            let result = await controller.remove(req.params);
            res.json(result);
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    };

    router.get('/', get);
    router.get('/:id', getById);
    router.post('/', post);
    router.put('/', put);
    router.delete('/:id', remove);

    return router;
};