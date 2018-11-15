let router = require('express').Router();
let logger = require('../../util/logger');
let controller = require('./depController');


router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/assignedAgents/:id')
  .get(controller.getAssignedAgents);

router.route('/addToDep/:id')
  .put(controller.addToDep);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.deleteDep);

module.exports = router;
