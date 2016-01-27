var fs = require('fs');
var express = require('express');
var router = express.Router();
var config = require('../config');


router.get('/', function(req, res, next) {
  //var ruta_completa = process.env.HOME + '/.huayra-compartir_avatar';
  var ruta_completa = "??";


  fs.exists(ruta_completa, function(exists) {

    if (exists == false) {
      res.sendfile('avatar_por_omision.png', {root: __dirname + '/../public/'});
    } else {
      //console.log(process.env.HOME);
      //res.sendfile('.huayra-compartir_avatar.png', {root: process.env.HOME + '/'});
    }
  });

});

module.exports = router;
