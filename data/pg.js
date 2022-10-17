const {Pool, Client} = require('pg');
const connectionString = "postgresql://huynhtrung:trung260901@127.0.0.1:5432/default_database";

const client = new Client({
    connectionString,
});

client.connect();
module.exports = client;