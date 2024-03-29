import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../../redux/chat/chatSlice";
import axiosInstance from "../../utils/axios";
import MessageItem from "./MessageItem";
import { getSocket } from "../../socket/index";

const MessageList = () => {
  const {
    user: { _id },
    chat: { chat, messages, selectedChatUser },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const socket = getSocket();
  const [messageCount, setMessageCount] = useState(0);
  const bottomRef = useRef();

  // Get messages
  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axiosInstance.get(`/message/get/${chat._id}`);
      dispatch(setMessages(data?.data));
      setMessageCount(data?.messageCount);
    };

    if (chat?._id) {
      getMessages();
    }
  }, [chat]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Get New Message
  useEffect(() => {
    socket.on("getMessage", (data) => {
      if (
        data?.receiverId === _id &&
        data?.senderId === selectedChatUser?._id
      ) {
        dispatch(addMessage(data));
        setMessageCount((prev) => prev + 1);
      } else return;
    });
  }, []);

  return (
    <>
      {messageCount <= 0 ? (
        <Box
          sx={{
            height: "calc(100vh - 210px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: 25,
                fontWeight: 600,
              }}
            >
              No messages yet
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              Send a message to start a conversation
            </Typography>
          </Box>
        </Box>
      ) : (
        <Stack
          direction="column"
          // justifyContent="flex-end"
          sx={{
            height: "calc(100vh - 230px)",
            py: 0.5,
            mb: 2,
            overflowY: "auto",
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
          {messages?.map((message, i) => (
            <MessageItem key={message._id} index={i} message={message} />
          ))}
          <Box ref={bottomRef}></Box>
        </Stack>
      )}
    </>
  );
};

export default MessageList;
