var fs = require('fs');
var express = require('express');
var router = express.Router();
var path = require("path");

router.get('/', function(req, res, next) {
  var ruta_completa = path.join(process.env.HOME, ".huayra-compartir_avatar");

  fs.exists(ruta_completa, function(exists) {

    if (exists == false) {
      res.sendFile("avatar_por_omision.png", {root: __dirname + '/../public/'});
    } else {
      var filename = path.basename(ruta_completa);

      var filestream = fs.createReadStream(ruta_completa);

      filestream.on('error', function (error) {
        console.error(error);
        res.json({"Error": error})
      });

      filestream.on('readable', function() {
        filestream.pipe(res);
      });

    }

  });

});

module.exports = router;
