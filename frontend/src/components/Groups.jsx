import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {setGroups} from '../redux/groupSlice.js';
import Group from './Group';
import UseGetGroups from '../hooks/useGetGroups';


const Groups = () => {
    UseGetGroups(); 
    const dispatch=useDispatch();
    const {groups}=useSelector(store=>store.group);
 
    return (
        <div className=' h-96 overflow-y-auto flex-1' > 
        {// ? is the optional chaining used here
             groups?.map((group)=>{
                return (
                    // <></>
                     <Group key={group._id} group={group} /> // user is sent as a prop in otherPerson component
                )
            })
        }
       
        
    </div>
    );
}

export default Groups;
