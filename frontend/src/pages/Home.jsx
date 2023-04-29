import {
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/chat.png";
import Login from "../component/Login";
import Register from "../component/Register";

const Home = () => {
  const year = new Date().getFullYear();
  const [login, setLogin] = useState(true);
  return (
    <>
      <Container component="main" maxWidth="md">
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 8, md: 20 }}
          sx={{ minHeight: "100vh" }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="center"
            spacing={4}
            // sx={{ minHeight: "100vh" }}
          >
            <Box sx={{ width: "100%", display: "block" }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  component="img"
                  src={logo}
                  alt="logo"
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="h4">Say Hello</Typography>
              </Stack>
              <Typography
                variant="subtitle1"
                sx={{ lineHeight: 1.4, mt: 2, color: "#444" }}
              >
                A simple chat application built with React, Redux, Node,
                Express, Socket IO and MongoDB
              </Typography>
            </Box>

            {login ? (
              <Login setLogin={setLogin} />
            ) : (
              <Register setLogin={setLogin} />
            )}
          </Stack>

          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#444" }}>
              Developed by &nbsp;
              <MuiLink
                component={Link}
                to="http://itsproali.netlify.app"
                underline="hover"
                rel="noopener noreferrer"
                target="_blank"
              >
                Mohammad Ali
              </MuiLink>
            </Typography>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
