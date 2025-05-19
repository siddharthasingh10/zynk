// import { setMessages } from "@/redux/chatSlice";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetRTM = () => {
//     const dispatch = useDispatch();
//     const { socket } = useSelector(store => store.socketio);
//     const { messages } = useSelector(store => store.chat);
//     useEffect(() => {
//         socket?.on('newMessage', (newMessage) => {
//             dispatch(setMessages([...messages, newMessage]));
//         })

//         return () => {
//             socket?.off('newMessage');
//         }
//     }, [messages, setMessages]);
// };
// export default useGetRTM;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likeNotification: [],
};

const realTimeNotificationSlice = createSlice({
  name: "realTimeNotification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.likeNotification.push(action.payload);
    },
    markNotificationsAsRead: (state) => {
      state.likeNotification = [];
    },
  },
});

export const { setNotification, markNotificationsAsRead } = realTimeNotificationSlice.actions;
export default realTimeNotificationSlice.reducer;
