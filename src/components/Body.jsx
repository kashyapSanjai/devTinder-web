import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'


const Body = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(store=>store.user)

    const fetchUser = async () => {
        if(userData) return;    
        try {
            const user = await axios.get(BASE_URL + "/profile/view", { withCredentials: true })
            dispatch(addUser(user.data))
            // console.log('sdfsdfdsf',user)
        }
        catch (err) {
            if(err.status==401){
                navigate('/login')
            }
            console.log(err);

        }
    }

    useEffect(() => {
        fetchUser();
    }, [])


    return (
        <div>
            <Navbar />
            {/* <h2>Body Page</h2> */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body
