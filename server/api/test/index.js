'use strict';

var express = require('express');
var controller = require('./test.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:email', controller.checkUserTest);
router.post('/', controller.create);
router.put('/:email', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
