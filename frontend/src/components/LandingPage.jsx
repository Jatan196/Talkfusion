import React from 'react';
import Navbar from './Navbar';
import LiveText from './LiveText';
//import ContentBlocks from './ContentBlocks';
import SuggestionForm from './SuggestForm';

const LandingPage = () => {
    return (
        <div className=" min-h-screen w-full mx-0" >

            <div className="w-full">

                <Navbar />

            </div>
            <div className=' bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <LiveText />

                {/*  */}

            </div>
     

        </div>
    );
}
//frontend\public\chatting.png frontend\public\chatting.png D:\backup chat app without group\Chat App\frontend\public\chatting.png
export default LandingPage;



