import React, { useState } from 'react';
import { FaSearchPlus } from "react-icons/fa";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setSelectedGroup } from '../redux/groupSlice.js';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import Groups from './Groups';
import GroupChatModal from './CreateGroupModal.jsx';

const   Bar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { authUser, otherUsers, selectedUser } = useSelector(store => store.user);
    const { selectedGroup } = useSelector(store => store.group);
    const dispatch = useDispatch();
    const [isGroupShow, setGroupShow] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const searchHandler = (e) => {
        e.preventDefault();

        if (search === "") return;

        const searchedUser = otherUsers?.find((user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );

        if (searchedUser) {
            dispatch(setOtherUsers([searchedUser]));
        } else {
            toast.error("User not found!");
        }
    }

    const cancelSearch = () => {
        window.location.reload();
    }
    const handleGroupClick = () => {
        dispatch(setSelectedUser(null));
        setGroupShow(true);
    }
    const handleChatClick = () => {
        dispatch(setSelectedGroup(null));
        setGroupShow(false);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='md:min-w-[300px]  border-r border-slate-500 p-1 flex flex-col'>
            {/* Search input field for user */}
            <form onSubmit={searchHandler} className='relative mb-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-lg text-black w-full pl-10 pr-20'
                    type="text"
                    placeholder="Search for Contacts"
                />
                <button
                    type="button"
                    onClick={cancelSearch}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 hover:shadow-lg hover:scale-125 transition duration-200 ease-in-out"
                >
                    <BiRefresh className="text-gray-500" />
                </button>
                <button
                    type="button"
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 hover:shadow-lg hover:scale-125 transition duration-200 ease-in-out"
                >
                    <FaSearchPlus className="text-black" />
                </button>
                <button
                    type="submit"
                    onClick={handleOpenModal}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 hover:shadow-lg hover:scale-125 transition duration-200 ease-in-out"
                >
                    <AiOutlineUsergroupAdd />
                </button>


            </form>
            <div>
                {/* <button variant="contained" color="primary" onClick={handleOpenModal}>
                    Create Group Chat
                </button> */}
                <GroupChatModal 
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    users={otherUsers}
                    loggedInUser={authUser}
                />
            </div>
            <div className="divider bg-zinc-400 h-1 my-2"></div>
            <div className="flex justify-center py-2">
                <button
                    onClick={handleChatClick}
                    className="w-2/4 px-4 py-2 bg-blue-600 text-white border-r-2 border-white rounded-l hover:bg-blue-400"
                >
                    Chats
                </button>
                <button
                    onClick={handleGroupClick}
                    className="w-2/4 px-4 py-2 bg-pink-700 text-white rounded-r hover:bg-pink-400"
                >
                    Groups
                </button>
            </div>
            {!isGroupShow ? <div className='flex-grow overflow-auto'>
                <OtherUsers />
            </div>
                :
                <div className='flex-grow overflow-auto'>
                    <Groups />
                </div>
            }
        



        </div>
    );
}

export default Bar;
