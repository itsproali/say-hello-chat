import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = ({}) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) {
      navigate("/chat");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <Box
      component="div"
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#F3F5FF",
        color: "#000",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default HomeLayout;
