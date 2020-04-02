require('dotenv').config();
const express = require('express');
const massive = require('massive');

const app = express();
const { SERVER_PORT, CONNECTION_STRING } = process.env;

const products_controller = require('./products_controller');

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then(db => {
    console.log('connected to db');
    app.set('db', db);
  })
  .catch(err => console.log(err));

app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.post('/api/products', products_controller.create);
app.delete('/api/products/:id', products_controller.delete);

app.use(express.json());
app.listen(SERVER_PORT, () => {
  console.log(`The server is listening on port: ${SERVER_PORT}.`);
});
