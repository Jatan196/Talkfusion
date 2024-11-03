import React from 'react';
import Message from './Message';
import UseGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux'

import UseGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
    // since for calling api , here no button type thing ,so we will mcreate a custom hook
    // custom hook
    
       UseGetMessages();

       
       UseGetRealTimeMessage();
        const {messages}=useSelector(store=>store.message);
        console.log(messages);
        // early return
         if(!messages) return;  

        if(messages && Array.isArray(messages)){
          console.log("yes its array");
          console.log(messages);
        }
        else console.log("not an array");
           
    return (
      <div className='p-10 flex-1 overflow-y-auto'>
        { 
          messages && messages?.map((message)=>{
            return(
           
               <Message key={message._id} message={message} />
            )
          })
        } 
      </div>
    );

}

export default Messages;
