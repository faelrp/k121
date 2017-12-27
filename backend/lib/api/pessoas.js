module.exports = () => {

    const express = require('express');
    const router = express.Router();

    const controller = require('../collection/pessoaController')();

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