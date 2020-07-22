const express = require('express');

const router = express.Router();

const apiController = require('../controllers/api.controller');

router.get('/data', apiController.v1);

module.exports = router;
