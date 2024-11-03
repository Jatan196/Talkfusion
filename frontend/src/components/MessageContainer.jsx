import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { setSelectedGroup } from '../redux/groupSlice';
import { MdGroups } from "react-icons/md";
import UseGetRealTimeMessage from '../hooks/useGetRealTimeMessage';
import { VscClearAll } from "react-icons/vsc";
import { MdDeleteForever } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../baseurl';
import { setMessages } from '../redux/messageSlice';

const MessageContainer = () => {
    UseGetRealTimeMessage();
    const { selectedUser, convoMappings } = useSelector(store => store.user);
    const { authUser, otherUsers } = useSelector(store => store.user);
    const { selectedGroup } = useSelector(store => store.group);
    const dispatch = useDispatch();
    const { onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);
    const members = otherUsers?.map((mem) => {
        if (mem._id != authUser._id && selectedGroup?.participants?.includes(mem._id))
            return mem.fullName
        
    })
    console.log(members);

    let convoId;
    if (selectedUser) {
        convoId = convoMappings[selectedUser?._id];
    }
    else {
        convoId = selectedGroup?._id;
    }
    const clearChat = async () => {
        try {
            if (selectedGroup && authUser._id != selectedGroup.admin) {
                 toast.error("Admins only (You Not Authorised)");
                return;
            }

            const res = await axios.post(`${BASE_URL}/api/v1/conversation/clear`, { id: convoId }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            toast.success("Chat Cleared Permanently");
            // if(selectedUser){    

            // }
            // console.log(res);
            dispatch(setMessages([]));
        } catch (error) {
            console.log(error);
        }

    }
    // const deleteChat = async () => {
    //     try {

    //         const res = await axios.post(`${BASE_URL}/api/v1/conversation/delete`, { id: convoId }, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             withCredentials: true
    //         })
    //         toast.success("Chat Deleted Permanently");
    //         console.log(res);
    //         if (selectedUser) {
    //             dispatch(setSelectedUser(null));
    //         }
    //         else {
    //             dispatch(setSelectedGroup(null));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     toast.success("Chat Deleted Permanently");
    // }
    // w-3/4 h-screen overflow-hidden
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className=' md:min-w-[700px]  flex flex-col'>
                        <div className='flex gap-2 items-center bg-pink-700 text-white p-2 px-4 py-2 mb-2'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                            <div className="button" onClick={clearChat}>
                                <VscClearAll className='text-white h-8 w-8 hover:cursor-pointer ' />
                            </div>

                        </div>
                        <Messages />
                        <SendInput />


                    </div >
                ) : (
                    selectedGroup !== null ? (

                        <div className='md:min-w-[700px] flex flex-col'>

                            {/* <div>
                              
                            </div> */}
                            <div className='flex
                             gap-2 items-center bg-pink-700 text-white px-4 py-2 mb-2'>
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-400">
                                    <MdGroups className="text-black w-10 h-10" />
                                </div>
                                <div className='flex flex-col flex-1'>
                                    <div className='flex text-2xl justify-between gap-2'>
                                        <p>{selectedGroup?.chatName}</p>
                                    </div>
                                    <div className='flex flex-row p-1'>{members?.map(mem => {

                                        if (mem)
                                            return (
                                                <p className='text-white p-2 border-2 rounded-md border-cyan-200'>{mem}</p>
                                            )
                                       })

                                    }
                                    </div>
                                </div>

                                <div className="button" onClick={clearChat}>
                                    <VscClearAll className='text-white h-8 w-8 hover:cursor-pointer ' />
                                </div>

                            </div>
                            <Messages />
                            <SendInput />
                        </div>
                    ) :

                        (
                            <div className='md:min-w-[900px]  flex flex-col justify-center items-center'>
                                <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName} </h1>
                                <h1 className='text-2xl text-white'>Let's start conversation</h1>

                            </div>
                        )

                )

            }

        </>
    );
};
//   <div className="button" onClick={deleteChat}>
{/* <MdDeleteForever className='text-white h-8 w-8 hover:cursor-pointer' />
</div> */}
export default MessageContainer;
