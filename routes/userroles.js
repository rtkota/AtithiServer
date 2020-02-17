const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Userrole, validate} = require('../models/userrole'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userrole = await Userrole.find().sort('name');
  res.send(userrole);
});

router.post('/', [auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const userrole = new Userrole({ 
    name: req.body.name
  });
  await userrole.save();
  res.send(userrole);
});

router.put('/:id', [auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const userrole = await Userrole.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name
    }, { new: true });

  if (!userrole) return res.status(404).send('The Role with the given ID was not found.');
  res.send(userrole);
});

router.delete('/:id', [auth,admin], async (req, res) => {
  const userrole = await Userrole.findByIdAndRemove(req.params.id);

  if (!userrole) return res.status(404).send('The Role with the given ID was not found.');

  res.send(userrole);
});

router.get('/:id', auth, async (req, res) => {
  const userrole = await Userrole.findById(req.params.id);

  if (!userrole) return res.status(404).send('The Role with the given ID was not found.');

  res.send(userrole);
});

module.exports = router; 