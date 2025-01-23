import express from "express";
import { createLead } from "../controllers/LeadCntrl.js";

const router = express.Router();

// Route to create a new enquiry
router.post("/", createLead);

export {router as leadRoute}
