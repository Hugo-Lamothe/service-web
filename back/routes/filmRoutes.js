const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

router.get('/Film', filmController.getAllFilm);


module.exports = router;