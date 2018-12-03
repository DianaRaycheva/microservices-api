const { PORT, Q_URI, _QUEUE_NAME, MJ_API_PUBLIC, MJ_API_SECRET } = process.env;

module.exports = {
    port: PORT || 3002,
    queue: {
        AMQP_URL: Q_URI || '',
        _QUEUE_NAME: _QUEUE_NAME || '[FILL_ME]',
        MJ_API_PUBLIC: MJ_API_PUBLIC || '',
        MJ_API_SECRET: MJ_API_SECRET || ''
    }
};