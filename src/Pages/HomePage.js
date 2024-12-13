import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid2, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

export default function HomePage() {
  const theme = useTheme();
  const features = [
    {
      title: "Cost Estimation",
      text: "Using Lat-Lng vector distance calculation, we can estimate the cost of travel between two points.",
    },
    {
      title: "Foreign Country Calculation",
      text: "Using currency exchange rates, we can calculate the cost of travel in different countries.",
    },
    {
      title: "Emotion Based Suggestions",
      text: "Using machine learning algorithms, we can suggest travel destinations based on user emotion and budget.",
    },
    {
      title: "Personalized Recommendations",
      text: "Based on user preferences, we can recommend travel destinations that best suit their needs.",
    },
    {
      title: "Travel Guides",
      text: "We can provide travel guides for each destination, including information on transportation, accommodation, and activities.",
    },
  ];

  const howItWorks = [
    {
      title: "Step 1: Choose Your Destination",
      text: "Choose your destination from our list of available destinations.",
    },
    {
      title: "Step 2: Set Your Budget",
      text: "Set your budget for the trip. We will suggest destinations that fit your budget.",
    },
    {
      title: "Step 3: Select Your Emotion",
      text: "Choose your emotion from our list of available emotions. We will suggest destinations based on your emotion.",
    },
    {
      title: "Step 4: Get Your Recommendation",
      text: "We will suggest the best travel destination for you based on your preferences.",
    },
  ];

  const testimonials = [
    {
      name: "Jane Doe",
      quote:
        "This travel planner helped me find the perfect destination for my mood and budget!",
    },
    {
      name: "John Smith",
      quote:
        "I love how easy it is to get personalized recommendations. Highly recommend!",
    },
    {
      name: "Alice Johnson",
      quote:
        "The emotion-based suggestions are spot on! I had an amazing trip.",
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
          Emotion Based Travel Planner
        </Typography>
        <Typography variant="h2" sx={{ marginBottom: theme.spacing(4) }}>
          Plan your trip with ease
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/login">
          Get Started
        </Button>
      </Box>

      <Box sx={{ padding: theme.spacing(10), backgroundColor: "#bbdefb" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: theme.spacing(4) }}
          >
            Features
          </Typography>
          <Grid2
            container
            spacing={2}
            alignItems={"stretch"}
            justifyContent={"center"}
          >
            {features.map((feature, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Paper
                  sx={{
                    backgroundColor: "white",
                    boxShadow: 2,
                    height: "100%", // Ensures all cards are the same height
                  }}
                >
                  <Box p={2}>
                    <Typography variant="h5" gutterBottom textAlign={"center"}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1">{feature.text}</Typography>
                  </Box>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      <Box sx={{ padding: theme.spacing(10), backgroundColor: "#fce4ec" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: theme.spacing(4) }}
          >
            How it Works
          </Typography>
          <Grid2
            container
            spacing={4}
            alignItems={"stretch"}
            justifyContent={"center"}
          >
            {howItWorks.map((step, index) => (
              <Grid2  key={index}>
                <Paper
                  sx={{
                    backgroundColor: "white",
                    boxShadow: 2,
                    height: "100%", // Ensures all cards are the same height
                  }}
                >
                  <Box p={2}>
                    <Typography variant="h5">{step.title}</Typography>
                    <Typography variant="body1">{step.text}</Typography>
                  </Box>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      <Box sx={{ py: 10, backgroundColor: "#e1bee7" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: theme.spacing(4) }}
          >
            Testimonials
          </Typography>
          <Grid2 container spacing={4} justifyContent={"center"}>
            {testimonials.map((testimonial, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Paper
                  sx={{
                    
                    backgroundColor: "white",
                    boxShadow: 2,
                    height: "100%", // Ensures all cards are the same height
                  }}
                >
                  <Box p={2}>
                  <Typography variant="body1">"{testimonial.quote}"</Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ marginTop: theme.spacing(1), textAlign: "right" }}
                  >
                    - {testimonial.name}
                  </Typography>
                  </Box>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      <Box
        sx={{
          padding: theme.spacing(10),
          backgroundColor: "#d1c4e9",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Ready to Start Your Adventure?
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/login">
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
