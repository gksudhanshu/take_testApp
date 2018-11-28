/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/questionpools              ->  index
 * POST    /api/questionpools              ->  create
 * GET     /api/questionpools/:id          ->  show
 * PUT     /api/questionpools/:id          ->  upsert
 * PATCH   /api/questionpools/:id          ->  patch
 * DELETE  /api/questionpools/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Questionpool from './questionpool.model';

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
    res.status(statusCode).send(err);
  };
}

// Gets a list of Questionpools
export function index(req, res) {
  /**
   * Generate random number
   */

  let end=10
let start=1
var questionArr = []
 while (questionArr.length < 5) {
   var randomnumber = Math.floor(Math.random() * (end-start+1)) + start;
   if (questionArr.indexOf(randomnumber) > -1) continue;
   questionArr[questionArr.length] = randomnumber;
 }
  return Questionpool.find({QuestionNo: {
      $in: questionArr
    }}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Questionpool from the DB
export function show(req, res) {
  return Questionpool.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Questionpool in the DB
export function create(req, res) {
  return Questionpool.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Questionpool in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Questionpool.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Questionpool in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Questionpool.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Questionpool from the DB
export function destroy(req, res) {
  return Questionpool.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
