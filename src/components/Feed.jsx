import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const feedData = useSelector(store => store.feed)

    const fetchFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true })
            dispatch(addFeed(res?.data?.users))
        }
        catch (err) {
            if(err.status==401){
                navigate('/login')
            }
            console.log(err.message);
            
        }
    }
    useEffect(() => {
        fetchFeed()
    }, [])

    return (
        <div className='flex justify-center my-10'>
            {feedData && feedData?.length>0? <UserCard users={feedData[0]}/> : <h2 className='text-center font-bold'>No Feed Available</h2> }
        </div>
    )
}

export default Feed
