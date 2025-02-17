import React, { useState } from 'react';
import './register.css';

const Register = ({ onFormSwitch }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, username, password);
    }

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value = {email} onChange = {(e) => setEmail(e.target.value)} type = "email" placeholder = "rutgers@example.com" id = "email" name = "email" required/>
                <label htmlFor="username">Username</label>
                <input value = {username} onChange = {(e) => setUsername(e.target.value)} type = "text" placeholder = "username" id = "username" name = "username" required/>
                <label htmlFor="password">Password</label>
                <input value = {password} onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder = "********" id = "password" name = "password" required/>
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => onFormSwitch('login')}>
                Already have an account? Login here.
            </button>
        </div>
    )
}

export default Register;
