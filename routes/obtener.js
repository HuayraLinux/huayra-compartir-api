var fs = require('fs');
var path = require('path');
var url = require('url');

var express = require('express');
var router = express.Router();
var config = require('../config');
var urljoin = require('url-join');


function obtener_tipo(stat) {
  if (stat.isDirectory())
    return 'folder';

  return "file";
}

function es_directorio(ruta_archivo) {
  var stat = fs.statSync(ruta_archivo);
  return (obtener_tipo(stat) == 'folder');
}

function generar_listado_tipado_de_archivos(directorio_base, host, path_base, listado) {
  var archivos = [];
  var directorios = [];

  /*
  * Procesa cada uno de las cadenas buscando convertirlas en un diccionario
  * que se almanece en 'archivos' o 'directorios' especificando nombre, tamaño
  * y tipo del archivo procesado.
  */
  for (i=0; i<listado.length; i++) {

    if (/^\./.test(listado[i]))  // Si es un archivo comenzado con '.' lo ignora.
      continue;

    var stat = fs.statSync(path.join(directorio_base, listado[i]));
    var tipo = obtener_tipo(stat);

    var registro = {
      name: listado[i],
      type: tipo,
      size: 0,
      contenido: '',
      descargar: '',
    };

    if (tipo === 'folder') {
      registro.contenido = urljoin(host, 'obtener', path_base, listado[i]);
      directorios.push(registro);
    } else {
      registro.size = stat.size;
      registro.descargar = urljoin(host, 'descargar', path_base, listado[i]);
      archivos.push(registro);
    }

  }

  return directorios.concat(archivos);
}


router.get(/(.*)/, function(req, res, next) {
  var ruta = req.params[0] || "";
  var ruta_completa = path.join(config.obtener("ruta_compartir"), ruta);
  var host = req.protocol + "://" + req.get('host');
  var path_base = req.url;

  if (es_directorio(ruta_completa)) {
    var listado = fs.readdirSync(ruta_completa);
    var archivos = generar_listado_tipado_de_archivos(ruta_completa, host, path_base, listado);

    res.send({
      archivos: archivos,
      cantidad: archivos.length
    });
  } else {
    res.json({});
  }
});

module.exports = router;
