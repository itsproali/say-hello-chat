import React from "react";
import ChatNav from "./ChatNav";
import { Box, Divider, Stack, Typography } from "@mui/material";
import logo from "../../assets/chat.png";

const ConversationDrawer = () => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ cursor: "pointer", p: 2 }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{ width: { xs: 25, md: 40 }, height: { xs: 25, md: 40 } }}
        />
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: 25, md: 30 }, fontWeight: 600 }}
        >
          Say Hello
        </Typography>
      </Stack>

      <Divider />
      <ChatNav />
    </>
  );
};

export default ConversationDrawer;
