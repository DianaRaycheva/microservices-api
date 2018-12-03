const ampq = require('amqplib/callback_api');

const { queue: { AMQP_URL, _QUEUE_NAME } } = require('../config');
let channel, queueName, counter = 0;

/**
 * Create AMQP client and open a queue channel
 * ref: https://www.npmjs.com/package/amqplib#callback-api-example
 * 
 * @param {String} AMQP_URL - AMQP_URL (RabbitMQ message broker).
 * @param {Function} param1 - Callback function with arguments - err:any, connection:any
 */
ampq.connect(AMQP_URL, (err, connection) => {
    if (err) throw new Error(err);
    connection.createChannel((e, ch) => {
        if (e) throw new Error(e);
        ch.assertQueue(queueName, { durable: true });
        channel = ch;
    });
});

/**
 *  Push message to the queue
 * 
 * @param {Object} msg - Message.
 * @param {String} q - Queue name.
 * @return {Object} The raw message as a response to the GraphQL client.
 */
const push2queue = (msg, q) => {
    queueName = q || _QUEUE_NAME;
    
    if (!channel) {
        const pushToQueueTimoOut = setTimeout(() => {
            if (counter >= 10) return clearTimeout(pushToQueueTimoOut);
            counter++;
            push2queue(msg, queueName);
        }, 1000);
        return;
    } 

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
    return msg;
};

module.exports.push2queue = push2queue;