'use strict';

const db = require('./server/db/models');
const app = require('./server');
const PORT = 1337;

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log('Database synced.');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
  });
