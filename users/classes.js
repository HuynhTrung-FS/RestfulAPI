const express = require('express');
const router = express.Router();
const users = require('./users-data.json');
router.get('/', (req, res) => {
    res.send(users);
});

router.get('/filters', (req, res) => {
    const query = req.query;
    const name = query.name;
    const age = Number(query.age);
    const address = query.address;
    console.log('Info: ' + name + ',' + age);
    const resUser = users.filter((e) => {
        if (e.name === name && e.age === age) {
            return true;
        } else {
            return false;
        }
    });
    console.log('Query: ', query);
    res.send(resUser);
});
module.exports = router;