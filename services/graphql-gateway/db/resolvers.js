const axios = require('axios');
const { push2queue } = require('../queue/connect');
const errors = require('../errors');
// DB connection based on a separate service 
const {mongodb_service: { port }, supported_app_methods} = require('../config');
const dbUrl = process.env.hostname || `http://localhost:${port || 3001}`;

/**
 * Form and execute MongoDB request based on the params provided.
 * 
 * @param {Object} param0 - Request details including: 
 * * method:string [default:get], 
 * * url:string [required:true], 
 * * args:object [default:{}]
 * @param {Function} func - Optional. Process data before returning a response to the client. 
 */
const getData = async ({
     method = 'get',
     args = {},
     url, 
    } = {}, func) => {
        // URL must always be provided, otherwise inform client
        // that he cannot proceed with the request
        if (!url) {
            console.error('Invalid request', errors.no_url_provided);
            throw new Error(JSON.stringify(errors.no_url_provided));
        }

        try {
            // ensure to always execute only supported by the service methods
            if (supported_app_methods.indexOf(method) == -1) 
                return errors.method_not_allowed;

            const res = await axios[method](url, args);
            // Stop any further code execution 
            // in case the request returns an error 
            if (!((res || {}).data || {}).result) {
                const e = JSON.parse(JSON.stringify(errors.request_terminated));
                e.error = res;
                throw new Error(JSON.stringify(e));
            }

            // return raw if there is no need of data processing 
            // before it is provided to the client
            if (typeof func !== 'function') return res.data.result; 
            
            return func(res.data.result);
        // in case anything else go wrong
        // twrow server error and show it as a client response
        } catch (e) {
            console.error(e);
            throw new Error(JSON.stringify({ok: false, error: e}));
        }
}

/**  
 * Export GraphQL resolvers 
 * ref: https://graphql.org/learn/execution/#root-fields-resolvers
 */
module.exports = {
    Mutation: {
        // save message in the DB
        mail: (prevMail, args) => getData({
            url: `${dbUrl}/create`,
            method: 'post',
            args
        }, msg => {
            // send it as an email to the receiver
            return push2queue(msg.result);
        })
    },
    Query: {
        // get all emails from the DB 
        mails: () => getData({
           url: dbUrl
        }, res => res.filter(item => {
            //* example middleware: filter data 
            // before sending it to the client 
            return item.receiver !== 'di@dsd.com';
        })),
        // Get one mail by ID
        mail: (prevMail, { id }) => getData({
           url: `${dbUrl}/${id}`
        })
    }
};