'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var opportunityCtrlStub = {
  index: 'opportunityCtrl.index',
  show: 'opportunityCtrl.show',
  create: 'opportunityCtrl.create',
  upsert: 'opportunityCtrl.upsert',
  patch: 'opportunityCtrl.patch',
  destroy: 'opportunityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var opportunityIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './opportunity.controller': opportunityCtrlStub
});

describe('Opportunity API Router:', function() {
  it('should return an express router instance', function() {
    opportunityIndex.should.equal(routerStub);
  });

  describe('GET /api/opportunitys', function() {
    it('should route to opportunity.controller.index', function() {
      routerStub.get
        .withArgs('/', 'opportunityCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/opportunitys/:id', function() {
    it('should route to opportunity.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'opportunityCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/opportunitys', function() {
    it('should route to opportunity.controller.create', function() {
      routerStub.post
        .withArgs('/', 'opportunityCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/opportunitys/:id', function() {
    it('should route to opportunity.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'opportunityCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/opportunitys/:id', function() {
    it('should route to opportunity.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'opportunityCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/opportunitys/:id', function() {
    it('should route to opportunity.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'opportunityCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
