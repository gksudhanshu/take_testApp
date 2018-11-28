/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tests              ->  index
 * POST    /api/tests              ->  create
 * GET     /api/tests/:id          ->  show
 * PUT     /api/tests/:id          ->  upsert
 * PATCH   /api/tests/:id          ->  patch
 * DELETE  /api/tests/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Test from './test.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err)
    res.status(statusCode).send(err);
  };
}

// Gets a list of Tests
export function index(req, res) {
  return Test.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Test from the DB
export function checkUserTest(req, res) {
  console.log('=========================')
  return Test.find({Email:req.params.email}).exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Creates a new Test in the DB
export function create(req, res) {
  return Test.create(req.body.testObject)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Test in the DB at the specified ID
export function upsert(req, res) {
  console.log('params: ',req.params.email,req.body.correctAnswer,req.body.incorrectAns)
  return Test.update({Email:req.params.email},{$set:
    {'NoOfCorrectAnswer':req.body.correctAnswer}}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Test in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Test.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Test from the DB
export function destroy(req, res) {
  return Test.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
