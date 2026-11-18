import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constant'
import UserCard from './UserCard'

const EditProfile = ({ users }) => {


    const [firstName, setFirstName] = useState(users?.firstName);
    const [lastName, setLastName] = useState(users?.lastName);
    const [age, setAge] = useState(users?.age);
    const [gender, setGender] = useState(users?.gender);
    const [about, setAbout] = useState(users?.about);
    const [photo_url, setPhoto_url] = useState(users?.photo_url);
    const [error, setError] = useState('');
    const [showToast, setshowToast] = useState(false);
    const dispatch = useDispatch();

    const updateProfile = async () => {
        try {
            setError('')
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, age, gender, photo_url, about
            }, { withCredentials: true })

            dispatch(addUser(res.data))
            setshowToast(true)
            setTimeout(()=>{
                setshowToast(false)
            },2000)
        }
        catch (err) {
            console.log(err.response);
            setError(err.response.data)

        }
    }

    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-96 shadow-xl  mx-5">
                <div className="card-body">
                    <fieldset className="fieldset">
                        <label className="label" htmlFor="name">First Name</label>
                        <input type="text" value={firstName} id="fname" className="input" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />

                        <label className="label" htmlFor="name">Last Name</label>
                        <input type="text" value={lastName} id="lname" className="input" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />

                        <label className="label" htmlFor="name">Age</label>
                        <input type="text" value={age} id="lname" className="input" placeholder="Age" onChange={(e) => setAge(e.target.value)} />

                        <label className="label" htmlFor="name">Gender</label>
                        <input type="text" value={gender} id="gender" className="input" placeholder="Gender" onChange={(e) => setGender(e.target.value)} />

                        <label className="label" htmlFor="name">Photo Url</label>
                        <input type="text" value={photo_url} id="photo" className="input" placeholder="Photo Url" onChange={(e) => setPhoto_url(e.target.value)} />

                        <label className="label" htmlFor="name">About</label>
                        {/* <input type="text" value={about} id="lname" className="input" placeholder="About" onChange={(e) => setAbout(e.target.value)} /> */}
                        <textarea className="textarea" value={about} placeholder="About" onChange={(e) => setAbout(e.target.value)}></textarea>
                    </fieldset>
                    <p className='text-red-500 '>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={updateProfile}>Update</button>
                    </div>
                </div>
            </div>
            {users && <UserCard users={{ firstName, lastName, age, gender, about, photo_url }} />}
            {showToast&&<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile Updated successfully.</span>
                </div>
            </div>}
        </div>
    )
}

export default EditProfile
