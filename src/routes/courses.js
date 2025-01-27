const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController.js');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.post('/handle-form-actions', courseController.handleFormAction);
router.get('/:id/edit', courseController.edit);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.force);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);
router.get('/:slug', courseController.show);

module.exports = router;
