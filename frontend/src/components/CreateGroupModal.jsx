import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Chip, Avatar } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setGroups } from '../redux/groupSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../baseurl';

const GroupChatModal = ({ open, onClose, users, loggedInUser }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [chatName, setChatName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const { groups } = useSelector(store => store.group);
    const { authUser } = useSelector(store => store.user);

    const dispatch = useDispatch();

    const handleUserChange = (event, newValue) => {
        setSelectedUsers(newValue);
    };

    const handleAdminChange = (event) => {
        console.log(selectedUsers);
        setIsAdmin(event.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked");

        const adminId = isAdmin ? loggedInUser._id : null;
        const updatedSelectedUsers = [...selectedUsers, authUser];

        if(selectedUsers.length < 2){
            toast.error("Select more than 2 users to create Group");
            return;
        }
        const groupData = {
            chatName,
            participants: updatedSelectedUsers.map(user => user._id),
            admin: adminId || authUser._id,
        };
        console.log(groupData);
        // Submit the groupData to your backend
        toast.success("Creating Conversation...");

        try {
            const res = await axios.post(`${BASE_URL}/api/v1/conversation/create`, {
                participants: groupData.participants,
                chatName: groupData.chatName,
                adminId: groupData.admin
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            toast.success("New Group Created");
            console.log(res.data);
            dispatch(setGroups([...groups, res.data.newConvo]));
        } catch (error) {
            console.log(error);
            toast.error("Failed to create group");
        }
        setChatName('');
        setSelectedUsers([]);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle className="bg-pink-800 text-slate-100">Create Group Chat</DialogTitle>
            <DialogContent className="bg-pink-100 p-1">
                <div className="flex flex-col space-y-5 p-3">
                    <TextField
                        label="Group Name"
                        value={chatName}
                        onChange={(e) => setChatName(e.target.value)}
                        fullWidth
                        className="bg-white p-1"
                    />
                    <Autocomplete
                        multiple
                        options={users}
                        getOptionLabel={(option) => option.username}
                        value={selectedUsers}
                        onChange={handleUserChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Add Users"
                                placeholder="Add users"
                                className="bg-white"
                            />
                        )}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    avatar={<Avatar>{option.username[0]}</Avatar>}
                                    label={option.username}
                                    {...getTagProps({ index })}
                                    className="bg-slate-100 text-black"
                                />
                            ))
                        }
                        fullWidth
                    />
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={handleAdminChange}
                            className="mr-2 checkbox-pink-950"
                        />
                        <label className="text-black">Make me the group admin</label>
                    </div>
                </div>
            </DialogContent>
            <DialogActions className="bg-pink-500">
                <button type="button" onClick={onClose} className="text-slate-100 hover:bg-slate-500 rounded-lg p-1">
                    Cancel
                </button>
                <button type="button" onClick={handleSubmit} className="bg-slate-800 p-1 text-white rounded-lg hover:bg-black">
                    Create
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default GroupChatModal;
