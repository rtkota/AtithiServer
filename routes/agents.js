const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Agent, validate} = require('../models/agent'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const agents = await Agent.find().sort('name');
  res.send(agents);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let agent = new Agent({ 
    name: req.body.name,
    address: req.body.address,
    person: req.body.person,
    mobile: req.body.mobile,
    email: req.body.email,
    gstin: req.body.gstin,
    crate: req.body.crate
  });
  agent = await agent.save();
  
  res.send(agent);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const agent = await agent.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      address: req.body.address,
      person: req.body.person,
      mobile: req.body.mobile,
      email: req.body.email,
      gstin: req.body.gstin,
      crate: req.body.crate
    }, { new: true });

  if (!agent) return res.status(404).send('The agent with the given ID was not found.');
  
  res.send(agent);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const agent = await agent.findByIdAndRemove(req.params.id);

  if (!agent) return res.status(404).send('The agent with the given ID was not found.');

  res.send(agent);
});

router.get('/:id', auth, async (req, res) => {
  const agent = await agent.findById(req.params.id);

  if (!agent) return res.status(404).send('The agent with the given ID was not found.');

  res.send(agent);
});

module.exports = router; 