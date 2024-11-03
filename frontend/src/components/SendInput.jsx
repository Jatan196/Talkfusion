import React, { useState } from 'react';
import { FaSmile } from 'react-icons/fa';
import { VscSend } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import Picker from 'emoji-picker-react';
import axios from 'axios';
import { BASE_URL } from '../baseurl';

const SendInput = () => {
    const [message, setMessage] = useState('');
   // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const dispatch = useDispatch();
    const { selectedUser , convoMappings } = useSelector(store => store.user);
    const {selectedGroup}= useSelector(store => store.group);
    const { messages } = useSelector(store => store.message);
     console.log(convoMappings[selectedUser?._id]);
     let convoId;

     if(convoMappings){
         convoId=convoMappings[selectedUser?._id];
     }

    if(!convoId){
        console.log(selectedGroup);
            console.log("above is selectedGroup");
        convoId=selectedGroup?._id; // means to load messages in group 
    }
        // console.log(convoId);
        // const onEmojiClick = (event, emojiObject) => {
        //     console.log("Emoji Object:", emojiObject.srcElement ); // Debugging line to see the emojiObject structure
        //     setMessage(prevMessage => prevMessage + emojiObject.target);
        //     setShowEmojiPicker(false);
        // };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        try {
            console.log(convoId);
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${convoId}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            dispatch(setMessages([...messages, res?.data?.newMessage]));
        } catch (error) { 
            console.log("Error sending message:", error);
        }

        setMessage('');
    };

    return (
        <div>
            <form onSubmit={onSubmitHandler}>    
                <div className='text-black flex items-center justify-between p-2'>
                    {/* <button type='button' onClick={() => setShowEmojiPicker(!showEmojiPicker)} className='relative'>
                        {/* <FaSmile className='text-xl' />
                        {showEmojiPicker && (
                            <div className='absolute bottom-full mb-2'>
                                <Picker onEmojiClick={onEmojiClick} />
                            </div>
                        )} 
                    </button> */}
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type='text'
                        placeholder='Send a message....'
                        className='border text-sm rounded-lg block placeholder-black p-1 flex-grow mx-2'
                    />
                    <button type='submit' className='text-white flex items-center justify-center'>
                        <VscSend />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendInput;
