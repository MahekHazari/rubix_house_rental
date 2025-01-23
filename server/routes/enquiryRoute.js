import express from "express";
import { createEnquiry } from "../controllers/EnquiryCntrl.js";

const router = express.Router();

// Route to create a new enquiry
router.post("/", createEnquiry);

export {router as enquiryRoute}
