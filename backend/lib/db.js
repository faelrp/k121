const config = require('config');
const mongoose = require('mongoose');

/**
 * Modulo responsavel por conectar ao mongodb
 */
module.exports = () => {

    mongoose.Promise = Promise;

    /**
     * Função que fará a conexão
     */
    let connect = async () => {

        return new Promise(async (resolve, reject) => { 

            let database = config.database;

            let url = `mongodb://${database.user}:${database.pass}@${database.host}/${database.name}?ssl=${database.ssl}&replicaSet=${database.replicaSetName}&authSource=${database.authSource}`;
    
            try {
                await mongoose.connect(url, { useMongoClient: true });

                let message = `MongoDB - connected @ ${url}`;

                console.log(message);
                return resolve(message);
            } catch (error) {
                let message = `MongoDB - unabled to connect @ ${url} [${error.message}]`;
                
                console.log(message);
                return reject(message);
            }
        });
    };

    return {
        connect: connect
    };
};