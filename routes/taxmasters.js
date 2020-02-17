const {Taxmaster, validate} = require('../models/taxmaster'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const taxmaster = await Taxmaster.find().sort('name');
  res.send(taxmaster);
});

router.post('/', [auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const taxmaster = new Taxmaster({ 
    name: req.body.name
  });
  await taxmaster.save();
  res.send(taxmaster);
});

router.put('/:id', [auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const taxmaster = await Taxmaster.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name
    }, { new: true });

  if (!taxmaster) return res.status(404).send('The Tax with the given ID was not found.');
  res.send(taxmaster);
});

router.delete('/:id', [auth,admin], async (req, res) => {
  const taxmaster = await Taxmaster.findByIdAndRemove(req.params.id);

  if (!taxmaster) return res.status(404).send('The Tax with the given ID was not found.');

  res.send(taxmaster);
});

router.get('/:id', async (req, res) => {
  const taxmaster = await Taxmaster.findById(req.params.id);

  if (!taxmaster) return res.status(404).send('The Tax with the given ID was not found.');

  res.send(taxmaster);
});

module.exports = router; 