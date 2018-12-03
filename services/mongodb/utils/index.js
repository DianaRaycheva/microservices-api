const mongoose = require('mongoose');
const MailSchema = require('./models/mail');

module.exports = config => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.dbURI, { useNewUrlParser: true })
        .then(() => console.info('Successful MongoDB connection!'))
        .catch(err => console.log('Cannot connect to DB', err));

    mongoose.model('Mail', MailSchema);
};