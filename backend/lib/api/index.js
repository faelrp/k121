/**
 * Module that bind all routes which theirs handlers.
 */
module.exports = () => {
    const router = require('express').Router();

    router.use('/pessoas', require('./people')());
    router.use('/sorteio', require('./draft')());

    return router;
};
