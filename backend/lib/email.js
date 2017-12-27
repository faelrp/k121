const config = require('config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.email.apiKey);

module.exports = () => {

    function send(users) {
        users.forEach(async (user) => {
            
            try {

                let data = {
                    from: 'Admin <admin@example.com>',
                    to: user.email,
                    subject: 'Resultado amigo secreto',
                    text: `Seu amigo secreto é: ${user.amigo}`
                };

                sgMail.send(data);

            } catch (error) {
                console.log(error);
            }
        });
    }

    return {
        send: send
    }
};