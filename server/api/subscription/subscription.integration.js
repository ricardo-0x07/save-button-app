'use strict';

var app = require('../..');
import request from 'supertest';

var newSubscription;

describe('Subscription API:', function() {
  describe('GET /api/subscriptions', function() {
    var subscriptions;

    beforeEach(function(done) {
      request(app)
        .get('/api/subscriptions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          subscriptions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      subscriptions.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/subscriptions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/subscriptions')
        .send({
          name: 'New Subscription',
          info: 'This is the brand new subscription!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSubscription = res.body;
          done();
        });
    });

    it('should respond with the newly created subscription', function() {
      newSubscription.name.should.equal('New Subscription');
      newSubscription.info.should.equal('This is the brand new subscription!!!');
    });
  });

  describe('GET /api/subscriptions/:id', function() {
    var subscription;

    beforeEach(function(done) {
      request(app)
        .get(`/api/subscriptions/${newSubscription.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          subscription = res.body;
          done();
        });
    });

    afterEach(function() {
      subscription = {};
    });

    it('should respond with the requested subscription', function() {
      subscription.name.should.equal('New Subscription');
      subscription.info.should.equal('This is the brand new subscription!!!');
    });
  });

  describe('PUT /api/subscriptions/:id', function() {
    var updatedSubscription;

    beforeEach(function(done) {
      request(app)
        .put(`/api/subscriptions/${newSubscription.id}`)
        .send({
          name: 'Updated Subscription',
          info: 'This is the updated subscription!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSubscription = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSubscription = {};
    });

    it('should respond with the original subscription', function() {
      updatedSubscription.name.should.equal('New Subscription');
      updatedSubscription.info.should.equal('This is the brand new subscription!!!');
    });

    it('should respond with the updated subscription on a subsequent GET', function(done) {
      request(app)
        .get(`/api/subscriptions/${newSubscription.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let subscription = res.body;

          subscription.name.should.equal('Updated Subscription');
          subscription.info.should.equal('This is the updated subscription!!!');

          done();
        });
    });
  });

  describe('PATCH /api/subscriptions/:id', function() {
    var patchedSubscription;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/subscriptions/${newSubscription.id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Subscription' },
          { op: 'replace', path: '/info', value: 'This is the patched subscription!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSubscription = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSubscription = {};
    });

    it('should respond with the patched subscription', function() {
      patchedSubscription.name.should.equal('Patched Subscription');
      patchedSubscription.info.should.equal('This is the patched subscription!!!');
    });
  });

  describe('DELETE /api/subscriptions/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/subscriptions/${newSubscription.id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when subscription does not exist', function(done) {
      request(app)
        .delete(`/api/subscriptions/${newSubscription.id}`)
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
