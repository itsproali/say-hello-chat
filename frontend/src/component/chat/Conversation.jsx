import {
  Avatar,
  Badge,
  Button,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChat, setSelectedChatUser } from "../../redux/chat/chatSlice";
import axiosInstance from "../../utils/axios";
// import { useGetUserInfoQuery } from "@/redux/user/userApi";

const Conversation = ({ chatUserId, chat, isOnline }) => {
  const {
    chat: { selectedChatUser },
  } = useSelector((state) => state);
  const [chatUser, setChatUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  // const { data: chat, isSuccess } = useGetChatQuery(user._id, chatUserId, {
  //   skip: user._id && chatUserId ? false : true,
  // });

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axiosInstance.get(`/user/info/${chatUserId}`);
      setIsLoading(false);
      setChatUser(data?.data);
    };
    getUserData();
  }, []);

  // useEffect(() => {
  //   if (user?._id) {
  //     socket?.current?.emit("addUser", user._id);
  //   }
  // }, [user, socket]);

  // useEffect(() => {
  // const getChatData = async () => {
  //   const { data } = await axiosInstance.get(
  //     `/chat/get-chat/${user._id}/${chatUserId}`
  //   );
  //   console.log(data);
  //   dispatch(setChat(data?.data));
  // };

  // if (user._id && chatUserId) {
  // getChatData();
  //   }
  // }, [chatUserId]);

  const handleClick = () => {
    dispatch(setSelectedChatUser(chatUser));
    dispatch(setChat(chat));
  };
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 2,
        cursor: "pointer",
        width: "100%",
        px: 2,
        py: 1,
      boxShadow: "none",
        bgcolor:
          chatUserId === selectedChatUser?._id ? "#bbdefb44" : "#F3F5FF99",
        "&:hover": {
          bgcolor: "#bbdefb44",
          boxShadow: "none",
        },
      }}
    >
      {isLoading ? (
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      ) : (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: isOnline ? "#44b700" : "#aaa",
              color: isOnline ? "#44b700" : "#aaa",
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        >
          <Avatar alt={chatUser?.name} src={chatUser?.avatar} />
        </Badge>
      )}

      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {isLoading ? (
          <Skeleton width="100%">
            <Typography>----------------------------------------</Typography>
          </Skeleton>
        ) : (
          <>
            <Typography
              variant="h6"
              sx={{
                color: "dark.main",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {chatUser?.name || "No name"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "Grey",
                fontSize: 12,
                fontWeight: 400,
              }}
            >
              {isOnline ? "Online" : "Offline"}
            </Typography>
          </>
        )}
      </Stack>
    </Button>
  );
};

export default Conversation;
