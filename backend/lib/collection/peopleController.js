const Pessoa = require('./peopleSchema');

/**
 * Model for People collection
 */
module.exports = () => {

    /**
     * gets all people or a person by id
     * @param {Object} data Contem o id da pessoa or undefined
     * @returns Um usuario espeifico ou todos
     */
    let get = (data) => {

        return new Promise(async (resolve, reject) => {

            try {
                let result;
                if (data && data.id) {
                    result = await Pessoa.findById(data.id);
                    console.log(`People - retrieved person id ${data.id}`);
                } else {
                    result = await Pessoa.find();
                    console.log('People - retrieved all People succesfully');
                }
                
                resolve(result);
            } catch (error) {
                console.log(`People - unabled to retrieve all People [${error.message}]`);
                reject(error.message);
            }    
        });
    };

    /**
     * inserts a new person
     * @param {Object} data
     * @returns return the inserted person.
     */
    let insert = (data) => {

        return new Promise(async (resolve, reject) => {

            try {
                let result = await new Pessoa(data).save();
                console.log('People - created successfully');
                
                resolve(result);
            } catch (error) {
                console.log(`People - unabled to create [${error.message}]`);
                reject(error.message);
            }    
        });
    };
    
    /**
     * Updates specific person
     * @param {Object} data 
     * @returns The Person object that was updated.
     */
    let edit = (data) => {
        
        return new Promise(async (resolve, reject) => {
                        
            try {
                let doc = await Pessoa.findById(data._id);
                
                doc.nome = data.nome;
                doc.email = data.email;

                let result = await doc.save();

                console.log('People - edited successfully');                

                resolve(result);
            } catch (error) {
                console.log(`People - unabled to edit [${error.message}]`);
                reject(error.message);                
            }
        });
    }

    /**
     * Removes a specific person
     * @param {Object} data 
     * @returns returna person that was removed from database
     */
    let remove = (data) => {
        
        return new Promise(async (resolve, reject) => {
                        
            try {
                let result = await Pessoa.remove({_id: data.id});                

                console.log('People - removed successfully');                

                resolve(result);
            } catch (error) {
                console.log(`People - unabled to remove [${error.message}]`);
                reject(error.message);                
            }
        });
    }

    /**
     * updates the match friend.
     * @param {Array} users
     * @returns List of poeple with all friend already shuffled.
     */
    let updateAmigo = (users) => {
        return new Promise(async (resolve, reject) => {
                        
            try {

                for (let index = 0; index < users.length; index++) {
                    const user = users[index];

                    let doc = await Pessoa.findById(user._id);
                
                    doc.amigo = user.amigo;

                    await doc.save();                    
                }

                console.log('People - Friends updated successfully');

                resolve(true);
            } catch (error) {
                console.log(`People - unabled to remove [${error.message}]`);
                reject(error.message);                
            }
        });
    }

    return {
        get: get,
        insert: insert,
        edit: edit,
        remove: remove,
        updateAmigo: updateAmigo
    }
}
