const path = require('path');
const fs = require('fs');

const _dir = getPath(__dirname), 
    _file_prefix = 'routes.',
    _allowed_methods = ['get', 'post'];

/**
 * Form lib path to the routes
 * @param {String} str
 * @return {String}
 */
const getPath = function (str) {
    let dc = str.split('\\');
    return `services\\${[dc[dc.length -2], dc[dc.length -1]].join('\\')}\\lib`;
};

/**
 * 
 * @param {String} dir - Directory from where to get all route files.
 * @param {String} prefix - Only files with that same prefix will be counted.
 * @param {Function} callback - Callback with two arguments - error:any, response:any
 * @return {String} For each file returns a filename to require.
 */
const getFilesfromDir = function (dir, prefix, callback){
    // get all file names and throw an error if none are found
    const files = fs.readdirSync(dir);
    if (!(files || []).length) return console.error('Directory cannot be found', dir);
    
    files.forEach(filename => {
        const filePath = path.join(dir, filename);
        const stat = fs.lstatSync(filePath);
        // recurse if inner folders exist
        if (stat.isDirectory()) return getFilesfromDir(filePath, prefix, callback);
        if (!filename.indexOf(prefix)) return callback(filename.replace('.js', ''));
    });
};

/**
 * Closure. Call the function provided and return standardized response.
 * @param {Object} param0 - Funtion parameters including a required func:function one.
 * @returns {Function}
 */
const responseTemplate = function ({func}) {
    return function (req, res) { 
        if(!func) return res.send({
            ok: false,
            error: 'Missing route or callback'
        }); 
        
        func({ req, res }, (error, data) => {
            res.send({
                ok: error ? false : true, 
                result: data,
                error: error ? error : undefined 
            });
        });
    };
};

/** 
 * Register all routes specified in ./lib
 * @param {Object} server - Express server.
 */
module.exports = server => {
    console.log('Registering routes has started.');

    // Get all file names availale in the specified directory
    // normally 'services/mongodb/routes/lib'
    getFilesfromDir(_dir, _file_prefix, function (filePath){
        
        // require all of them and register all exported routes 
        const routesLib = require(`./lib/${filePath}`);
        routesLib.forEach(routeObj => {
            const method = filePath.split('.')[1];
            if (!routeObj.route) 
                return console.log('route is not declared, please add it');
            if (!method || _allowed_methods.indexOf(method) == -1) 
                return console.log('requested method is not allowed');

            try {
                server[method](routeObj.route, responseTemplate(routeObj));
            } catch (e) {
                console.error('Cannot register route due to', e);
            }
        });     
    });  
};