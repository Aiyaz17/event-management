import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [registration, setRegistration] = useState({
        name: "",
        email: "",
        password: ""
    });

    const {name, email, password} = registration;
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegistration({...registration, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`http://localhost:9000/register`, {
                name,
                email,
                password
            }).then((response) => {
                console.log("Register response>> ", response);
            })
        }
        catch(err){
            console.log("Error in Register Page ", err);
        }
    }

    return (
        <div>
            <div className="mx-auto mt-4 text-center">
                <h2>Register Form</h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3">
                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="form-group mb-3">
                            <label className="form-label">Your Name</label>
                            <input 
                                type="text"
                                name="name"
                                className='form-control'
                                placeholder='Enter Name'
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email"
                                name='eamil'
                                className='form-control'
                                placeholder='Enter Email'
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password"
                                name='password'
                                className='form-control'
                                placeholder='Enter Password'
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                            
                        

                        <button disabled={!email || !password || !name} className='btn btn-primary text-white'>Submit</button>
                    </form>
                    </div>
                </div>
            </div>
            
        </div>
    
  )
}

export default Register;