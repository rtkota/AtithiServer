const express = require('express');
const rooms = require('../routes/rooms');
const taxmasters = require('../routes/taxmasters');
const userroles = require('../routes/userroles');
const agents = require('../routes/agents');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/rooms', rooms);
  app.use('/api/agents', agents);
  app.use('/api/taxmasters', taxmasters);
  app.use('/api/userroles', userroles);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/returns', returns);
  app.use(error);
}