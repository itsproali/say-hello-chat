import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useGetUserChatsQuery } from "@/redux/chat/chatApi";
import { useState } from "react";
import { setChats } from "../../redux/chat/chatSlice";
import axiosInstance from "../../utils/axios";
import Conversation from "./Conversation";

const ChatNav = () => {
  const {
    user: { _id },
    chat: { chats, activeUsers },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [chats, setChats] = React.useState([]);

  useEffect(() => {
    const getChats = async () => {
      const { data } = await axiosInstance.get(`/chat/get/${_id}`);
      dispatch(setChats(data?.data));
    };
    getChats();
  }, []);

  // const { data, isLoading } = useGetUserChatsQuery(_id, {
  //   skip: _id ? false : true,
  // });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "white",
        overflowY: "auto",
        borderRadius: 3,
        py: 3,
        px: 2,
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.15)",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          borderRadius: "20px",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        Chats
      </Typography>

      <Stack
        direction="column"
        alignItems="flex-start"
        spacing={1}
        sx={{ mt: 2 }}
      >
        {chats?.map((chat, i) => {
          const chatUserId = chat?.members?.find((u) => u !== _id);
          const isOnline = activeUsers?.some((u) => u?.userId === chatUserId);
          return (
            <Conversation
              chatUserId={chatUserId}
              chat={chat}
              key={i}
              isOnline={isOnline}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default ChatNav;
