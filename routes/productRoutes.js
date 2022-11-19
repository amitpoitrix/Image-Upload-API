const express = require('express');
const router = express.Router();

// Importing Controllers
const { createProduct, getAllProducts } = require('../controllers/productController');
const { uploadProductImage } = require('../controllers/uploadsController');

router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImage);

module.exports = router;