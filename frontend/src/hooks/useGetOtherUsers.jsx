import React ,{useEffect} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import { setOtherUsersAndMappings } from '../redux/userSlice.js';

const UseGetOtherUsers = () => {

    const dispatch = useDispatch();


   // use effect coz we are making network call
   useEffect(()=>{  // instead of useEffect , we are using useEffect here
        const fetchOtherUsers= async()=>{
            try {
                axios.defaults.withCredentials=true; // to avoid unauthenticated user , becoz in backend whenver in a reouter we have called isAuthenticated (Middleware) then , we have to make this axios...=true, to avoid error
                const res=await axios.get(`http://localhost:8080/api/v1/user/`);
                
                // store
                dispatch(setOtherUsersAndMappings(res.data));
                // console.log(res);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers(); // as when this useEffect will render , then we want initailly all users to be called ,
        // and thus along with this page rendering we want it to be called , since const.... krke sirf declare kiya h func , not called
   },[])
}

export default UseGetOtherUsers;
