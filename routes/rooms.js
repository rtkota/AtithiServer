const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Room, validate} = require('../models/room');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', auth, async (req, res) => {
  if ((req.user.role !== 'Admin') && (req.user.role !== 'FOAdmin') && (req.user.role !== 'FO')) return res.status(400).send("Unauthorised Access is Denied");
  const rooms = await Room.find().sort('rmno');
  
  res.send(rooms);
});

router.get('/occupied', auth, async (req, res) => {
  if ((req.user.role !== 'Admin') && (req.user.role !== 'FOAdmin') && (req.user.role !== 'FO')) return res.status(400).send("Unauthorised Access is Denied");
  const rooms = await Room.find({status: 'OCC'}).sort('rmno');
  
  res.send(rooms);
});

router.post('/', auth, async (req, res) => {
  if ((req.user.role !== 'Admin') && (req.user.role !== 'FOAdmin') && (req.user.role !== 'FO')) return res.status(400).send("Unauthorised Access is Denied");
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let room = new Room({
     rmno: req.body.rmno,
     category: req.body.category,
     bedtype: req.body.bedtype,
     desc: req.body.desc
   });
  room = await room.save();
  
  res.send(room);
});

router.put('/status/:rmno', auth, async (req, res) => {
  if ((req.user.role !== 'Admin') && (req.user.role !== 'FOAdmin') && (req.user.role !== 'FO')) return res.status(400).send("Unauthorised Access is Denied");
  let room = await Room.findOne({ rmno: req.params.rmno });
   if (!room) return res.status(400).send('Room Not Found.');
   room.status = req.body.status;
   await room.save();
   res.send(_.pick(room, ['rmno','status']));
  });
  
router.put('/:rmno', auth, async (req, res) => {
  if ((req.user.role !== 'Admin') && (req.user.role !== 'FOAdmin') && (req.user.role !== 'FO')) return res.status(400).send("Unauthorised Access is Denied");
  let room = await Room.findOne({ rmno: req.params.rmno });
  if (!room) return res.status(400).send('Room Not Found.');
    room.category= req.body.category;
    room.bedtype= req.body.bedtype;
    room.desc= req.body.desc;
    await room.save();
    res.send(room);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const room = await Room.findByIdAndRemove(req.params.id);

  if (!room) return res.status(404).send('The Room with the given ID was not found.');

  res.send(room);
});

router.get('/:rmno', auth, async (req, res) => {
  if ((req.user.role !== 'Admin') && (req.user.role !== 'FOAdmin') && (req.user.role !== 'FO')) return res.status(400).send("Unauthorised Access is Denied");
  const room = await Room.find({rmno:req.params.rmno});

  if (!room) return res.status(404).send('The Room with the given ID was not found.');

  res.send(room);
});

module.exports = router;