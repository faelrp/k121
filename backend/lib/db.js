const config = require('config');
const mongoose = require('mongoose');

module.exports = () => {

    mongoose.Promise = Promise;

    let connect = async () => {

        return new Promise(async (resolve, reject) => { 

            let url = config.database.url;
    
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