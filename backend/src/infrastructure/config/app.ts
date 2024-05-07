// Importing necessary libraries
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from '../routes/userRoute';
import errorHandler from '../../usecaseLayer/handler/errorHandler';
import adminRoute from '../routes/adminRoute';
// Load environment variables
dotenv.config();

// Creating the Express app
export const app = express();

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_SERVER, credentials: true }));


//Routes

app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)

app.use(errorHandler)
