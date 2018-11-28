'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTest;

describe('Test API:', function() {
  describe('GET /api/tests', function() {
    var tests;

    beforeEach(function(done) {
      request(app)
        .get('/api/tests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          tests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(tests).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/tests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tests')
        .send({
          name: 'New Test',
          info: 'This is the brand new test!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTest = res.body;
          done();
        });
    });

    it('should respond with the newly created test', function() {
      expect(newTest.name).to.equal('New Test');
      expect(newTest.info).to.equal('This is the brand new test!!!');
    });
  });

  describe('GET /api/tests/:id', function() {
    var test;

    beforeEach(function(done) {
      request(app)
        .get(`/api/tests/${newTest._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          test = res.body;
          done();
        });
    });

    afterEach(function() {
      test = {};
    });

    it('should respond with the requested test', function() {
      expect(test.name).to.equal('New Test');
      expect(test.info).to.equal('This is the brand new test!!!');
    });
  });

  describe('PUT /api/tests/:id', function() {
    var updatedTest;

    beforeEach(function(done) {
      request(app)
        .put(`/api/tests/${newTest._id}`)
        .send({
          name: 'Updated Test',
          info: 'This is the updated test!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTest = {};
    });

    it('should respond with the updated test', function() {
      expect(updatedTest.name).to.equal('Updated Test');
      expect(updatedTest.info).to.equal('This is the updated test!!!');
    });

    it('should respond with the updated test on a subsequent GET', function(done) {
      request(app)
        .get(`/api/tests/${newTest._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let test = res.body;

          expect(test.name).to.equal('Updated Test');
          expect(test.info).to.equal('This is the updated test!!!');

          done();
        });
    });
  });

  describe('PATCH /api/tests/:id', function() {
    var patchedTest;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/tests/${newTest._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Test' },
          { op: 'replace', path: '/info', value: 'This is the patched test!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTest = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTest = {};
    });

    it('should respond with the patched test', function() {
      expect(patchedTest.name).to.equal('Patched Test');
      expect(patchedTest.info).to.equal('This is the patched test!!!');
    });
  });

  describe('DELETE /api/tests/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/tests/${newTest._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when test does not exist', function(done) {
      request(app)
        .delete(`/api/tests/${newTest._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
