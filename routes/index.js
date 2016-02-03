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

router.post('/', function(req, res, next) {
  var nombre = req.body["nombre"];
  var frase = req.body["frase"];

  config.nombre = nombre;
  config.frase = frase;

  res.json({nombre, frase});
});

module.exports = router;
