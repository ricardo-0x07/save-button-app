'use strict';

var app = require('../..');
import request from 'supertest';

var newOpportunity;

describe('Opportunity API:', function() {
  describe('GET /api/opportunitys', function() {
    var opportunitys;

    beforeEach(function(done) {
      request(app)
        .get('/api/opportunitys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          opportunitys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      opportunitys.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/opportunitys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/opportunitys')
        .send({
          name: 'New Opportunity',
          info: 'This is the brand new opportunity!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newOpportunity = res.body;
          done();
        });
    });

    it('should respond with the newly created opportunity', function() {
      newOpportunity.name.should.equal('New Opportunity');
      newOpportunity.info.should.equal('This is the brand new opportunity!!!');
    });
  });

  describe('GET /api/opportunitys/:id', function() {
    var opportunity;

    beforeEach(function(done) {
      request(app)
        .get(`/api/opportunitys/${newOpportunity._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          opportunity = res.body;
          done();
        });
    });

    afterEach(function() {
      opportunity = {};
    });

    it('should respond with the requested opportunity', function() {
      opportunity.name.should.equal('New Opportunity');
      opportunity.info.should.equal('This is the brand new opportunity!!!');
    });
  });

  describe('PUT /api/opportunitys/:id', function() {
    var updatedOpportunity;

    beforeEach(function(done) {
      request(app)
        .put(`/api/opportunitys/${newOpportunity._id}`)
        .send({
          name: 'Updated Opportunity',
          info: 'This is the updated opportunity!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedOpportunity = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOpportunity = {};
    });

    it('should respond with the original opportunity', function() {
      updatedOpportunity.name.should.equal('New Opportunity');
      updatedOpportunity.info.should.equal('This is the brand new opportunity!!!');
    });

    it('should respond with the updated opportunity on a subsequent GET', function(done) {
      request(app)
        .get(`/api/opportunitys/${newOpportunity._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let opportunity = res.body;

          opportunity.name.should.equal('Updated Opportunity');
          opportunity.info.should.equal('This is the updated opportunity!!!');

          done();
        });
    });
  });

  describe('PATCH /api/opportunitys/:id', function() {
    var patchedOpportunity;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/opportunitys/${newOpportunity._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Opportunity' },
          { op: 'replace', path: '/info', value: 'This is the patched opportunity!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedOpportunity = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedOpportunity = {};
    });

    it('should respond with the patched opportunity', function() {
      patchedOpportunity.name.should.equal('Patched Opportunity');
      patchedOpportunity.info.should.equal('This is the patched opportunity!!!');
    });
  });

  describe('DELETE /api/opportunitys/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/opportunitys/${newOpportunity._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when opportunity does not exist', function(done) {
      request(app)
        .delete(`/api/opportunitys/${newOpportunity._id}`)
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
