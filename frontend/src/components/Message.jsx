    import React, { useEffect, useRef, useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import UseDeleteMessages from '../hooks/useDeleteMessages';
    import { FaTrash } from 'react-icons/fa';
    import axios from 'axios';
    import { setMessages } from '../redux/messageSlice';

    const Message =  ({ message }) => {
        const scroll = useRef(); // for smooth auto scrolling of messages
        const { authUser,otherUsers } = useSelector(store => store.user);
        const sender = otherUsers.find(user => user?._id === message?.senderId);
        const otherName=sender?.fullName;
        const profilepic=sender?.profilePhoto;
  
        // const { selectedUser } = useSelector(store => store.user);
    //  const [showDelete, setShowDelete] = useState(false);
        
        // const deleteHandler = () => {
        //     // UseDeleteMessages(message); // from props
        // };
        const dispatch=useDispatch();

        useEffect(() => {
            scroll.current?.scrollIntoView({ behavior: "smooth" });
        }, [message]);

        const isChatEnd = authUser?._id === message?.senderId;
        
    
    console.log(message.message)
    console.log(isChatEnd);
        return (
            <>
                <div ref={scroll} className={` p-5 chat ${isChatEnd ? 'chat-end' : 'chat-start'}`}>
                    <div className="relative  overflow-auto-x overflow-auto-y   ">
                        <div className="chat-image avatar" style={{ marginRight: isChatEnd ? '0' : '10px', marginLeft: isChatEnd ? '10px' : '0' }}>
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User avatar"
                                    src={isChatEnd? authUser?.profilePhoto : profilepic}
                                />
                            </div>
                        </div>
                        <div className={`chat-bubble ${isChatEnd ? 'bg-gray-200 text-black' : 'bg-pink-300 text-black'}`}>
                        {
                            isChatEnd?(  <p className='text-blue-800'>You</p> ) : (<p className='text-blue-800'>{otherName} </p>)
                        } 
                            {message?.message}
                        </div>
                        <div className="chat-footer text-white">
                            <small>{new Date(message.createdAt).toLocaleTimeString()}</small>
                        </div>
                    
                {/* <FaTrash onClick={deleteHandler} className={`absolute top-2 ${isChatEnd ? 'right-0' : 'left-0'} inline-block text-blue-400 hover:white-red-600 hover:text-white rounded-md`} /> */}
                    </div>
                </div>
            </> 
        );
    };

    export default Message;
