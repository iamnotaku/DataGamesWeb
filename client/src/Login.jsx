import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [values, setValues] = useState (
        {
            email: '',
            password: ''
        }
    )

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/login', values)
        .then(res => {
            if(res.data.Status === "Success")
            {
                navigate('/');
            } else 
            {
                alert("Error");
            }
        })
        .then(err => console.log(err));

    }

    return (
        <div className = 'd-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className = 'bg-white p-3 rounded w-25'>
                
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                        onChange={e => setValues({...values, email: e.target.value})} className = 'form-control rounded-1'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name= 'password' 
                        onChange={e => setValues({...values, password: e.target.value})} className = 'form-control rounded-1'/>
                    </div>
                    <button type="submit" className = 'btn btn-success w-100 rounded-2'> Login</button>
                    <p>You agree to our terms and policies</p>
                    <Link to='/register' className='btn btn-default border w-100 bg-light rounded-2 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login