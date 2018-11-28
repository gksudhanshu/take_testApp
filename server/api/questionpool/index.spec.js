'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var questionpoolCtrlStub = {
  index: 'questionpoolCtrl.index',
  show: 'questionpoolCtrl.show',
  create: 'questionpoolCtrl.create',
  upsert: 'questionpoolCtrl.upsert',
  patch: 'questionpoolCtrl.patch',
  destroy: 'questionpoolCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var questionpoolIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './questionpool.controller': questionpoolCtrlStub
});

describe('Questionpool API Router:', function() {
  it('should return an express router instance', function() {
    expect(questionpoolIndex).to.equal(routerStub);
  });

  describe('GET /api/questionpools', function() {
    it('should route to questionpool.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'questionpoolCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/questionpools/:id', function() {
    it('should route to questionpool.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'questionpoolCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/questionpools', function() {
    it('should route to questionpool.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'questionpoolCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/questionpools/:id', function() {
    it('should route to questionpool.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'questionpoolCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/questionpools/:id', function() {
    it('should route to questionpool.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'questionpoolCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/questionpools/:id', function() {
    it('should route to questionpool.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'questionpoolCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
