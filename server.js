const express = require("express");
const cors = require("cors");
require("dotenv").config();  
const { getWorkoutPlan } = require("./openaiService"); 
const app = express();

app.use(cors());
app.use(express.json());  

//login
app.get("/login", (req, res) => {
    res.render("login", { error: null });
  });
  
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);
  
    //if user doesnt exist
    if (!user) {
      return res.render("login", { error: "User not found" });
    }
    
    //if wrong password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password" });
    }
  
    req.session.user = user;
    res.redirect("/dashboard");
  });
  
  // Register new account
  app.get("/register", (req, res) => {
    res.render("register", { error: null });
  });
  
  app.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    //If username already exists
    if (users.find((user) => user.username === username)) {
      return res.render("register", { error: "User already exists" });
    }

    //If email already exists
    if (users.find((email) => user.email === email)) {
        return res.render("register", { error: "Email already in use" });
      }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword });
  
    res.redirect("/login");
  });

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
