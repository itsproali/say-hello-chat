import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import TopBar from "../component/chat/TopBar";
import { setActiveUsers } from "../redux/chat/chatSlice";
import { getSocket } from "../socket";

const ChatLayout = ({}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = getSocket();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user?.email) {
      navigate("/");
    }
  }, [user.email]);

  // Connect socket
  useEffect(() => {
    if (user?._id) {
      socket?.emit("addUser", user._id);
    }
    socket.on("getUsers", (users) => {
      dispatch(setActiveUsers(users));
    });
  }, [user, socket]);

  return (
    <Box
      component="div"
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: "#F3F5FF",
        color: "#000",
        p: {xs: 1, md: 2},
      }}
    >
      <TopBar />

      <Outlet />
    </Box>
  );
};

export default ChatLayout;
