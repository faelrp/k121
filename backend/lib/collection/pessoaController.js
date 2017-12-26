const Pessoa = require('./pessoaSchema');

module.exports = () => {

    let get = (data) => {

        return new Promise(async (resolve, reject) => {

            try {
                let result;
                if (data && data.id) {
                    result = await Pessoa.findById(data.id);
                    console.log(`Pessoa - retrieved Pessoa id ${data.id}`);
                } else {
                    result = await Pessoa.find();
                    console.log('Pessoa - retrieved all Pessoas succesfully');
                }
                
                resolve(result);
            } catch (error) {
                console.log(`Pessoa - unabled to retrieve all Pessoas [${error.message}]`);
                reject(error.message);
            }    
        });
    };

    let insert = (data) => {

        return new Promise(async (resolve, reject) => {

            try {
                let result = await new Pessoa(data).save();
                console.log('Pessoa - created successfully');
                
                resolve(result);
            } catch (error) {
                console.log(`Pessoa - unabled to create [${error.message}]`);
                reject(error.message);
            }    
        });
    };
    
    let edit = (data) => {
        
        return new Promise(async (resolve, reject) => {
                        
            try {
                let doc = await Pessoa.findById(data._id);
                
                doc.nome = data.nome;
                doc.email = data.email;

                let result = await doc.save();

                console.log('Pessoa - edited successfully');                

                resolve(result);
            } catch (error) {
                console.log(`Pessoa - unabled to edit [${error.message}]`);
                reject(error.message);                
            }
        });
    }

    let remove = (data) => {
        
        return new Promise(async (resolve, reject) => {
                        
            try {
                let result = await Pessoa.remove({_id: data._id});                

                console.log('Pessoa - removed successfully');                

                resolve(result);
            } catch (error) {
                console.log(`Pessoa - unabled to remove [${error.message}]`);
                reject(error.message);                
            }
        });
    }

    return {
        get: get,
        insert: insert,
        edit: edit,
        remove: remove,
    }
}