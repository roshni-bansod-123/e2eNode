const express = require('express');
const router = express.Router();

const batchController = require('../controller/batchController');



//-------------------- Create new category ---------------------->
router.get('/get/batches', batchController.getBatches);
router.post('/add/batch', batchController.addBatch);
router.delete('/delete/batches/:id', batchController.deleteBatches);


module.exports = router;