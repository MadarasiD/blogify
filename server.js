const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const express = require('express');
const usersRouter = require('./routes/users/usersRoutes');
const connectDB = require('./config/database');
const { notFound, globalErrorHanlder } = require('./middlewares/globalErrorHandler');
const categoryRouter = require('./routes/category/categoryRouter');

//!Server

const app = express();

//?middleware
app.use(express.json());

//? Routes

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoryRouter);


connectDB();

app.use(notFound);

//! Error middleware
app.use(globalErrorHanlder);


const server = http.createServer(app);

//? Start the server

const PORT = process.env.PORT || 9080
server.listen(PORT, console.log(`A szerver fut a ${PORT} porton`));