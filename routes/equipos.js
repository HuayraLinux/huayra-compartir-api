var express = require('express');
var router = express.Router();

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
  var equipo = {host:host, id:id};
  var indice = -1;

  for (var i=0; i<equipos.length; i++) {
    if (equipos[i].id == id || equipos[i].host == host) {
      indice = i;
    }
  }

  if (indice === -1) {
    equipos.push(equipo);
    res.json({equipo: equipo});
  }

  res.json({});
});

router.delete('/:id', function(req, res, next) {
  var id_a_eliminar = req.params.id;
  var item_a_eliminar = -1;

  for (var i=0; i<equipos.length; i++) {
    if (equipos[i].id == id_a_eliminar) {
      item_a_eliminar = i;
    }
  }

  if (item_a_eliminar > -1) {
    equipos.splice(item_a_eliminar, 1);
  }

  res.json({ok: true});
});

module.exports = router;
