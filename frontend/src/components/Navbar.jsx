import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    // const navigate = useNavigate(); // we can use both link or navigate method
    // const clickHandler1 = () => { 
    //     console.log("1");
    //     navigate("/");
    // }
    // const clickHandler2 = () => {
    //     navigate('/about');
    // }
    // const clickHandler3 = () => {
    //     navigate('/login');
    // }
    // const clickHandler4 = () => {
    //     navigate('/register');
    // }
    return (
        <nav className="flex justify-between w-full items-center p-4 sticky top-0 bg-gray-800 text-white">
            <div className="flex space-x-4">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          
                {/*                 <button className='hover::underline' onClick={clickHandler1}><h5>  Home</h5></button>
                <button className='hover::underline' onClick={clickHandler2}><h6>  About</h6> </button> */}
            </div>
            <div className="flex space-x-4">
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
                {/* <button className='hover::underline' onClick={clickHandler3}><h6> Login</h6></button>
                <button className='hover::underline' onClick={clickHandler4}><h6> Sign Up</h6></button> */}
            </div>
        </nav>
    );
}

export default Navbar;
