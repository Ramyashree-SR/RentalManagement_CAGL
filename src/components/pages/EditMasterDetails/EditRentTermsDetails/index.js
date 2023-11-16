import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";
import SwitchComponent from "../../../atoms/SwitchComponent";

const EditRentTermsDetails = ({
  activeStep,
  setActiveStep,
  onSave,
  editAllContractDetails,
  setEditAllContractDetails,
}) => {
  const handleNext = () => {
    onSave(editAllContractDetails);

    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [checked, setChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };
  const handleGSTChange = () => {
    setChecked(!checked);
  };

  // const NewRentContractLesseeDetails = async () => {
  //   // if (props.type === "add") {
  //   let payload = {
  //     rentAmount: rentTermsInfo?.rentAmount,
  //     escalation: rentTermsInfo?.escalation,
  //     renewalTenure: rentTermsInfo?.renewalTenure,
  //   };
  //   const { data } = await AddRentContractDetails(payload);
  //   if (data?.data) {
  //     setRentTermsInfo({
  //       rentAmount: "",
  //       escalation: "",
  //       renewalTenure: "",
  //     });
  //   }
  // };

  const updateChange = (e) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Box
        className="d-flex justify-content-center w-100"
        sx={{ height: "calc(100% - 55px)", overflow: "hidden" }}
      >
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-3">
            Rent Term Details
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <Grid item className="d-flex m-2" md={12}>
              <InputBoxComponent
                label="Rent Amount"
                placeholder="Enter Rent Amount"
                sx={{ width: 300 }}
                name="rentAmount"
                value={editAllContractDetails.rentAmount}
                onChange={(e) => updateChange(e)}
              />
              <InputBoxComponent
                label="Escalation (%)"
                sx={{ width: 300 }}
                name="escalation"
                value={editAllContractDetails.escalation}
                onChange={(e) => updateChange(e)}
              />
            </Grid>

            <Grid
              item
              className="d-flex mt-2 ml-4 align-items-center justify-content-center"
              sx={{ ml: 5 }}
            >
              <Typography>TDS Applicable? </Typography>
              <SwitchComponent
                checked={isChecked}
                onChange={handleSwitchChange}
              />
              {isChecked ? <Typography>10% </Typography> : null}
              {/* {isChecked ? (
                <InputBoxComponent label="TDS % " placeholder="Enter TDS%" />
              ) : null} */}
            </Grid>

            <Grid
              item
              className="d-flex mt-2 ml-4 align-items-center justify-content-center"
              sx={{ ml: 5 }}
            >
              <Typography>GST Applicable?</Typography>
              <SwitchComponent checked={checked} onChange={handleGSTChange} />
              {checked ? <Typography>18% </Typography> : null}
              {/* {checked ? (
                <InputBoxComponent label="GST % " placeholder="Enter GST%" />
              ) : null} */}
            </Grid>

            <Grid item className="d-flex m-2" md={6}>
              <InputBoxComponent
                label="Renewal Tenure"
                sx={{ width: 300 }}
                name="renewalTenure"
                value={editAllContractDetails.renewalTenure}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
          </Grid>
        </Box>
        <hr style={{ border: "2px solid", borderStyle: "dashed" }} />
      </Box>
      <Box className="d-flex justify-content-end w-100">
        <Button
          disabled={activeStep && activeStep === 0}
          onClick={handleBack}
          variant="contained"
          sx={{ m: 1, background: "#238520" }}
        >
          Back
        </Button>
        <Button
          disabled={activeStep && activeStep === 0}
          onClick={handleNext}
          variant="contained"
          sx={{ m: 1, background: "#238520" }}
        >
          Next
        </Button>
      </Box>
      {/* <Button
        disabled={activeStep && activeStep === 0}
        onClick={handleSave}
        variant="contained"
        sx={{ m: 1, background: "#238520" }}
      >
        Save Data
      </Button> */}
    </>
  );
};

export default EditRentTermsDetails;
