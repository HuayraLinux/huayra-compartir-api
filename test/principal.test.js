var request = require('supertest')
  , express = require('express');

var app = require('../app');

describe('Página inicial', function() {
  it("Muestra la pantalla con el nombre de la aplicación", function(done) {
    request(app).get('/')
      .expect(200)
      .expect(/Huayra Compartir Web/, done);
  });

})
