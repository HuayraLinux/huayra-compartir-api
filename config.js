var homeConfig = require('home-config');
var fs = require('fs');

var PORT = 9919;
var CONFIG_FOLDER = process.env.HOME + '/.config';

//
// Genera el directorio para la configuración si no existe
// (generalmente ~/.config/)
//
if (!fs.existsSync(CONFIG_FOLDER)){
    fs.mkdirSync(CONFIG_FOLDER);
    console.log("Creando directorio de configuración " + CONFIG_FOLDER);
}

//
// Obtiene el objeto para accerder a la configuración de usuario.
//
var cfg = homeConfig.load(CONFIG_FOLDER + '/huayra-compartir.ini', {
  ruta_compartir: process.env.HOME + "/Compartido/",
  nombre: "alumno",
  frase: "sin definir..."
});
cfg.save();

var config = {
  obtener: function(clave) {
    if (clave == "port") {
      return PORT;
    } else {
      return cfg[clave];
    }
  },

  definir: function(clave, valor) {
    cfg[clave] = valor;
  },

  guardar: function() {
    cfg.save();
  }
};


module.exports = config;
