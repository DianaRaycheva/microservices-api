/**
 * Format normally includes:
 * 
 * [unique_error_key]: {
 *  ok: Boolean,
 *  descrption: String,
 *  shortCode: Int
 * }
 * 
 */
module.exports = {
    no_url_provided: {
        ok: false,
        description: 'No url parameted provided.',
        shortCode: 400
    },
    method_not_allowed: {
        ok: false,
        description: 'The request method specified is not allowed.',
        shortCode: 400
    },
    request_terminated: {
        ok: false,
        description: 'Cannot execute the requested action.',
        shortCode: 500
    },
    validation: {
        ok: false,
        description: 'Cannot validate fields.',
        shortCode: 400
    },
}