const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Uploading files using local server
const uploadProductImageLocal = async (req, res) => {
    // Check 1: whether file is uploaded or not
    if (!req.files) {
        throw new CustomError.BadRequestError('No file uploaded');  // 400
    }

    // Taken the uploaded file with the help of 'express-fileupload' npm package
    const productImage = req.files.image;

    // Check 2: Whether its a image file or not
    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please upload image file');
    }

    // Check 3: Whether its size is within limit
    const maxSize = 1024 * 1024;   // 1 MB
    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please upload image with size less than 1kb');
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
    await productImage.mv(imagePath);   // for moving the uploaded image path to public -> uploads folder

    // Sending res acc. to frontend & we're using short URL becoz / -> points to home directory of public folder
    // and in the browser whatever we're seeing is from static files stored in public folder
    return res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
}

// Uploading files using cloudinary
const uploadProductImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'file-upload'   // Name of the folder created on cloudinary
        }
    );
    
    // In order to delete files stored in tmp folder
    fs.unlinkSync(req.files.image.tempFilePath);

    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
}

module.exports = {
    uploadProductImage
}