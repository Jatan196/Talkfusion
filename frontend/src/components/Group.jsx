import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdGroups } from "react-icons/md";
import { setSelectedGroup } from '../redux/groupSlice';


const Group = (group) => {

    const dispatch = useDispatch();
    const selectedUserHandler = (group) => {
        
        dispatch(setSelectedGroup(group.group));
    }

    return (
        <>
            <div onClick={() => selectedUserHandler(group)} className={` h-10 flex flex-row gap-2  hover:bg-blue-300 hover:text-black`}>
                {/* // for avataar */}
                <div className=''>
                    <div className="">
                        <MdGroups className="text-black bg-slate-200 w-10 h-10 rounded-xl" />
                    </div>
                </div>
                <div className=''>
                    <div className="text-slate-200 gap-2 flex-1 ">
                        <p>{group?.group.chatName}</p>
                    </div>
                </div>
            </div>
            <div className="divider my-0 py-0 h-1 bg-zinc-400"></div>
        </>
    );
}

export default Group;
