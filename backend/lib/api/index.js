module.exports = () => {
    const router = require('express').Router();

    router.use('/pessoas', require('./pessoas')());

    return router;
};