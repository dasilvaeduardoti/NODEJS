const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');
const checarLogado = require('../helpers/auth').checarLogado;

router.get('/', checarLogado, PostController.showAll);

module.exports = router;