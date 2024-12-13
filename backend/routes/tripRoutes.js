const express = require('express');
const tripController = require('../controllers/tripController');
const router = express.Router();

router.post('/plan', tripController.planTrip);

router.get('/cities', tripController.getCities);

module.exports = router;
