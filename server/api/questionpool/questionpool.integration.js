'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newQuestionpool;

describe('Questionpool API:', function() {
  describe('GET /api/questionpools', function() {
    var questionpools;

    beforeEach(function(done) {
      request(app)
        .get('/api/questionpools')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          questionpools = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(questionpools).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/questionpools', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/questionpools')
        .send({
          name: 'New Questionpool',
          info: 'This is the brand new questionpool!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQuestionpool = res.body;
          done();
        });
    });

    it('should respond with the newly created questionpool', function() {
      expect(newQuestionpool.name).to.equal('New Questionpool');
      expect(newQuestionpool.info).to.equal('This is the brand new questionpool!!!');
    });
  });

  describe('GET /api/questionpools/:id', function() {
    var questionpool;

    beforeEach(function(done) {
      request(app)
        .get(`/api/questionpools/${newQuestionpool._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          questionpool = res.body;
          done();
        });
    });

    afterEach(function() {
      questionpool = {};
    });

    it('should respond with the requested questionpool', function() {
      expect(questionpool.name).to.equal('New Questionpool');
      expect(questionpool.info).to.equal('This is the brand new questionpool!!!');
    });
  });

  describe('PUT /api/questionpools/:id', function() {
    var updatedQuestionpool;

    beforeEach(function(done) {
      request(app)
        .put(`/api/questionpools/${newQuestionpool._id}`)
        .send({
          name: 'Updated Questionpool',
          info: 'This is the updated questionpool!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQuestionpool = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQuestionpool = {};
    });

    it('should respond with the updated questionpool', function() {
      expect(updatedQuestionpool.name).to.equal('Updated Questionpool');
      expect(updatedQuestionpool.info).to.equal('This is the updated questionpool!!!');
    });

    it('should respond with the updated questionpool on a subsequent GET', function(done) {
      request(app)
        .get(`/api/questionpools/${newQuestionpool._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let questionpool = res.body;

          expect(questionpool.name).to.equal('Updated Questionpool');
          expect(questionpool.info).to.equal('This is the updated questionpool!!!');

          done();
        });
    });
  });

  describe('PATCH /api/questionpools/:id', function() {
    var patchedQuestionpool;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/questionpools/${newQuestionpool._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Questionpool' },
          { op: 'replace', path: '/info', value: 'This is the patched questionpool!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQuestionpool = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQuestionpool = {};
    });

    it('should respond with the patched questionpool', function() {
      expect(patchedQuestionpool.name).to.equal('Patched Questionpool');
      expect(patchedQuestionpool.info).to.equal('This is the patched questionpool!!!');
    });
  });

  describe('DELETE /api/questionpools/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/questionpools/${newQuestionpool._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when questionpool does not exist', function(done) {
      request(app)
        .delete(`/api/questionpools/${newQuestionpool._id}`)
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
