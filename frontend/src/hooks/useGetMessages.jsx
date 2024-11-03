import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import toast from 'react-hot-toast';


const UseGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const { convoMappings } = useSelector(store => store.user);
    const {selectedGroup}= useSelector(store => store.group);
  
    let convoId;

    if(convoMappings){
        convoId=convoMappings[selectedUser?._id];
    }
    
    const fetchMessages = async () => {
        try {   
            console.log(convoId);
            if(!convoId){   
                console.log("hi");
                convoId=selectedGroup?._id; // means to load messages in group 
            }
            console.log(selectedGroup);
            console.log("sending request from hook");
            console.log(convoId);
            
            if(!convoId){   
                console.log(selectedGroup)
                console.log("InValid ConvoId");
                return;
            }
            axios.defaults.withCredentials = true; // since here authentication middleware will be there
            const res = await axios.get(`http://localhost:8080/api/v1/message/${convoId}`);

            console.log("api");
            console.log(res);

            // adding messages to messageSlice in store
            // if(res.data.isArray)
            dispatch(setMessages(res.data)); // here it is the conversation that i got 
        } catch (error) {
            toast.error("No Conversation found");
            console.log(error);
        }
    }
    useEffect(() => { fetchMessages();  }

 
        , [selectedUser?._id, selectedGroup, setMessages]) // since whenever selected user changes we have to call this use effect

}

export default UseGetMessages;