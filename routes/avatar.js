var fs = require('fs');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  var ruta_completa = process.env.HOME + "/.huayra-compartir_avatar";

  fs.exists(ruta_completa, function(exists) {

    if (exists == false) {
      res.sendFile("avatar_por_omision.png", {root: __dirname + '/../public/'});
    } else {
      res.sendFile(".huayra-compartir_avatar", {root: process.env.HOME});
    }

  });

});

module.exports = router;
