require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');

// Use v2
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Database
const connectDB = require('./db/connect');

// Importing route file
const productRoute = require('./routes/productRoutes');

// Importing Custom Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// Middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// routes
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Welcome to File Upload API</h1>`);
})

// Routes
app.use('/api/v1/products', productRoute);

// Using custom middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to DB');
        app.listen(port, () => {
            console.log(`Server is running at Port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();