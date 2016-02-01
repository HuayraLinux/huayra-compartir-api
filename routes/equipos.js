var express = require('express');
var router = express.Router();
var config = require('../config');

var equipos = [];

router.get('/', function(req, res, next) {
  res.json({
    equipos: equipos,
    cantidad: equipos.length
   });
});

router.post('/', function(req, res, next) {
  var host = req.body["host"];
  var id = req.body["id"];
  var equipo = {host, id};

  equipos.push(equipo);
  res.json({equipo: equipo});
});

module.exports = router;
