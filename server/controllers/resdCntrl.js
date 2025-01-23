import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { body, validationResult } from "express-validator"; // Import for validation

// Create a residency
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  // Validate request data
  if (!title || !description || !price || !address || !country || !city || !userEmail) {
    return res.status(400).json({ message: "All required fields must be provided." });
  }

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities: facilities || [], // Handle optional fields
        image: image || null,
        owner: { connect: { email: userEmail } },
      },
    });

    res.status(201).json({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      res.status(409).json({ message: "A residency with this address already exists." });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

// Get all residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(residencies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching residencies." });
  }
});

// Get a specific residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });

    if (!residency) {
      return res.status(404).json({ message: "Residency not found." });
    }

    res.status(200).json(residency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
