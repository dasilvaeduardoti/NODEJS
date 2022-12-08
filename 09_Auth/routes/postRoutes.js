const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');
const checarLogado = require('../helpers/auth').checarLogado;

router.get('/', checarLogado, PostController.showAll);
router.get('/post/create', checarLogado, PostController.create);
router.post('/post/create', checarLogado, PostController.createSave);

module.exports = router;