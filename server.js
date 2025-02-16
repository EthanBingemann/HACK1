const express = require("express");
const cors = require("cors");
require("dotenv").config();  
const { getWorkoutPlan } = require("./openaiService"); 
const app = express();

app.use(cors());
app.use(express.json());  

app.post("/generate-workout", async (req, res) => {
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


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
