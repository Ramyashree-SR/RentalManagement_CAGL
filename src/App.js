import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./components/pages/LoginScreen";
import RentalDetails from "./components/pages/RentalProcessDetails/RentalDetails";
import Dashboard from "./components/pages/RentalProcessDetails/Dashboard";
import RentalProcessDetails from "./components/pages/RentalProcessDetails/index";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import Home from "./components/pages/RentalProcessDetails/HomeScreen";
import RentReport from "./components/pages/RentalProcessDetails/RentReport";

function App() {
  // const gender = [
  //   {
  //     id: "Male",
  //     label: "Male",
  //   },
  //   {
  //     id: "Female",
  //     label: "Female",
  //   },
  // ];

  // let dropdown = ["Let", "Var", "Const"];
  const theme = createTheme({
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <ThemeProvider theme={theme}>
                  <div id="loader" style={{ display: "none" }}>
                    <div className="loader"></div>
                  </div>
                  <LoginScreen />
                </ThemeProvider>
              </>
            }
          />

          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rentContracts" element={<RentalDetails />} />
          <Route path="rentReport" element={<RentReport />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

{
  /* <ButtonComponent /> */
}
{
  /* label="Delete" variant="outlined" */
}
{
  /* <DropDownComponent /> */
}
{
  /* textLabel="Gender" size="small" options={gender} errorText="this field?" */
}

{
  /* <AccordionComponent AccordionTitle="Rental Data" /> */
}
{
  /* <Dashboard /> */
}
{
  /* <NavComponent /> */
}
{
  /* <MasterDetails/>1 */
}
