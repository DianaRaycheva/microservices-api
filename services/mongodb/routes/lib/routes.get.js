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
    route: '/',
    func: (params, cb) => {
        Mail.find((err, mails) => {
            cb(err, mails);
        });
    }
}, {
    route: '/:id',
    func: ({req: {params: { id }}}, cb) => {
        Mail.findOne({_id: id}, (err, mail) => {
            if (err) return cb({
                title: 'Cannot find requested item.',
                details: err
            });

            cb(null, mail);
        });
    }
}];