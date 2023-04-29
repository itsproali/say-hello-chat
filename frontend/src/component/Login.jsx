import {
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import axiosInstance from "../utils/axios";

// ---------- RTK Query ------------
// import { useLoginUserMutation } from "@/redux/user/userApi";

const Login = ({ setLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [login, { data, isSuccess, isLoading, error }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // login({ email, password });
    try {
      const { data } = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      if (data?.success) {
        toast.success("Successfully logged in", { id: "loginSuccess" });
        dispatch(setUser(data?.data));
        navigate("/chat");
      }
    } catch (error) {
      toast.error(error.message || "something went wrong", {
        id: "loginError",
      });
    }
  };

  return (
    <Card sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5">Sign in</Typography>
      <form
        style={{ width: "100%", marginTop: "10px" }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ bgcolor: "#F3F5FF" }}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ bgcolor: "#F3F5FF" }}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="body2">Don't have an account?</Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                  color: "primary.main",
                  cursor: "pointer",
                }}
                onClick={() => setLogin(false)}
              >
                Sign Up
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ my: 1, py: 1.5 }}
              disabled={email === "" || password === ""}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default Login;
