import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'

const Login = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')//virat@gmail.com
    const [password, setPassword] = useState('')//Virat@1234
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await axios.post(BASE_URL + "/login",
                { emailId, password },
                { withCredentials: true }
            )
            dispatch(addUser(data.data))
            navigate('/')
        } catch (err) {
            setError(err?.response?.data || "Somwthing went wrong");
        }

    }

    const signup = async () => {
        try {
            const res = await axios.post(BASE_URL + '/signup',
                { firstName, lastName, emailId, password },
                { withCredentials: true })
            dispatch(addUser(res.data.data))
            navigate('/profile')

        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div className='flex justify-center my-5'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className='text-center font-bold text-2xl'>{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <fieldset className="fieldset">
                        {
                            !isLogin && <>
                                <label className="label" htmlFor="name">First Name</label>
                                <input type="text" value={firstName} id="fname" className="input" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />

                                <label className="label" htmlFor="name">Last Name</label>
                                <input type="text" value={lastName} id="lname" className="input" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                            </>
                        }

                        <label className="label" htmlFor="name">Email</label>
                        <input type="text" value={emailId} id="name" className="input" placeholder="Email" onChange={(e) => setEmailId(e.target.value)} />

                        <label className="label" htmlFor="name">Password</label>
                        <input type="password" value={password} id="name" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>
                    <p className='text-red-500 '>{error}</p>
                    <p className='cursor-pointer' onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Signup from here...' : 'Login here...'}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={isLogin?handleLogin:signup}>{isLogin ? 'Login' : 'Sign Up'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
