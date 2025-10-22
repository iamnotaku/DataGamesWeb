import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {

    const [values, setValues] = useState(
        {
            name: '',
            surname: '',
            birth: '',
            username: '',
            email: '',
            password: ''
        }
    )

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/register', values)
        .then(res => {
            if(res.data.Status === "Success")
            {
                axios.post('http://localhost:8080/login', values)
                .then(res => {
                    if(res.data.Status === "Success")
                    {
                        navigate("/");
                    }
                })
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
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder='Enter Name' name='name' 
                        onChange={e => setValues({...values, name: e.target.value})} className = 'form-control rounded-1'required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="surname"><strong>Surname</strong></label>
                        <input type="text" placeholder='Enter Name' name='surname' 
                        onChange={e => setValues({...values, surname: e.target.value})} className = 'form-control rounded-1'required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="birth"><strong>Date of Birth</strong></label>
                        <input type="date" placeholder='Enter Name' name='birth' 
                        onChange={e => setValues({...values, birth: e.target.value})} className = 'form-control rounded-1'required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input type="text" placeholder='Enter Name' name='username' 
                        onChange={e => setValues({...values, username: e.target.value})} className = 'form-control rounded-1'required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                        onChange={e => setValues({...values, email: e.target.value})} className = 'form-control rounded-1'required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name= 'password' 
                        onChange={e => setValues({...values, password: e.target.value})} className = 'form-control rounded-1'required/>
                    </div>
                    <button type="submit" className = 'btn btn-success w-100 rounded-2'> Sign Up</button>
                    <p>You agree to our terms and policies</p>
                    <Link to='/login' className='btn btn-default border w-100 bg-light rounded-2 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
  )
}

export default Register