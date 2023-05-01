import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ChatNav from "../component/chat/ChatNav";
import ChatUser from "../component/chat/ChatUser";
import MessageInput from "../component/chat/MessageInput";
import MessageList from "../component/chat/MessageList";

// Repo Moved
const Chat = () => {
  const { selectedChatUser } = useSelector((state) => state.chat);

  return (
    <>
      <Grid container spacing={2}>
        {/* chat left */}
        <Grid
          item
          md={3}
          sx={{
            height: { xs: "calc(100vh - 50px)", md: "calc(100vh - 70px)" },
            display: { xs: "none", md: "inherit" },
          }}
        >
          <ChatNav />
        </Grid>

        {/* chat details */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            height: { xs: "calc(100vh - 50px)", md: "calc(100vh - 70px)" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "white",
              borderRadius: 3,
              p: 2,
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.15)",
            }}
          >
            {!selectedChatUser?._id ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: 600,
                  }}
                >
                  Select a chat to start messaging
                </Typography>
              </Box>
            ) : (
              <>
                {/* Chat User */}
                <ChatUser selectedChatUser={selectedChatUser} />

                {/* Message List */}
                <MessageList />

                {/* Message Input */}
                <MessageInput />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
