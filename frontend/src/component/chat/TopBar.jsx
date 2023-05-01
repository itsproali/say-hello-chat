import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GrMenu } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/chat.png";
import { resetChat } from "../../redux/chat/chatSlice";
import { useUpdateAvatarMutation } from "../../redux/user/userApi";
import { logout, updateAvatarUrl } from "../../redux/user/userSlice";
import ConversationDrawer from "./ConversationDrawer";

const TopBar = () => {
  const user = useSelector((state) => state.user);
  const [updateAvatar, { data, isLoading, isSuccess, isError, error }] =
    useUpdateAvatarMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Left Side Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Right Side Popover menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  // Update User Avatar
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateAvatarUrl(data?.data));
      // toast.success("Avatar update", { id: "avatar-update" });
    } else if (isError) {
      toast.error(error?.message || "Avatar update failed", {
        id: "avatar-update-failed",
      });
    }
  }, [isLoading, isSuccess, isError, error]);

  const handleAvatarChange = async (e) => {
    const image = e.target.files[0];
    if (
      image.type !== "image/png" &&
      image.type !== "image/jpeg" &&
      image.type !== "image/jpg"
    ) {
      return toast.error("Image should be jpg/jpeg/png", {
        id: "avatar-error",
      });
    }
    const formData = new FormData();
    formData.append("avatar", image);
    formData.append("userId", user._id);

    handleClose();
    updateAvatar(formData);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    dispatch(resetChat());
    navigate("/");
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: { xs: 1, md: 2 }, px: { xs: 0, md: 2 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ cursor: "pointer" }}
        >
          <IconButton
            size="small"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer}
          >
            <GrMenu />
          </IconButton>
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

        <Avatar
          sx={{
            bgcolor: "orange",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            "&:active": { transform: "scale(0.9)" },
          }}
          alt={user?.name}
          src={user?.avatar}
          aria-describedby={id}
          onClick={handleClick}
        ></Avatar>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box sx={{ p: 1.5 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ borderBottom: "1px solid gray", mb: 3, pb: 0.7 }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: "dark.main",
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  color: "#fff",
                  cursor: "pointer",
                }}
                component="label"
                htmlFor="avatar"
              >
                <Typography sx={{ fontSize: 10 }}>Change avatar</Typography>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  hidden
                  onChange={handleAvatarChange}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </Box>
              <Box>
                <Typography variant="h6" sx={{}}>
                  {user?.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", fontSize: 12 }}
                >
                  {user?.email}
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Popover>
      </Stack>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <ConversationDrawer />
      </Drawer>
    </>
  );
};

export default TopBar;
