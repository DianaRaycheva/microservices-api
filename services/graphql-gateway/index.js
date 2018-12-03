const server = require('express')();
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const { port } = require('./config');
const schema = require('./db/schema');

server
    .use(bodyParser.json())
    .use('/gql', graphqlExpress({schema}))
    .use('/graphql', graphiqlExpress({endpointURL: '/gql'}))
    .listen(port, () => {
        console.log(`Listening on port ${port}.`);
    });