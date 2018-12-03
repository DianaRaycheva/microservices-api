const { PORT, DB_URL } = process.env;

module.exports = {
    port: PORT || 3001, 
    dbURI: DB_URL || '[FILL_ME - eg. mongodb://user:pass@domain/db]'
};