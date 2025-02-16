const express = require("express");
const supabase = require("../supabase");  
const { getWorkoutPlan } = require("../openaiService");

const router = express.Router();

router.post("/generate", async (req, res) => {
    const { injury, severity } = req.body;

    if (!injury || !severity) {
        return res.status(400).json({ success: false, error: "Injury and severity are required." });
    }

    try {
        const plan = await getWorkoutPlan(injury, severity);
        res.json({ success: true, plan });
    } catch (error) {
        console.error("Error generating workout plan:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/save", async (req, res) => {
    const { injury, severity, plan } = req.body;

    if (!injury || !severity || !plan) {
        return res.status(400).json({ success: false, error: "Injury, severity, and plan are required." });
    }

    try {
        const { data, error } = await supabase.from("workout").insert([{ injury, severity, plan }]);

        if (error) {
            console.error("Error saving workout:", error);
            return res.status(500).json({ success: false, error: error.message });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error("Error saving workout:", error);
        res.status(500).json({ success: false, error: "Internal server error while saving workout." });
    }
});

router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase.from("workout").select("*");

        if (error) {
            console.error("Error fetching workouts:", error);
            return res.status(500).json({ success: false, error: error.message });
        }

        res.json({ success: true, workouts: data });
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ success: false, error: "Internal server error while fetching workouts." });
    }
});

module.exports = router;
