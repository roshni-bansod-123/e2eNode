const express = require('express');
const router = express.Router();

const contactusController = require('../controller/contactusController');



//-------------------- Create new category ---------------------->
router.put('/user/contactus', contactusController.contactQuery);
router.get('/user/getcontacts', contactusController.getAllContacts);
router.post('/user/change/status', contactusController.changeStatus);


module.exports = router;