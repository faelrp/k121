const config = require('config');
const mongoose = require('mongoose');

/**
 * Moduls that handler all things related to connection to the database.
 */
module.exports = () => {

    mongoose.Promise = Promise;

    /**
     * handler to connect into db
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
