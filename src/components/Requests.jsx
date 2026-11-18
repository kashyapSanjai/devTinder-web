import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'
import { useNavigate } from 'react-router-dom'

const Requests = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const requestData = useSelector(store => store?.request)
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/requests/recieved', { withCredentials: true })
            dispatch(addRequest(res?.data?.data))
        }
        catch (err) {
            if (err.status == 401) {
                navigate('/login')
            }
            console.log(err.message);
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            await axios.patch(BASE_URL + '/request/review/' + status + '/' + _id, {}, { withCredentials: true })
            dispatch(removeRequest(_id))
        }
        catch (err) {
            console.log(err.message);

        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    if (!requestData) return
    if (requestData?.length == 0) return <h2 className='text-center font-bold my-4'>Requests not found</h2>

    return (
        <div className='text-center my-10'>
            <h2 className=' font-bold text-center my-5 text-2xl'>Requests</h2>
            {
                requestData?.map(con => {
                    return (
                        <div key={con.fromUserId?._id}
                            className='flex justify-between items-center w-1/2 m-4 p-4 rounded-lg bg-base-300 mx-auto'>
                            <div >
                                <img className='w-20 h-20 rounded-full object-cover' src={con.fromUserId?.photo_url} alt="" />
                            </div>
                            <div className='text-left mx-4'>
                                <p className='font-bold text-xl'>{con.fromUserId?.firstName + " " + con.fromUserId?.lastName}</p>
                                <p>{con.fromUserId?.age + ', ' + con.fromUserId?.gender}</p>
                                <p>{con.fromUserId?.about}</p>
                            </div>
                            <div className='mx-auto'>
                                <button className="btn btn-primary mx-2" onClick={() => reviewRequest('rejected', con._id)}>Reject</button>
                                <button className="btn btn-secondary" onClick={() => reviewRequest('accepted', con._id)}>Accept</button>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Requests
