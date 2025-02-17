const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate-workout", async (req, res) => {
    const { injury, severity, timeline } = req.body;

    if (!injury || !severity || !timeline) {
        return res.status(400).json({ success: false, error: "Missing required parameters." });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a fitness coach. Provide 5 safe exercises for an injury." },
                { role: "user", content: `Give 5 exercises for a ${injury} injury with severity ${severity} and a ${timeline} recovery timeline. Format them in a numbered list, with each exercise on a new line.` }
            ]
        });

        res.json({ success: true, workout: response.choices[0].message.content });
    } catch (error) {
        console.error("Error generating workout:", error);
        res.status(500).json({ success: false, error: "Failed to generate workout plan." });
    }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
