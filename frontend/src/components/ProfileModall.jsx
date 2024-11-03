import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Visibility as ViewIcon } from '@mui/icons-material';

const ProfileModal = ({ user,open,onClose }) => {
 // const [open, setOpen] = React.useState(open);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  

  return (
    <>
      {/* {children ? (
        <span onClick={handleClickOpen}>{children}</span>
      ) : (
        <IconButton onClick={handleClickOpen}>
          <ViewIcon />
        </IconButton>
      )} */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="responsive-dialog-title" className="bg-pink-800 text-slate-100">
          {user?.name}
        </DialogTitle>
        <DialogContent className="bg-red-300">
          <div className="flex flex-col items-center space-y-4">
            <Avatar
              alt={user?.name}
              src={user?.profilePhoto}
              sx={{ width: 150, height: 150 }}
              className="bg-slate-100"
            />
            <DialogContentText className="text-black bg-white p-2 rounded-lg">
              Name: {user?.username}
            </DialogContentText>
            <DialogContentText className="text-black bg-white p-2 rounded-lg">
              FullName: {user?.fullName}
            </DialogContentText>
         
          </div>
        </DialogContent>
        <DialogActions className="bg-pink-500 text-black">
          <Button onClick={onClose} className=" ">
            <div className='text-black hover:bg-slate-500  rounded-lg p-2'>Close</div>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;
