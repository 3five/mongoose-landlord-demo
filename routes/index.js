var express = require('express');
var router = express.Router();
var url = require('url')
var models = require('../models');
var landlord = require('mongoose-landlord');
var mongoose = require('../services/mongoose');
var LandlordMiddleware = landlord.LandlordMiddleware;

/* GET home page. */

router.use(
  LandlordMiddleware({
    tenant: 'Tenant',
    mongooseInstance: mongoose
  })
)

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/people', function(req, res) {
  var People = res.locals.db.getModel('Person');
  People.find().then(function(result) {
    res.json(result)
  })
})

router.post('/api/people', function(req, res) {
  var person = res.locals.db.createModel('Person', req.body)
  person.save().then(function(result) {
    res.json(result)
  })
})

module.exports = router;
