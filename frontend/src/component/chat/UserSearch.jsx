import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFindUsersQuery } from "../../redux/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useCreateChatMutation } from "../../redux/chat/chatApi";
import { addChatUser, setSelectedChatUser } from "../../redux/chat/chatSlice";

const UserSearch = ({ handleClose }) => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const isOnline = true;

  const { data, isLoading } = useFindUsersQuery({ userId: user?._id, keyword });
  const [createChat, { data: chat, isSuccess }] = useCreateChatMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(addChatUser(chat));
    }
  }, [isSuccess]);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    console.log(e.target.value);
  };

  const handleClick = (data) => {
    createChat({ firstId: user?._id, secondId: data?._id });
    dispatch(setSelectedChatUser(data));
    handleClose();
  };
  return (
    <Box sx={{ width: 400, height: "50vh", py: 2 }}>
      <TextField
        type="text"
        label="Find User"
        size="small"
        autoComplete="off"
        fullWidth
        autoFocus={true}
        sx={{
          ".MuiOutlinedInput-notchedOutline": {
            borderRadius: 5,
          },
        }}
        onChange={handleSearch}
      />

      <Box>
        <Typography variant="body2" color="GrayText" sx={{ mt: 2 }}>
          {keyword ? `Search results for "${keyword}"` : "All users"}
        </Typography>

        <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
          {data?.data?.map((user) => (
            <Button
              key={user._id}
              variant="contained"
              onClick={() => handleClick(user)}
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
                bgcolor: "#F3F5FF99",
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
                  <Avatar alt={user?.name} src={user?.avatar} />
                </Badge>
              )}

              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                {isLoading ? (
                  <Skeleton width="100%">
                    <Typography>
                      ----------------------------------------
                    </Typography>
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
                      {user?.name || "No name"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "Grey",
                        fontSize: 12,
                        fontWeight: 400,
                        textTransform: "lowercase",
                      }}
                    >
                      {user?.email || "example@gmail.com"}
                    </Typography>
                  </>
                )}
              </Stack>
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default UserSearch;
