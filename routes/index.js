const { 
  v4: uuidv4,
} = require('uuid');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'CLL - Phenotype Redesign',
    brand: 'none',
    uuid: uuidv4()
  });
});

module.exports = router;
