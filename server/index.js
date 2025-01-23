import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
import bodyParser from "body-parser";
import {enquiryRoute} from './routes/enquiryRoute.js';
import {leadRoute} from './routes/leadRoute.js';
dotenv.config()

const app = express();

const PORT = process.env.PORT || 8000;
// Middleware to parse JSON



app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json());

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});
app.use("/api/lead", leadRoute)
app.use('/api/user', userRoute)
app.use("/api/residency", residencyRoute)
app.use("/api/enquiry", enquiryRoute)
