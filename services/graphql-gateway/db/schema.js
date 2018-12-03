const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

/** 
 * ref: https://www.apollographql.com/docs/graphql-tools/generate-schema.html
 */
const typeDefs = `
    type Mail {
        subject: String
        receiver: String!
        content: String
        _id: String!
    }

    type Query {
        mails: [Mail]
        mail(id: String!): Mail
    }  

    type Mutation {
        mail(subject: String, receiver: String!, content: String): Mail
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });