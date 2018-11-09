const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let definition = {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    amigo: { type: String, required: false }
};

let schema = new Schema(definition, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('Pessoa', schema);

