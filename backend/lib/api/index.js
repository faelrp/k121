/**
 * Modulo responsável por vincular a rota com o respectivo handle
 */
module.exports = () => {
    const router = require('express').Router();

    router.use('/pessoas', require('./pessoas')());
    router.use('/sorteio', require('./sorteio')());

    return router;
};