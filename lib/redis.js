Meteor._createRedisClient = function _createRedisClient(conf) {
    conf = conf || {};

    // console.info('connecting to redis', {port: conf.port, host: conf.host, db: conf.db, auth: conf.auth});

    var redis = Npm.require('redis');
    var client = redis.createClient(conf.port, conf.host);
    
    if(conf.auth) {
        client.auth(conf.auth, afterAuthenticated);
    }

    if(conf.db) {
        client.select(conf.db, afterDbSelected);
    }

    function afterAuthenticated(err) {   
        if(err) {
            throw err;
        }
    }

    function afterDbSelected(err) {
        if(err) {
            // console.error('db selection failed', { error: err.message, db: conf.db });
        } else {
            // console.info('db selected', { db: conf.db });
        }
    }

    client.on('error', function(err) {
        // console.error('connection to redis disconnected', {port: conf.port, host: conf.host, auth: conf.auth, error: err.toString()})
    });

    client.on('connect', function() {    
        // console.info('connected to redis', {port: conf.port, host: conf.host, auth: conf.auth});
    });

    client.on('reconnecting', function() {
        // console.info('re-connecting to redis', {port: conf.port, host: conf.host, auth: conf.auth});
    });

    return client;
};