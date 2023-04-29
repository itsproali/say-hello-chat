import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import avatar from "../../assets/user.png";

const ChatUser = ({ selectedChatUser }) => {
  // const { selectedChatUser } = useSelector((state) => state.chat);
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        pb: 1,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Avatar
        src={selectedChatUser?.avatar}
        alt={selectedChatUser?.name}
      ></Avatar>
      {/* <Box
        component="img"
        src={selectedChatUser?.avatar || avatar}
        sx={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      /> */}

      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography
          variant="h6"
          sx={{
            color: "dark.main",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {selectedChatUser?.name}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChatUser;
