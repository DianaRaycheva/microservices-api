const { PORT, DB_SERVICE_PORT, Q_URI, _QUEUE_NAME } = process.env;

module.exports = {
    port: PORT || 3000,
    supported_app_methods: ['get', 'post'],
    queue: {
        AMQP_URL: Q_URI || '',
        _QUEUE_NAME: _QUEUE_NAME || 'queue_1'
    },
    mongodb_service: {
        port: DB_SERVICE_PORT || 3001,
    }
};