import React, {useState} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`http://localhost:9000/login`, {
                email,
                password
            }).then((response) => {
                console.log("Login User>> ", JSON.stringify(response));
                toast.success("Login Succesfull !!");
                window.localStorage.setItem("redux_auth", JSON.stringify(response));

                // dispatch({
                //     type: "LOGGED_IN",
                //     payload: response.data
                // })
                // navigate("/");
            })
        }
        catch(err){
            console.log("Error in Login Page ", err);
        }
    }

    return (
        <div>
            <div className="mx-auto mt-4 text-center"> 
                <h2>Login Page</h2>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3">
                        <form onSubmit={handleSubmit} className="mt-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Email</label>
                                <input 
                                    type="email"
                                    className='form-control'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Password</label>
                                <input 
                                    type="password"
                                    className='form-control'
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </div>
                                
                            

                            <button disabled={!email || !password} className='btn btn-primary text-white'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default Login;