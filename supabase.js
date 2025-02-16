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

module.exports = { saveWorkout };
