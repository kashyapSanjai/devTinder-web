import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constant'

const Premium = () => {
    const handlePayment = async (membershipType) => {
        const order = await axios.post(BASE_URL + '/payment/create',
            {
                membershipType: membershipType
            },
            { withCredentials: true }
        )
        console.log(order?.data);

        const {keyId,orderId,amount,notes,currency} = order.data;

        const options = {
            key: keyId, // Replace with your Razorpay key_id
            amount: amount, // Amount is in currency subunits.
            currency: currency,
            name: 'devTinder Corp',
            description: 'Test Transaction',
            order_id: orderId, // This is the order_id created in the backend
            // callback_url: 'http://localhost:3000/payment-success', // Your success URL
            prefill: {
                name: notes.name,
                email: notes.email
            },
            theme: {
                color: '#F37254'
            },
        };

        const rzp = new Razorpay(options);
        rzp.open();


    }
    return (
        <div className='flex justify-center items-center  text-cen my-10 py-10'>
            <div className="card w-96 bg-base-300 shadow-sm ">
                <div className="card-body">
                    <span className="badge badge-xs badge-warning">Most Popular</span>
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold">Silver</h2>
                        <span className="text-xl">₹600</span>
                    </div>
                    <ul className="mt-6 flex flex-col gap-2 text-xs">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>High-resolution image generation</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Customizable style templates</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Batch processing capabilities</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>AI-driven image enhancements</span>
                        </li>
                        <li className="opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span className="line-through">Seamless cloud integration</span>
                        </li>
                        <li className="opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span className="line-through">Real-time collaboration tools</span>
                        </li>
                    </ul>
                    <div className="mt-6">
                        <button className="btn btn-primary btn-block" onClick={() => handlePayment('silver')}>Buy Now</button>
                    </div>
                </div>
            </div>
            <h1 className='mx-5'>Or</h1>
            <div className="card w-96 bg-base-300 shadow-sm">
                <div className="card-body">
                    {/* <span className="badge badge-xs badge-warning">Most Popular</span> */}
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold">Gold</h2>
                        <span className="text-xl">₹700</span>
                    </div>
                    <ul className="mt-6 flex flex-col gap-2 text-xs">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>High-resolution image generation</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Customizable style templates</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Batch processing capabilities</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>AI-driven image enhancements</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Seamless cloud integration</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Real-time collaboration tools</span>
                        </li>
                    </ul>
                    <div className="mt-6">
                        <button className="btn btn-primary btn-block" onClick={() => handlePayment('gold')}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Premium
