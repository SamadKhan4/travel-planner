import { Box, Button, Container, Paper, TextField, Typography, useTheme } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function SignupPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [profileImage, setProfileImage] = React.useState(null);

  const theme = useTheme();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setProfileImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0]
      );
    },
    accept: "image/*",
    multiple: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    axios
      .post("http://localhost:5000/api/users/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        alert("Signup successful!");
      })
      .catch((error) => {
        console.log(error);
        alert("Signup failed!", error);
      });
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ textAlign: "center" }}
            >
              Signup
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
            <div {...getRootProps()} style={{ border: profileImage?'none':"2px dashed black", margin: "1rem 0" }}>
              <input {...getInputProps()} />
              {
                isDragActive ? <p>Drop the image here ...</p> : !profileImage ? <p>Drag 'n' drop or click to select profile image</p> : <p>Profile Image</p>
              }
              {profileImage && (
                <div style={{ position: "relative" }}>
                  <img
                    src={profileImage.preview}
                    alt={profileImage.name}
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                  <Button
                    onClick={() => setProfileImage(null)}
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                    variant="contained"
                    color="error"
                  >
                    X
                  </Button>
                </div>
              )}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Signup
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


