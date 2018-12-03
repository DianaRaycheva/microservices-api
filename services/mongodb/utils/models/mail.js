const { Schema } = require('mongoose');

/**
 * @param {String} email 
 * @return {Boolean} - Whether the string parse the validation.
 */
const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

/** 
 * Simple Mail schema example
*/
module.exports = new Schema({
    subject: {
        type: String, 
        required: true 
    },
    receiver: {
        type: String, 
        required: true,
        validate: [
            validateEmail, 
            'Please fill in a valid email address'
        ]
    },
    content: {
        type: String, 
        required: true
    }
});