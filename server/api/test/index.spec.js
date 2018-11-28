'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var testCtrlStub = {
  index: 'testCtrl.index',
  show: 'testCtrl.show',
  create: 'testCtrl.create',
  upsert: 'testCtrl.upsert',
  patch: 'testCtrl.patch',
  destroy: 'testCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var testIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './test.controller': testCtrlStub
});

describe('Test API Router:', function() {
  it('should return an express router instance', function() {
    expect(testIndex).to.equal(routerStub);
  });

  describe('GET /api/tests', function() {
    it('should route to test.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'testCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/tests/:id', function() {
    it('should route to test.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'testCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/tests', function() {
    it('should route to test.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'testCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/tests/:id', function() {
    it('should route to test.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'testCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/tests/:id', function() {
    it('should route to test.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'testCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/tests/:id', function() {
    it('should route to test.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'testCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
