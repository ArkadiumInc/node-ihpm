var ENV = process.env && process.env.AppUploadTarget ? process.env.AppUploadTarget.toUpperCase() : 'DEV';

var ENVIRONMENTS = {
    DEV: {
        debug: true,
        endpoint: 'http://inhabit-apps-service-dev.azurewebsites.net/apps/upload'
    },
    LIVE: {
        debug: false,
        endpoint: 'http://inhabit-apps-service.azurewebsites.net/apps/upload'
    }
};

module.exports = ENVIRONMENTS[ENV] || ENVIRONMENTS['DEV'];
module.exports.env = ENV;