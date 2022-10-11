const nodeCache = require('node-cache');

const cache = new nodeCache();

module.exports = (duration) => (req, res, next) => {
    if (rep.method !== 'GET') {
        console.error('Cannot cache non-GET methods!');
        return next();
    }
    const key = req.originalURL;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        console.log(`Cache hit for the ${key}`);
        res.send(cachedResponse);
    } else {
        console.log(`cache miss for the ${key}`);
        res.originalSend = res.send;
        res.send = (body) => {
            res.originalSend(body);
            cache.set(key, body, duration);
        };
        next();
    }
};
