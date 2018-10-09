const express = require('express');
const router = express.Router();
const multer = require('multer');

const categoryController = require('../controller/categoryController');

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './uploads/');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage,fileFilter: fileFilter});

//-------------------- Create new category ---------------------->
router.post('/create/category', upload.single('categoryImage'), categoryController.createCategory);

//------------------ Get all categories ------------------->
router.get('/categories',categoryController.findAllCategories);

//------------------ Get category by id ------------------->
router.get('/category/:categoryId',categoryController.findCategoryById);

module.exports = router;