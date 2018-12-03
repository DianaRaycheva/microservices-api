const ampq = require('amqplib/callback_api');
const { queue: { AMQP_URL, _QUEUE_NAME } } = require('../config');
const sendMail = require('../handler/send-mail');

module.exports = () => {  
    ampq.connect(AMQP_URL, (err, connection) => {
        if (err) throw new Error(err);

        connection.createChannel((e, ch) => {
            if (e) throw new Error(e);
            
            ch.assertQueue(_QUEUE_NAME, { durable: true });
            ch.consume(_QUEUE_NAME, msg => {
                let mail;
                
                try {
                    mail = JSON.parse(msg.content.toString());
                } catch (e) {
                    console.error('Could not parse mail', e);
                }

                console.info('My new message is: ', mail || msg.content);
                // send an email by mailjet
                if (mail) sendMail(mail);

            // auto acknowledge the message as read
            }, { noAck: true });
        });
    });
};