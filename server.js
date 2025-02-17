const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Create Supabase client with credentials
const supabase = createClient('https://xftfhvunwocaiaobgamj.supabase.co', 'your-supabase-api-key');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register new user
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        res.json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// User login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        const token = jwt.sign({ user_id: data.user.id }
