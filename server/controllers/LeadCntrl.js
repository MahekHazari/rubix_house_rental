import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Function to handle form submissions and save to MongoDB
export const createLead = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    whatsappUpdates,
  } = req.body.data;

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        whatsappUpdates,
      },
    });

    res.status(201).json({ message: "Lead submitted successfully", lead });
  } catch (error) {
    console.error("Error creating Lead:", error);

    if (error.code === "P2002") {
      res.status(400).json({ error: "An Lead with this phone number already exists" });
    } else {
      res.status(500).json({ error: "Failed to submit Lead" });
    }
  }
});