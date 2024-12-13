import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  Divider,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import MapLink from "../Components/MapLink";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function PlansPage() {
  const location = useLocation(); // Get the state from the navigate
  const data = location.state || {}; // Extract state properties

  const [myData, setMyData] = React.useState(data);

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortByScore = (reverse) => {
    let places = myData.places.sort((a, b) => b.RankScore - a.RankScore);
    if (reverse) {
      places = places.reverse();
    }
    setMyData({ ...myData, places: places });
  };

  const sortByExpenses = (reverse) => {
    let places = myData.places.sort((a, b) => b.TotalCost - a.TotalCost);
    if (reverse) {
      places = places.reverse();
    }
    setMyData({ ...myData, places: places });
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [modalPlace, setModalPlace] = React.useState({});

  const handleOpenModal = (place) => {
    setModalPlace(place);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box py={5}>
        <Container maxwidth="lg">
          <Typography variant="h3" gutterbottom textAlign="center">
            Travel Plans{" "}
          </Typography>

          <Box display={"flex"} justifyContent="center" py={4}>
            {myData.top5Emotions.map((emotion) => (
              <Chip
                label={`${emotion.emotion} - ${emotion.score.toFixed(2)}`}
                sx={{ m: 1 }}
              />
            ))}
          </Box>

          <Box display={"flex"} justifyContent="end" py={4}>
            <IconButton
              id="filter-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FilterAltIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "filter-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  sortByScore(false);
                }}
              >
                By Score <ArrowUpwardIcon sx={{ ml: 1 }} />{" "}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  sortByScore(true);
                }}
              >
                By Score <ArrowDownwardIcon sx={{ ml: 1 }} />{" "}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  sortByExpenses(false);
                }}
              >
                By Cost <ArrowUpwardIcon sx={{ ml: 1 }} />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  sortByExpenses(true);
                }}
              >
                By Cost <ArrowDownwardIcon sx={{ ml: 1 }} />
              </MenuItem>
            </Menu>
          </Box>

          <Box>
            <Grid2 container spacing={2}>
              {data.places.map((p) => (
                <Grid2 size={{ xs: 12, sm: 12, md: 6 }} key={p.name}>
                  <Paper elevation={12}>
                    <Box p={2} sx={{ cursor: "pointer" }} onClick={() => handleOpenModal(p)}>
                      <Grid2 container spacing={2}>
                        <Grid2 size={4}>
                          {p.Image && (
                            <img
                              src={p.Image}
                              alt={p.Place}
                              width="100%"
                              height={"100%"}
                              style={{ objectFit: "cover" }}
                            />
                          )}
                        </Grid2>
                        <Grid2 size={6}>
                          <Typography
                            variant="h5"
                            gutterbottom
                            fontWeight={"bold"}
                          >
                            {p.Place}
                          </Typography>

                          <Typography variant="h6">
                            {p.City} - {p.Country}
                          </Typography>

                          <br />
                          <br />

                          <Divider />
                          <br />

                          <Typography variant="p">
                            Travel - ₹{p.TravelCost.toFixed(0)} <br />
                            Other Expenses - ₹{p.OtherExpenses.toFixed(0)}
                          </Typography>
                          <br />
                          <Typography variant="p" fontWeight={"bold"}>
                            Total Cost = ₹{p.TotalCost.toFixed(0)}
                          </Typography>
                        </Grid2>

                        <Grid2
                          size={2}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Avatar
                            sx={{
                              backgroundColor: theme.palette.primary.main,
                              p: 1,
                            }}
                          >
                            {p.RankScore.toFixed(1)}
                          </Avatar>

                          <br />

                          <MapLink p={p} />
                        </Grid2>
                      </Grid2>
                    </Box>
                  </Paper>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Container>
      </Box>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            width: 500,
            // bgcolor: "background.paper",
            // border: "2px solid #000",
            // boxShadow: 24,
            // p: 4,
          }}
          component={Card}
        >
          <CardMedia>
            <img
              height="300px"
              width="100%"
              style={{ objectFit: "cover" }}
              src={modalPlace.Image}
              alt={modalPlace.Place}
            />
          </CardMedia>

          <CardContent>
            <Typography
              id="modal-modal-title"
              variant="h5"
              fontWeight="bold"
              component="h2"
            >
              {modalPlace.Place}
            </Typography>

            <Typography
              id="modal-modal-description"
              fontSize={"small"}
              sx={{ mt: 2 }}
            >
              Location - {modalPlace.City}, {modalPlace.Country}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              {modalPlace.Emotions?.map((e) => (
                <Chip
                  key={e}
                  label={e}
                  size="small"
                  // color="primary"
                  sx={{ mx: 1 }}
                />
              ))}
            </Box>

            <Divider />
            <Typography id="modal-modal-description" sx={{ my: 2 }}>
              {modalPlace.Description}
            </Typography>

            <Divider />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Travel Cost - ₹{modalPlace.TravelCost?.toFixed(0)}
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Other Expenses - ₹{modalPlace.OtherExpenses?.toFixed(0)}
              </Typography>

              <Typography
                id="modal-modal-description"
                fontWeight={"bold"}
                sx={{ mt: 2 }}
              >
                Total Cost - ₹{modalPlace.TotalCost?.toFixed(0)}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Dialog>
    </>
  );
}
