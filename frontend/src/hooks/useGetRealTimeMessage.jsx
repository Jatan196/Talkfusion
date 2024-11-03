import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";
import toast from "react-hot-toast";
import { setNotification } from "../redux/notificationSlice.js";

const UseGetRealTimeMessage = () => {
  const { socket } = useSelector(store => store.socket);
  const { messages } = useSelector(store => store.message);
  const dispatch = useDispatch();
  const { selectedUser, convoMappings, otherUsers } = useSelector(store => store.user);
  const { groups, selectedGroup } = useSelector(store => store.group);
  const { notifications } = useSelector(store => store.notify);

  let selectChatId;
  if (convoMappings) {
    selectChatId = convoMappings[selectedUser?._id];
  }

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log(selectedGroup);
      console.log(selectChatId);
      console.log(newMessage.conversationId);

      if ((!selectedGroup && !selectChatId) || (selectChatId !== newMessage.conversationId && selectedGroup?._id !== newMessage.conversationId)) {
        console.log("notification");
        const sender = otherUsers.find(user => user?._id === newMessage?.senderId);
        const notify = `New message from ${sender?.username}`;
        let currGroup=groups?.find(group => group._id == newMessage.conversationId);


        const newNoti = { chatId: newMessage.conversationId, notifyMsg: notify, isGroup: currGroup ? true : false};
        console.log(newNoti);

        if (notifications && notifications.length > 0) {
          dispatch(setNotification([...notifications, newNoti]));
        } else {
          dispatch(setNotification([newNoti]));
        }

        console.log(notify);
        toast.success("There is something you might be missing");
      }
      
      if (messages && (selectedUser?._id == newMessage?.senderId || selectedGroup?._id == newMessage?.conversationId) ) {
        dispatch(setMessages([...messages, newMessage]));
      }
      
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, selectedUser, selectedGroup, convoMappings, otherUsers, dispatch, selectChatId, groups]); // Added 'groups' as a dependency
};

export default UseGetRealTimeMessage;
