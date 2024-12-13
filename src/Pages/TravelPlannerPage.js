import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Backdrop,
  CircularProgress,
  Container,
  Grid2,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TravelPlannerPage() {
  const [days, setDays] = React.useState(0);
  const [people, setPeople] = React.useState(0);

  const [budget, setBudget] = React.useState(0);

  const [query, setQuery] = React.useState("");

  const [allData, setAllData] = React.useState([]);

  const [countriesList, setCountriesList] = React.useState([]);
  const [statesList, setStatesList] = React.useState([]);
  const [citiesList, setCitiesList] = React.useState([]);

  const [country, setCountry] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [lat, setLat] = React.useState(0.0);
  const [lng, setLng] = React.useState(0.0);

  const [backdropOpen, setBackdropOpen] = React.useState(false);

  const theme = useTheme();

  const navigate = useNavigate();

  const getData = async () => {
    axios
      .get(
        "http://127.0.0.1:5000/api/trip/cities"
        // { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
        setCountriesList(response.data.map((i) => i.name));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (country) {
      let allstates = allData.filter((i) => i.name === country)[0].states;
      console.log(allstates);

      setStatesList(allstates.map((i) => i.name));
      setState("");
      setCity("");
    }
  }, [country]);

  React.useEffect(() => {
    if (state) {
      let allcitites = allData
        .filter((i) => i.name === country)[0]
        .states.filter((i) => i.name === state)[0].cities;
      console.log(allcitites);

      setCitiesList(allcitites.map((i) => i.name));
      setCity("");
    }
  }, [state]);

  React.useEffect(() => {
    if (city) {
      setLat(
        allData
          .filter((i) => i.name === country)[0]
          .states.filter((i) => i.name === state)[0]
          .cities.filter((i) => i.name === city)[0].latitude
      );
      setLng(
        allData
          .filter((i) => i.name === country)[0]
          .states.filter((i) => i.name === state)[0]
          .cities.filter((i) => i.name === city)[0].longitude
      );
    }
  }, [city]);

  const { token, login, logout } = React.useContext(AuthContext);

  const handleSubmit = (event) => {
    // event.preventDefault()
    setBackdropOpen(true);
    axios
      .post("http://127.0.0.1:5000/api/trip/plan", {
        lat,
        lon: lng,
        days,
        people,
        budget,
        query,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/plans", { state: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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
            onSubmit={handleSubmit}
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
              Travel Planner
            </Typography>

            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="country-select"
                  select
                  label="Country"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  {countriesList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="state-select"
                  select
                  label="State"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  {statesList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="city-select"
                  select
                  label="City"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  {citiesList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="budget"
                  label="Budget"
                  type="number"
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="days"
                  label="Days"
                  type="number"
                  value={days}
                  onChange={(event) => setDays(event.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="people"
                  label="People"
                  type="number"
                  value={people}
                  onChange={(event) => setPeople(event.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 12 }}>
                <TextField
                  id="query"
                  label="Query"
                  type="text"
                  multiline
                  rows={3}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 12 }}>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Plan My Travel
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </Container>
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
