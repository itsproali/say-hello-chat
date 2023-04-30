import { Box, Stack, Typography, TextField } from "@mui/material";
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
  // const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

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
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Typography
          variant="h5"
          sx={{
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Chats
        </Typography>

        <TextField
          type="text"
          label="Find User"
          size="small"
          autoComplete="off"
          fullWidth
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderRadius: 5,
            },
          }}
          onChange={handleSearch}
        />
      </Stack>

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
