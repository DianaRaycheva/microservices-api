const mongoose = require('mongoose');
const Mail = mongoose.model('Mail');

/** 
 * Each array element requires arguments:
 * route:string - Required! 
 * func:function - Required! Callback function with params:
 *      params:object - { req, res } - always included as first parameter
 *      cb:function - callback function with arguments: error:any, data:any
*/
module.exports = [{
    route: '/create',
    func: ({ req }, cb) => {
        const { subject, receiver, content } = req.body || {};
   
        if (!subject || !receiver || !content) 
            return cb('Subject, content and receiver are required fields');

        Mail.create({
            subject, receiver, content
        }, cb);
    }
}];