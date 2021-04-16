require('dotenv').config();
const bodyParser = require('body-parser');

const express = require('express');
const helmet = require("helmet");

const models = require('./models');
const routes = require('./routes');

function testConnectionToSequelizeDb(){
  models.sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

async function main(){
  testConnectionToSequelizeDb();

  await models.sequelize.authenticate();
  await models.sequelize.sync();

  const app = express();

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  app.use(helmet())

  routes(app);

  app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));
}

main();
