import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../baseurl';
import Navbar from './Navbar';
      

const Signup = () => {

    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    })
    const handleCheckbox = (gender) => {
        setUser({ ...user, gender });
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // to prevent default page reload on submit
        console.log(user); // now to send data to backend will use network
    // const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    //         mode: 'onChange'
    //     }); for live validation and check (optional)
        try {

            const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            //  const res = await axios(config);
            toast.success(res.data.message);
            console.log(res);
        } catch (error) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
        setUser({
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: "",
        })
    } //internalBg
    return (
        <div className="">
             <div className="w-full fixed left-0 top-0 z-50">
                    <Navbar />
                </div>
            <div className='w-full p-6  rounded-lg shadow-md bg-gray-400 h-full w-full bg-pink-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15 border border-gray-100'>
               
                <h1 className="text-3xl font-bold text-center text-pink-300">SignUp</h1>

                <form onSubmit={onSubmitHandler} action="" className="text-pink-700 p-4 flex-items-space-justified">
                    <div className='p-4'>
                        {/* <label htmlFor="" className="label p-2">
                            <span className="text-base label-text pink-text">Your Full Name</span>
                        </label> */}
                        <input className='w-full input input-bordered h-10 '
                            value={user.fullName}
                            onChange={(e) => setUser({ ...user, fullName: e.target.value })} // its means copy previous user attributes as it is just update fullname/user.. particular field from e.target.value
                            type="text"  // also on change of single field we want remaing feilds data to be constant
                            placeholder='Enter Your Name' />

                    </div>
                    <div className='p-4'>
                        <input className='w-full input input-bordered h-10'
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            type="text"
                            placeholder='Enter Username' />
                    </div>
                    <div className='p-4'>
                        <input className='w-full input input-bordered h-10'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            type="Password"
                            placeholder='Enter Pass word' />
                        {/* {errors.password && <p className="error">{errors.password.message}</p>} */}
                    </div>
                    <div className='p-4'>
                        <input className='w-full input input-bordered h-10'
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            type="Password"
                            placeholder='Confirm Password' />
                    </div>
                    <div className='flex items-center my-4 bg-pink ' >
                        <div className="flex items-center text-pink-300">
                            <p>Male</p>
                            <input className='bg-white checkbox mx-2 '
                                checked={user.gender === "male"}
                                onChange={() => handleCheckbox("male")}
                                defaultChecked type="checkbox" />
                        </div>
                        <div className="flex items-center text-pink-300">
                            <p>Female</p>
                            <input className='bg-white checkbox mx-2'
                                checked={user.gender === "female"} // how it is working
                                onChange={() => handleCheckbox("female")}
                                type="checkbox" />
                        </div>
                    </div>
                    <p className='text-center p-4 text-pink-300'>Already Have An Account? <Link to="/login">Login</Link></p>

                    <button type="submit" className='btn btn-block  btn-sm bg-pink-500 '>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;