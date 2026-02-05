import express from "express";
import FarmFund from "../models/FarmFund.js";
import Notification from "../models/Notification.js";

const router = express.Router();


router.post("/farm-fund", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      category,
      country,
      residence,
      message
    } = req.body;

    // Basic validation
    if (
      !name ||
      !email ||
      !phone ||
      !category ||
      !country ||
      !residence ||
      !message
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const newEntry = await FarmFund.create({
      name,
      email,
      phone,
      category,
      country,
      residence,
      message
    });

    // 🔔 Create notification
    await Notification.create({
      title: "New FarmFund message received",
      description: message,
      type: "farmfund",
      sourceWebsite: "africa",
      link: "/farm-fund",
      date: new Date()
    });

    res.status(201).json({
      message: "Farm Fund form submitted successfully",
      data: newEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

export default router;
