const server = require('express')();
const bodyParser = require('body-parser');
const initRoutes = require('./routes');
const connectToDb = require('./utils');
const config = require('./config');
const { port } = config;

// define all middlewares first
server.use(bodyParser.json());
connectToDb(config)
// define all routes 
initRoutes(server);
// and finally start the server
server.listen(port, () => console.log(`Listening on port ${port}!`));