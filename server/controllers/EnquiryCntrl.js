import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Function to handle form submissions and save to MongoDB
export const createEnquiry = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    city,
    propertyType,
    propertySize,
    budget,
    requirements,
    timeline,
    whatsappUpdates,
  } = req.body.data;

  try {
    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        phone,
        city,
        propertyType,
        propertySize,
        budget,
        requirements,
        timeline,
        whatsappUpdates,
      },
    });

    res.status(201).json({ message: "Enquiry submitted successfully", enquiry });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "An enquiry with this email already exists" });
    } else {
      res.status(500).json({ error: "Failed to submit enquiry" });
    }
  }
});
