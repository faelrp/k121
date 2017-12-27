module.exports = () => {
    const router = require('express').Router();

    router.use('/pessoas', require('./pessoas')());
    router.use('/sorteio', require('./sorteio')());

    return router;
};