import React from "react";

import { Box, Typography } from "@mui/material";

import NavComponent from "../../../organisms/NavComponent";
import SearchBarComponent from "../../../atoms/SearchBarComponent";

const Dashboard = () => {
  // const userData = [
  //   { id: 1, col1: "1", col2: "3/16", col3: "open", col4: "Branch" },
  //   { id: 2, col1: "1", col2: "3/16", col3: "open", col4: "Branch" },
  // ];
  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          flexBasis: "30%",
          background: "#fff",
        }}
      >
        <NavComponent />
      </Box>

      <Box
        className="d-flex align-items-center justify-content-between "
        sx={{
          margin: "1% auto 0% 4%",
          position: "fixed",
          marginTop: "-50px",
        }}
      >
        <Box
          className="d-flex align-items-center justify-content-between py-4"
          sx={{ width: 300 }}
        >
          <Typography
            sx={{ fontSize: 17, fontWeight: 900, fontFamily: "sans-serif" }}
          >
            Dashboard
          </Typography>
        </Box>
        <Box sx={{ margin: "1% auto auto 20%", width: 750 }}>
          <SearchBarComponent />
        </Box>
      </Box>
      <Box
        sm={12}
        xs={12}
        sx={{
          margin: "1% auto auto 0%",
          flexBasis: "80%",
          background: "#fff",
          mt: 2,
          height: "100%",
          width: "100%",
        }}
      >
        {/* <ReusableTable data={userData} columns={column} /> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
