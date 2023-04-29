import {
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/user/userSlice";
import axiosInstance from "../utils/axios";

// ------------ RTK Query -------------
// import { useRegisterUserMutation } from "@/redux/user/userApi";

const Register = ({ setLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [register, { data, isSuccess, isLoading, error }] =
  //   useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // register({ name, email, password });
    try {
      const { data } = await axiosInstance.post("/user/create", {
        name,
        email,
        password,
      });
      if (data?.success) {
        toast.success(data?.message || "Registered Successfully", {
          id: "registerSuccess",
        });
        dispatch(setUser(data?.data));
        navigate("/chat");
      }
    } catch (error) {
      toast.error(error.message || "something went wrong", {
        id: "registerError",
      });
    }
  };

  return (
    <Card sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5">Sign up</Typography>
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
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
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
              <Typography variant="body2">Already have an account?</Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                  color: "primary.main",
                  cursor: "pointer",
                }}
                onClick={() => setLogin(true)}
              >
                Sign In
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5 }}
              disabled={name === "" || email === "" || password === ""}
            >
              Sign UP
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default Register;
