import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ users }) => {
    const dispatch = useDispatch();

    const sendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + userId, {}, { withCredentials: true })
            dispatch(removeFeed(res.data.data.toUserId))
        }
        catch (err) {
            console.log(err.message);

        }
    }

    if (!users) return
    if (users?.length < 1) return <h2 className='text-center font-bold'>No Feed Available</h2>

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={users?.photo_url}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{users?.firstName + " " + users?.lastName}</h2>
                <p>{users?.age && users?.gender && users?.age + ", " + users?.gender}</p>
                <p>{users?.about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => sendRequest('ignored', users?._id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => sendRequest('interested', users?._id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
