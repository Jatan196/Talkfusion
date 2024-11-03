import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Toolbar, AppBar, Typography, Box, Badge } from '@mui/material';
import { AccountCircle, Notifications, ExitToApp, Menu as MenuIcon } from '@mui/icons-material';
import ProfileModall from './ProfileModall.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSelectedUser, reset as resetUser } from '../redux/userSlice.js';
import { reset as resetMessages } from '../redux/messageSlice.js';
import { reset as resetSockets } from '../redux/socketSlice.js';
import { reset as resetGroups, setSelectedGroup } from '../redux/groupSlice.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import NotificationsList from './NotificationList.jsx';
import { setNotification } from '../redux/notificationSlice';

const drawerWidth = 240;

const ProfileBar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    let { authUser, selectedUser,otherUsers,convoMappings } = useSelector(store => store.user);
    let { selectedGroup,groups } = useSelector(store => store.group);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { notifications } = useSelector(store => store.notify);

    const show = () => {
        console.log(notifications);
        setShowNotify(!showNotify);
    };

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleProfileClick = () => {
     
        setOpenModal(true);
    };

    const handleNotificationClick = (notification) => {
        console.log("new notify..");
        let person=null;
        if (notification.isGroup) {
            console.log(groups);
            person=groups.find(group =>group._id === notification.chatId);
            if(person)
                dispatch(setSelectedGroup(person));
            dispatch(setSelectedUser(null));
        } else { 
             person = otherUsers.find(user => convoMappings[user._id] === notification.chatId);

            if(person)
                dispatch(setSelectedUser(person));
            dispatch(setSelectedGroup(null));
        }
        console.log(person);
        setOpenDrawer(false);
        let updatedNotifications=notifications.filter(noti=>noti!=notification);

        dispatch(setNotification(updatedNotifications));
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);

            dispatch(resetUser());
            dispatch(resetMessages());
            dispatch(resetSockets());
            dispatch(resetGroups());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar className='bg-gray-800 text-white'>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        TALK FUSIONN
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                open={openDrawer}
                onClose={toggleDrawer}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem onClick={handleProfileClick} className='hover: cursor-pointer'>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem className='hover: cursor-pointer' onClick={show} >
                            <ListItemIcon>
                                <Badge badgeContent={notifications?.length} className=' -inset-1' color="secondary">
                                    <Notifications  />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary="Notifications" />
                        </ListItem>
                        <ListItem>
                            {showNotify &&
                                <List>
                                    {notifications?.map(notification => (
                                        <ListItem
                                            key={notification?.id}
                                            className='hover: cursor-pointer'
                                            onClick={() => handleNotificationClick(notification)} // Wrap the handler in an arrow function
                                        >
                                            <ListItemText primary={notification?.notifyMsg} className='bg-blue-300 p-2 rounded-lg border-red-700 border-2 border-spacing-1' />
                                        </ListItem>
                                    ))}
                                </List>
                            }
                        </ListItem>
                    </List>
                    <Divider />
                    <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                        <List>
                            <ListItem onClick={logoutHandler} className='hover: cursor-pointer'>
                                <ListItemIcon>
                                    <ExitToApp />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <ProfileModall user={authUser} open={openModal} onClose={handleCloseModal} />
        </Box>
    );
};

export default ProfileBar;
