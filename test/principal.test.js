var request = require('supertest');
var express = require('express');
var app = require('../app');

describe('Página inicial', function() {
  it("Muestra la entrada principal con las rutas", function(done) {
    request(app).get('/')
      .expect(200)
      .expect(/nombre/)
      .expect(/frase/)
      .expect(/equipos/)
      .expect(/archivos/, done);
  });
});

describe('Navegación de archivos', function() {
  it("Puede ingresar a la ruta para obtener archivos", function(done) {
    request(app).get('/obtener')
      .expect(200)
      .expect(/archivos/)
      .expect(/cantidad/, done);
  });
});

describe('Navegación de equipos', function() {
  it("Puede acceder a /equipos", function(done) {
    request(app).get('/equipos')
      .expect(200)
      .expect(/equipos/)
      .expect(/cantidad/, done);
  });
});


describe('Manejo de la lista de equipos', function() {
  it("Puede acceder a /equipos y está vacío", function(done) {
    request(app).get('/equipos')
      .expect(200)
      .expect(/equipos/)
      .expect(/"cantidad":0/, done);
  });

  it("Puede crear un equipo en la lista", function(done) {
    request(app).post('/equipos')
      .send({host: '192.168.1.1', id: '123'})
      .expect(200)
      .expect(/equipo/, done);
  });

  it("Puede acceder a /equipos y tiene un elemento", function(done) {
    request(app).get('/equipos')
      .expect(200)
      .expect(/equipos/)
      .expect(/"cantidad":1/, done);
  });


});
