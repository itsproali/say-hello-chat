import { Box, Button, IconButton, Popover, Stack } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { BsImage } from "react-icons/bs";
import { MdFace } from "react-icons/md";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";

const MessageInput = () => {
  const {
    chat: { chat },
    user: { _id },
  } = useSelector((state) => state);
  const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSend = async () => {
    const { data } = await axiosInstance.post("/message/add", {
      message,
      chatId: chat._id,
      senderId: _id,
      type: "text",
    });
    setMessage("");
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <EmojiPicker
          height={350}
          previewConfig={{ showPreview: false }}
          skinTonesDisabled
          onEmojiClick={(emojiData, e) =>
            setMessage((prev) => prev + emojiData.emoji)
          }
        />
      </Popover>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <IconButton>
          <BsImage />
        </IconButton>

        <Stack direction="row" sx={{ width: "100%", position: "relative" }}>
          <textarea
            autoFocus
            type="text"
            placeholder="Type a message"
            resize="none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            style={{
              fontFamily: "Roboto, sans-serif",
              width: "100%",
              backgroundColor: "#eee",
              borderRadius: 20,
              border: "none",
              outline: "none",
              padding: "10px 40px 6px 15px",
              fontSize: "16px",
              height: "40px",
            }}
          />
          <IconButton
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            sx={{
              position: "absolute",
              right: 6,
              top: "50%",
              transform: "translateY(-50%)",
              p: 0.5,
            }}
          >
            <MdFace />
          </IconButton>
        </Stack>

        <Button
          variant="contained"
          onClick={handleSend}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </>
  );
};

export default MessageInput;
