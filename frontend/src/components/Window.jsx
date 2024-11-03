import React from 'react';
import MessageContainer from './MessageContainer.jsx';
import SideBar from './bar.jsx';
import ProfileBar from './ProfileBar.jsx';

const Signup = () => {
    return (
        <div className='internalBg sm:h-[600px] md:h-[800px] flex p-5'>
            <ProfileBar />
            <div className='flex flex-grssow  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <SideBar className='w-1/3 overflow-auto' />
                <MessageContainer className='w-2/3  overflow-auto' />
            </div>
        </div>
    )
}

export default Signup;
