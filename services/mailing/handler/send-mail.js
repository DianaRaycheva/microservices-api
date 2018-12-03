const { queue: { MJ_API_PUBLIC, MJ_API_SECRET } } = require('../config');
const Mailjet = require('node-mailjet').connect(MJ_API_PUBLIC, MJ_API_SECRET);
/** 
 * Asynchronous operation to send and email to the receiver of the message.
 * @param {Object} mail - Raw email data.
 * @return
 */
module.exports = async mail => {
    console.log('Sending an email to the receiver started.', mail.receiver);

    const request = await Mailjet.post('send').request({
        FromEmail: '[FILL_ME]',
        FromName: '[FILL_ME]',
        Subject: mail.subject,
        'Text-part': mail.content,
        Recipients: [{
            Email: mail.receiver 
        }]
    });

    console.log('Email request ended.', request.body);
};