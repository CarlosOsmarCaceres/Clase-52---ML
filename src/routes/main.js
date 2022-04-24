// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); /* Ruta Listar productos */
router.get('/search', mainController.search); /* Ruta buscar */

module.exports = router;
