const express = require('express');
const router = express.Router();

const batchController = require('../controller/batchController');



//-------------------- Create new batches ---------------------->
router.get('/get/batches', batchController.getBatches);
router.post('/add/batch', batchController.addBatch);
router.delete('/delete/batches/:id', batchController.deleteBatches);
router.get('/:courseId', batchController.getBatchByCourseId);


module.exports = router;
