import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import TableViewIcon from "@mui/icons-material/TableView";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function Sider({ isOpen, onClose, height, width, onToggleText }) {
  const [selectedComponent, setSelectedComponent] = useState([]);
  const handleDrawerClose = () => {
    onClose();
  };

  let navigate = useNavigate();

  const handleListItem = (componentName) => {
    onToggleText(componentName);
    setSelectedComponent(componentName);
    navigate("/");
    onClose();
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  const navigateToRentContracts = () => {
    navigate("/rentContracts");
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const navigateToRentReport = () => {
    navigate("/rentReport");
  };
  return (
    <Box sx={{ display: "flex", zIndex: "100" }}>
      <Paper>
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={handleDrawerClose}
          PaperProps={{
            style: { height, width, marginTop: 0 }, // Set the margin to 20px
          }}
          sx={{
            "& .MuiDrawer-paper": {
              marginTop: "10px", // Set the margin to 20px
            },
          }}
        >
          <Box sx={{ p: 1 }}>
            <img
              src="./assets/cagllogo1.png"
              width={150}
              alt="logo"
              style={{ marginLeft: 20 }}
            />
          </Box>
          <hr />
          <List>
            {/* <Link to={"./HomeScreen"}> */}
            <ListItem
              button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiListItemIcon-root": {
                  minWidth: "31px",
                },
              }}
              onClick={() => {
                handleListItem("/home");
                navigateToHome();
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ color: "#000000" }} />
            </ListItem>
            {/* </Link>
              <Link to={"./Dashboard"}> */}
            <ListItem
              button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiListItemIcon-root": {
                  minWidth: "31px",
                },
              }}
              onClick={() => {
                handleListItem("/dashboard");
                navigateToDashboard();
              }}
            >
              <ListItemIcon>
                <DashboardCustomizeIcon sx={{ color: "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ color: "#000000" }} />
            </ListItem>
            {/* </Link>
            <Link to={"./RentalDetails"}> */}
            {/* {selectedComponent ? ( */}
            <ListItem
              button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiListItemIcon-root": {
                  minWidth: "31px",
                },
              }}
              onClick={() => {
                handleListItem("/rentContracts");
                navigateToRentContracts();
              }}
            >
              <ListItemIcon>
                <TableViewIcon sx={{ color: "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="RentContracts" sx={{ color: "#000000" }} />
            </ListItem>
            {/* // ):null} */}
            {/* </Link> */}

            <ListItem
              button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiListItemIcon-root": {
                  minWidth: "31px",
                },
              }}
              onClick={() => {
                handleListItem("/rentReport");
                navigateToRentReport();
              }}
            >
              <ListItemIcon>
                <TableViewIcon sx={{ color: "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="RentReport" sx={{ color: "#000000" }} />
            </ListItem>

            <ListItem
              button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 45,
                justifyContent: "center",
                "& .MuiListItemIcon-root": {
                  minWidth: "31px",
                },
              }}
              onClick={() => handleListItem("Logout")}
            >
              <ListItemText primary="Logout" sx={{ color: "#000000" }} />
            </ListItem>
          </List>
        </Drawer>
      </Paper>
    </Box>
  );
}

export default Sider;