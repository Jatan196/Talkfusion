import './App.css';
import {RouterProvider, createBrowserRouter } from "react-router-dom";
import Window from "./components/Window";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { useEffect, useState } from 'react';
import { setSocket } from './redux/socketSlice';
import { setBackgroundImage, setOnlineUsers } from './redux/userSlice';
import LandingPage from './components/LandingPage';



const router=createBrowserRouter([
  {
    path:"/",
    element:<LandingPage/>
  },
  {
    path:"/window",
    element:<Window/>
  },
  {
    path:"/register",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])
function App() {
   // jab login hoga tabhi connection krenge backend se
    const {authUser} = useSelector(store=>store.user);
    const {socket} = useSelector(store=>store.socket);
    const dispatch=useDispatch();
    

    useEffect(() => {
    
      // Socket setup
      if (authUser) {
        const socketio = io('http://localhost:8080', {
          query: {
            userId: authUser._id
          }
        });
  
        dispatch(setSocket(socketio));
  
        socketio.on('getOnlineUsers', (onlineUsers) => {
          dispatch(setOnlineUsers(onlineUsers));
        });
  
        return () => socketio.close();
      } else {
        if (socket) {
          socket.close();
          dispatch(setSocket(null));
        }
      }
  
    }, [ authUser]);
  
  return (
    <div className="p-4  h-screen flex items-center justify-center">
      
      {/* <button class="btn btn-secondary">button</button> */}
      <RouterProvider router={router}/>
    </div>

  );
}

export default App;
