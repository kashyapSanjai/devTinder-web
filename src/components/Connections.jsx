import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Connections = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const connectionsData = useSelector(store => store.connection);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
            dispatch(addConnection(res?.data?.data))
        }
        catch (err) {
            if (err.status == 401) {
                navigate('/login')
            }
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if (!connectionsData) return

    if (connectionsData?.length == 0) return <h2 className='text-center font-bold my-4'>Connections not found</h2>

    return (
        <div className='text-center my-10'>
            <h2 className=' font-bold text-center my-5 text-2xl'>Connections</h2>
            {
                connectionsData?.map(con => {
                    return (
                        <div key={con._id}
                            className='flex w-1/2 m-4 p-4 rounded-lg bg-base-300 mx-auto'>
                            <div >
                                <img className='w-20 h-20 rounded-full object-cover' src={con.photo_url} alt="" />
                            </div>
                            <div className='text-left mx-4'>
                                <p className='font-bold text-xl'>{con.firstName + " " + con.lastName}</p>
                                <p>{con.age + ', ' + con.gender}</p>
                                <p>{con.about}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Connections
