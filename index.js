require('dotenv').config();
const express = require('express');
const massive = require('massive');

const app = express();
const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then(db => {
    console.log('connected to db');
    app.set('db', db);
  })
  .catch(err => console.log(err));

app.use(express.json());
app.listen(SERVER_PORT, () => {
  console.log(`The server is listening on port: ${SERVER_PORT}.`);
});
