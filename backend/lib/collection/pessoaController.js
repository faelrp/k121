const Pessoa = require('./pessoaSchema');

/**
 * Moduloe responsavel por conter os metodos que fazem acesso ao MongoDB
 */
module.exports = () => {

    /**
     * Função responsavel por buscar um determinado usuario ou todos
     * @param {Object} data Contem o id da pessoa or undefined
     * @returns Um usuario espeifico ou todos
     */
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

    /**
     * Função responsavel por fazer a inserção de uma nova pessoa
     * @param {Object} data objeto que contem os dados da Pessoa
     * @returns O objeto da Pessoa inserida
     */
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
    
    /**
     * Função responsavel por fazer a alteração de uma pessoa especifica
     * @param {Object} data objeto que contem o id da pessoa
     * @returns O objeto da Pessoa editada
     */
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

    /**
     * Função responsavel por fazer a remoção de uma pessoa especifica
     * @param {Object} data objeto que contem o id da pessoa
     * @returns Resultado da exclusão da Pessoa no banco
     */
    let remove = (data) => {
        
        return new Promise(async (resolve, reject) => {
                        
            try {
                let result = await Pessoa.remove({_id: data.id});                

                console.log('Pessoa - removed successfully');                

                resolve(result);
            } catch (error) {
                console.log(`Pessoa - unabled to remove [${error.message}]`);
                reject(error.message);                
            }
        });
    }

    /**
     * Função responsavel por atualizar o campo amigo das Pessoas
     * @param {Array} users usuarios que terão campo amigo atualizado
     * @returns Lista de perssoas com o campo amigo atualizado
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

                console.log('Pessoa - Amigos updated successfully');

                resolve(true);
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
        updateAmigo: updateAmigo
    }
}