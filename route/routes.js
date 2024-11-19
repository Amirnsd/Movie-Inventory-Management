const express = require("express");
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.homePage);
router.get('/category', controller.movieCategory);

router.get('/moviedetail', controller.getMovie); 

router.get('/moviedetail/edit/:id', controller.loadEditForm); 
router.post('/moviedetail/:id', controller.editMovie); 

router.delete('/moviedetail/:id', controller.removeMovie);


router.get('/moviedetail/add', controller.showAddForm);

router.post('/moviedetail', controller.addMovie); 


module.exports = router;
