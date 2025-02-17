const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function saveWorkout(injury, severity, plan) {
    const { data, error } = await supabase
        .from('workout')  
        .insert([{ injury, severity, plan }]); 

    if (error) {
        console.error("Error saving workout:", error);
        throw new Error("Error saving workout");
    }

    return data; 
}
//filter for workout 
// function parseWorkout(text) {
//     const exercises = text.split("\n").filter(line => line.trim() !== "");
//     return exercises.map(exercise => {
//       const parts = exercise.split(" - "); 
//       return {
//         name: parts[0]?.trim() || "Unknown",
//         description: parts[1]?.trim() || "No description available"
//       };
//     });
//   }
  
//   //Stores Workout in supabase
//   async function storeWorkouts(workouts) {
//     try {
//       const { data, error } = await supabase
//         .from("workouts")
//         .insert(workouts);
//       if (error) throw error;
//       console.log("Workouts stored successfully:", data);
//     } catch (error) {
//       console.error("Error storing workouts in Supabase:", error);
//     }
//   }

module.exports = { saveWorkout };
