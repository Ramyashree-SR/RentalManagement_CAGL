import {
  Badge,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";


const NavbarComponent = ({ formLabel = "" }) => {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "12%",
        borderRadius: "0px",
        // boxShadow: "0px 1px 17px  #ccc",
        position: "fixed",
        top: "0",
        zIndex: "200",
      }}
    >
      <Box className="d-flex align-items-center justify-content-between ">
        <Box sx={{}}>
          <img
            src="./assets/cagllogo1.png"
            width={120}
            alt="logo"
            style={{ marginLeft: 20 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mr: 3,
          }}
        >
          <Typography
            sx={{ fontSize: 30, fontFamily: "sans-serif", fontWeight: "bold" }}
          >
            {formLabel}
          </Typography>
        </Box>

         <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mr: 3,
            mt:2
          }}
        ></Box> 
      </Box>
    </Paper>
  );
};

export default NavbarComponent;
