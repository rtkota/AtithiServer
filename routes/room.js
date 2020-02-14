const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Room, validate} = require('../models/room');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(400).send("Unauthorised Access is Denied");
  const rooms = await Room.find().sort('rmno');
  
  res.send(rooms);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let room = new Room({ rmno: req.body.rmno });
  room = await room.save();
  
  res.send(room);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const room = await Room.findByIdAndUpdate(req.params.id, { rmno: req.body.rmno }, {
    new: true
  });

  if (!room) return res.status(404).send('The room with the given ID was not found.');
  
  res.send(room);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const room = await Room.findByIdAndRemove(req.params.id);

  if (!room) return res.status(404).send('The genre with the given ID was not found.');

  res.send(room);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) return res.status(404).send('The genre with the given ID was not found.');

  res.send(room);
});

module.exports = router;