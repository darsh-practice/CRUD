const express = require('express');

// /Users/mac/Desktop/Project/CRUD/src/anotherMain.js

const app = express();

// Middleware for sending responses
const sendResponse = (req, res, next) => {
    res.sendResponse = (status, message, data = null) => {
        res.status(status).json({
            status: status,
            message: message,
            data: data
        });
    };
    next();
};

// Use the middleware
app.use(sendResponse);

// Example route
app.get('/', (req, res) => {
    res.sendResponse(200, 'Success', { key: 'value' });
});
