const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.put('/setpassword', auth, async (req, res) => {
  let user = await User.findById(req.user._id); 
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email','role']));
});

router.put('/setstatus', [auth, admin], async (req, res) => {
let user = await User.findOne({ email: req.body.email });
 if (!user) return res.status(400).send('User not registered.');
 user.status = req.body.status;
 await user.save();
 res.send(_.pick(user, ['_id', 'name', 'email','role','status']));
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');
  user = new User(_.pick(req.body, ['name', 'email', 'password','role']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email','role']));
});

module.exports = router;