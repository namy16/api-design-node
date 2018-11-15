let router = require('express').Router();
let logger = require('../../util/logger');
let controller = require('./agentController');


router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.deleteAgent);

module.exports = router;
