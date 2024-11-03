import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';


const UseDeleteMessages =async (message) => {
    const dispatch=useDispatch();
    const {selectedUser}=useSelector(store=>store.user);
    try {
        const res = await axios.post(`http://localhost:8080/api/v1/message/delete/${selectedUser?._id}?msg_id=${message._id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        console(res);
        dispatch(setMessages([res?.data]));
    } catch (error) {
        console.log(error);
    }
}

export default UseDeleteMessages;