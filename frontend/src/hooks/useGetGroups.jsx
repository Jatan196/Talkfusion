import React ,{useEffect} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { setGroups } from '../redux/groupSlice.js';
import { BASE_URL } from '../baseurl.js';

const UseGetGroups = () => {

    const dispatch = useDispatch();
    const {authUser} = useSelector(store=>store.user);

   // use effect coz we are making network call
   useEffect(()=>{  // instead of useEffect , we are using useEffect here
        const fetchGroups= async()=>{
            try {
                axios.defaults.withCredentials=true; // to avoid unauthenticated user , becoz in backend whenver in a reouter we have called isAuthenticated (Middleware) then , we have to make this axios...=true, to avoid error
                const res=await axios.get(`${BASE_URL}/api/v1/conversation/get/${authUser._id}`);
                
                // store
              
                dispatch(setGroups(res.data.groups));
                 console.log(res);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchGroups(); // as when this useEffect will render , then we want initailly all users to be called ,
        // and thus along with this page rendering we want it to be called , since const.... krke sirf declare kiya h func , not called
   },[])
}

export default UseGetGroups;
