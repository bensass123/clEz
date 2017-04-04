var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../views/toyota.html'));
});

router.get('/toyota', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../views/toyota.html'));
});

router.get('/honda', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../views/honda.html'));
});

router.get('/subaru', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../views/subaru.html'));
});

router.get('/mazda', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../views/mazda.html'));
});

router.get('/nissan', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../views/nissan.html'));
});


module.exports = router;
