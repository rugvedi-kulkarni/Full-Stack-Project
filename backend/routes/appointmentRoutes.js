const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.get("/appointments", async (_req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Failed to load appointments." });
  }
});

router.post("/book", async (req, res) => {
  try {
    const { patientName, email, phone, doctor, date, time } = req.body;

    const appointment = new Appointment({
      patientName,
      email,
      phone,
      doctor,
      date,
      time,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to book appointment.",
      error: error.message,
    });
  }
});

module.exports = router;
