const express = require('express');
const router = express.Router();
const multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
const utils = require('../utils/commonFunctions');
const categoryController = require('../controller/categoryController');

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};
const storage = GridFsStorage({
    url: utils.getProperty('mongo_connect_url'),
    cache: true,
    file: (req, file) => {
        return {
            filename: file.originalname

        }
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