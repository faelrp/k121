/**
 * Module responsible to contain all handler for people route
 */
module.exports = () => {

    const express = require('express');
    const router = express.Router();

    const controller = require('../collection/peopleController')();

    /**
     * Handler for GET verb for Poeple route
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Array of existing people
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
     * handler to get person by ID
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Returns the person that matchs with passed id
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
     * handler for PUT verb on people route
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Person that was updated.
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
     * Handler for POST verb on people route
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Person that was inserted.
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
     * Handler for DELETE verb on people route
     * 
     * @param {Object} req request
     * @param {*} res response
     * @param {*} next 
     * @return Person that was removed.
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
