const express = require('express');
const router = express.Router();

const contactusController = require('../controller/contactusController');



//-------------------- Create new category ---------------------->
router.post('/user/contactus', contactusController.contactQuery);


module.exports = router;