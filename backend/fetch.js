const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "Joymaaloknath123",
  host: "localhost",
  database: "image"
});

client
  .connect()
  .then(() => console.log("its working"))
  .then(() => client.query("select * from people"))
  .then(results => console.table(results.rows))
  .then(() => client.query("select * from posts"))
  .then(results => console.table(results.rows))
  .then(() => client.query("select * from parents"))
  .then(results => console.table(results.rows))
  .catch(e => console.log(e))
  .finally(() => client.end());

module.exports = client;
