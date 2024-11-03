// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeNotification } from '../redux/notificationSlice';
// import { List, ListItem, ListItemText, IconButton, Badge } from '@mui/material';
// import { Notifications } from '@mui/icons-material';

// const NotificationsList = () => {
//     const {notifications} = useSelector(store => store.notify);
//     const dispatch = useDispatch();

//     const handleNotificationClick = (id) => {
//         dispatch(removeNotification(id));
//     };

//     return (
//         <div>
//             <IconButton aria-label="show notifications" color="inherit">
//                 <Badge badgeContent={notifications?.length} color="secondary">
//                     <Notifications />
//                 </Badge>
//             </IconButton>
//             <List>
//                 {notifications?.map(notification => (
//                     <ListItem key={notification?.id}  onClick={() => handleNotificationClick(notification?._id)}>
//                         <ListItemText primary={notification?.message} />
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );
// };

// export default NotificationsList;
