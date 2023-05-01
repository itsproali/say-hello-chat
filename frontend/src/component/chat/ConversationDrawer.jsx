import React from "react";
import ChatNav from "./ChatNav";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import logo from "../../assets/chat.png";
import { IoIosArrowBack } from "react-icons/io";

const ConversationDrawer = ({ closeDrawer }) => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        sx={{ p: 1 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ cursor: "pointer" }}
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

        <IconButton onClick={closeDrawer}>
          <IoIosArrowBack />
        </IconButton>
      </Stack>

      <Divider />
      <ChatNav closeDrawer={closeDrawer} />
    </>
  );
};

export default ConversationDrawer;
