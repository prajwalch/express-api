const express = require('express');

const router = express.Router();

const apiController = require('../controllers/api.v1.controller');

router.get('/', apiController.root);

module.exports = router;
