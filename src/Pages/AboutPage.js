import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Grid2, Paper, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function AboutPage() {
  const theme = useTheme();

  const students = [
    {
      name: "Alice Johnson",
      role: "Project Manager",
      image: "https://via.placeholder.com/150",
      description:
        "Alice led the project, coordinating the team's efforts and ensuring timely completion.",
    },
    {
      name: "John Smith",
      role: "Lead Developer",
      image: "https://via.placeholder.com/150",
      description:
        "John was responsible for developing the core features and implementing the backend.",
    },
    {
      name: "Jane Doe",
      role: "UI/UX Designer",
      image: "https://via.placeholder.com/150",
      description:
        "Jane designed the user interface and experience, focusing on usability and aesthetics.",
    },
    {
      name: "Bob Brown",
      role: "Data Scientist",
      image: "https://via.placeholder.com/150",
      description:
        "Bob analyzed data and developed algorithms to provide personalized recommendations.",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          padding: theme.spacing(10),
          textAlign: "center",
          backgroundColor: "#e3f2fd",
        }}
      >
        <Typography variant="h1" sx={{ marginBottom: theme.spacing(4) }}>
          Meet Our Team
        </Typography>
        <Typography variant="h2" sx={{ marginBottom: theme.spacing(4) }}>
          Dedicated Students Behind the Project
        </Typography>
      </Box>

      <Box sx={{ padding: theme.spacing(10), backgroundColor: "#bbdefb" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: theme.spacing(4) }}
          >
            About Us
          </Typography>
          <Grid2 container spacing={4} alignItems={"stretch"}>
            {students.map((student, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 6 }} key={index}>
                <Paper
                  sx={{
                    backgroundColor: "white",
                    boxShadow: 2,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <Box p={2}>
                    <Avatar
                      alt={student.name}
                      src={student.image}
                      sx={{ width: 100, height: 100, margin: "auto" }}
                    />
                    <Typography
                      variant="h5"
                      sx={{ marginTop: theme.spacing(2) }}
                    >
                      {student.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginBottom: theme.spacing(2) }}
                    >
                      {student.role}
                    </Typography>
                    <Typography variant="body2">
                      {student.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>
    </Box>
  );
}
