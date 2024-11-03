import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser , updateConvoMapping } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { BASE_URL } from '../baseurl';
import axios from 'axios';
 
const OtherPerson = (props) => {
    const user = props.user;
    const dispatch = useDispatch();
    const { authUser, selectedUser, onlineUsers, convoMappings } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = async (user) => {
        if (convoMappings[user._id] == null) {
            toast.success("New Conversation Created");
            console.log("New Conversation Created")
            const participants = [authUser._id, user._id];
            const grpName = "";
            const adminId="";
            try {
                
                const res = await axios.post(`${BASE_URL}/api/v1/conversation/create`,
                    {
                        participants,
                        grpName,
                        adminId
                    }, { 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                toast.success("New Conversation Created");
                console.log(res.data.newConvo._id);

                const userId=user._id ;
                const convoId=res.data.newConvo._id;
                dispatch(updateConvoMapping({userId , convoId}));
                dispatch(setSelectedUser(user));
            } catch (error) {
                console.log(error);
            }
        }   
        dispatch(setSelectedUser(user));
        console.log("clicked  ");
        // useCreateConvo();
    }
    // we made outer most div as react fragment , to add selected user handler ,but can we do it without doing it??
    // why we need to get selecteduser from store ??
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200  text-black': 'text-slate-200'} flex flex-row gap-2  hover:bg-blue-300 hover:text-black`}>
                {/* // for avataar */}
                <div className={`avatar ${isOnline ? 'online' : ''}`}>  {/* to depitct online dot  */}
                    <div className="w-12 rounded=full">
                        <img src={user?.profilePhoto} alt="profile pic"></img>
                    </div>
                </div>
                <div className=''>{/* other contact ka username */}
                    <div className=" hover:text-black gap-2 flex-1 ">
                        <p>{user?.fullName}</p>
                    </div>
                </div> 
            </div>
            <div className="divider my-0 py-0 h-1 bg-zinc-400"></div>
        </>
    );
}

export default OtherPerson;
