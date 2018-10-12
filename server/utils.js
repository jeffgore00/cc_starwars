const errorLog = require('fs').createWriteStream('errors.log', { flags: 'a' });

module.exports = { errorLog };
