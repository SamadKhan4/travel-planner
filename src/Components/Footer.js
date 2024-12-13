import React from 'react'
import { Container, Box, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'black'
      }}
    >
      <Container maxWidth="lg" sx={{color: 'white'}}>
        <Typography variant="body2" color="white" align="center">
          Copyright &copy;
          {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" color="white" align="center">
          <Box component="span" sx={{ color: 'white' }}>
            Developed by PBCOE.
          </Box>
        </Typography>
      </Container>
    </Box>
  )
}

