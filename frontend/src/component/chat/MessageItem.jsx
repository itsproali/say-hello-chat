import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MessageItem = ({ message }) => {
  const { _id } = useSelector((state) => state.user);
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    if (message?.senderId === _id) {
      setIsMine(true);
    }
  }, [message, _id]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={isMine ? "flex-end" : "flex-start"}
      sx={{ my: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "fit-content",
          maxWidth: "60%",
          bgcolor: isMine ? "primary.main" : "grey.100",
          color: isMine ? "white" : "black",
          mr: 1,
          borderRadius: 5,
          py: 1,
          px: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: 14,
            fontWeight: 400,
          }}
        >
          {message?.message}
        </Typography>
      </Box>
    </Stack>
  );
};

export default MessageItem;
