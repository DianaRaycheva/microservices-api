const devConf = require('./config.dev');
const prodConf = require('./config.prod');

module.exports = process.env.NODE_ENV === 'production' ? prodConf : devConf;