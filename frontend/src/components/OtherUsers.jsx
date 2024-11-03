import React from 'react';
import OtherPerson from './OtherPerson';
import  UseGetOtherUsers from '../hooks/useGetOtherUsers.jsx';
import {useSelector} from 'react-redux';
import UseGetGroups from '../hooks/useGetGroups.jsx';

const OtherUsers = () => {
    UseGetOtherUsers();
    UseGetGroups(); // to set all the groups in redux already
    
    // for using overflow we have to fix height of container , otherwise it will extend , standard ht-> 64, 96
   
    // my custom hook
    const {otherUsers} = useSelector(store=>store.user);
   
    // early return in react (asked in interview) , it is checking of selected state from userslice

    if(!otherUsers) return;
   
    return ( 
         <div className=' h-96 overflow-y-auto flex-1' > 
            {// ? is the optional chaining used here
                otherUsers?.map((user)=>{
                    return (
                        <OtherPerson key={user._id} user={user} /> // user is sent as a prop in otherPerson component
                    )
                })
            }
           
            
        </div>
    );
}

export default OtherUsers;
