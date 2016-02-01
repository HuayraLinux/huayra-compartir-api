var express = require('express');
var router = express.Router();
var config = require('../config');

function get_url(req, path) {
  return "http://" + req.get('host') + "/" + path +"/";
}

router.get('/', function(req, res, next) {
  var ruta = req.params[0] || "";

  res.json({
    archivos: get_url(req, 'obtener'),
    avatar: get_url(req, 'avatar'),
    nombre: config.nombre,
    frase: config.frase,
    equipos: get_url(req, 'equipos')
   });
});

module.exports = router;
