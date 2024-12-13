import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container, Paper, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const theme = useTheme();

  const {token, login, logout} = React.useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      username,
      password,
    });
   
    login(username, password);
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(0deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm" sx={{ py: 15 }}>
        <Box
          component={Paper}
          elevation={15}
          // onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            bgcolor: "background.paper",
            p: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            Login
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
