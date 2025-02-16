const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

async function getWorkoutPlan(injury, severity) {
  try {

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  
      messages: [
        {
          role: "system",
          content: "You are an expert fitness coach. You will be given an injury and its severity level, and you need to provide 5 workout recommendations that are safe and effective for the user.",
        },
        {
          role: "user",
          content: `Generate a workout plan for someone with ${injury} injury and severity level ${severity}. Provide 5 exercises with explanations.`,
        }
      ],
    });

    return response.choices[0].message.content.trim(); 
  } catch (error) {
    console.error("Error generating workout plan:", error);
    throw error;
  }
}

module.exports = { getWorkoutPlan };
