import React, {useState} from 'react';
import './login.css';


const Login = ({ onFormSwitch }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email,password);
}

return (
    <div className = "auth-container">
        <h2>Login</h2>
        <form className = "login-form" onSubmit = {handleSubmit}>
            <label htmlFor = "email">Email</label>
            <input value = {email} onChange = {(e) => setEmail(e.target.value)} type = "email" placeholder = "rutgers@example.com" id = "email" name = "email"/>
            <label htmlFor = "password">Password</label>
            <input value = {password} onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder = "*********" id = "password" name = "password" />
            <button type = "submit" > Log In</button>
        </form>
        <button className = "link-btn" onClick={() => onFormSwitch('regular')} > Don't have an account? Click here to Register.</button>
    </div>
)
}

export default Login;
