const config = require('config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.email.apiKey);

/**
 * module that sends email to reach person.
 */
module.exports = () => {

    /**
     * handler to send email
     * @param {Array} users List of people
     */
    function send(users) {
        users.forEach(async (user) => {
            
            try {

                let data = {
                    from: 'Admin <admin@example.com>',
                    to: user.email,
                    subject: 'Results of secret santa',
                    text: `Your secret santa friend is : ${user.amigo}`
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
