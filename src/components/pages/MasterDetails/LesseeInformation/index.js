import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../atoms/DropDownComponent";
import {
  getBranchIDForBranchDetails,
  getRentContractDetailsOnBranchID,
} from "../../../services/BranchDetails";
import ReusableTable from "../../../molecules/ReusableTable";
import { columns } from "../../../../constants/ScheduleTable";

// const lesseeInformation = {
//   branchid:"",
//   branchName: "",
//   areaName: "",
//   regionName: "",
//   zone: "",
//   state: "",
//   branchType: "",
//   approverRenewal: "",
//   approverRelocation: "",
//   enitityDetails: "",
// };
const LesseeInformation = ({
  activeStep,
  setActiveStep,
  onSave,
  type,
  allNewContractDetails,
  setAllNewContractDetails,
  allNewContractDetailsErr,
  handleAddRentContractInformationError,
}) => {
  const [address, setAddress] = useState("");
  const [branchData, setBranchData] = useState([]);
  const [branchDetails, setBranchDetails] = useState({});
  console.log(branchDetails, "branchDetails");
  const [selectedValue, setSelectedValue] = useState("");
  // console.log(selectedValue, "selectedValue");

  const handleNext = () => {
    onSave(allNewContractDetails, type);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateChange = (e) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleApproverRelocate = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
  };

  const handleApproverRenew = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
  };

  const handleEntityDetails = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
  };

  let BranchType = [
    { id: "GL-Office", label: "GL-Office" },
    { id: "GL-Hostel", label: "GL-Hostel" },
    { id: "GL-Maintenance", label: "GL-Maintenance" },
    { id: "RF-Office", label: "RF-Office" },
    { id: "RF-Hostel", label: "RF-Hostel" },
    { id: "RF-Maintenance", label: "RF-Maintenance" },
    { id: "HO-Office", label: "HO-Office" },
    { id: "HO-Maintenance", label: "HO-Maintenance" },
    { id: "DO / RO-Office", label: "DO / RO-Office" },
    { id: "DO / RO-Maintenance", label: "DO / RO-Maintenance" },
    { id: "StoreRoom-Office", label: "StoreRoom-Office" },
    { id: "StoreRoom-Maintenance", label: "StoreRoom-Maintenance" },
    { id: "Training Center", label: "Training Center" },
    {
      id: "Training Center-Maintainence",
      label: "Training Center-Maintainence",
    },
    { id: "Others", label: "Others" },
  ];

  let ApproverRenew = [
    { id: "DM", label: "DM" },
    { id: "ZM", label: "ZM" },
  ];

  let ApproverRelocate = [
    { id: "SH", label: "SH" },
    { id: "CBO", label: "CBO" },
    { id: "MD/CEO", label: "MD/CEO" },
  ];

  let EntityDetails = [
    { id: "Commercial", label: "Commercial" },
    { id: "Residential", label: "Residential" },
    {
      id: "Both Commercial & Residential",
      label: "Both Commercial & Residential",
    },
  ];

  const handleBulidingType = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
  };

  const handleLocationChange = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
  };

  const handleHeadOfficeChange = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
  };

  let location = [
    { id: "Urban", label: "Urban" },
    { id: "Rural", label: "Rural" },
  ];

  let typeOfBuliding = [
    { id: "Duplex", label: "Duplex" },
    { id: "Apartment", label: "Apartment" },
    { id: "Complex", label: "Complex" },
    { id: "Individual", label: "Individual" },
  ];

  const premesisName = [
    { id: "Head Office-Bangalore", label: "Head Office-Bangalore" },
    { id: "Corporate Office-Chennai", label: "Corporate Office-Chennai" },
    {
      id: "Retail Back Office-Bangalore",
      label: "Retail Back Office-Bangalore",
    },
  ];
  const joinAddress = () => {
    // Combine the address components into a single string with proper formatting.
    const joinedAddress = `${allNewContractDetails.premesisDoorNumber}, ${allNewContractDetails.premesisFloorNumber}, ${allNewContractDetails.premesisLandMark}, ${allNewContractDetails.premesisStreet},${allNewContractDetails.premesisWardNo},
    ${allNewContractDetails.premesisCity},${allNewContractDetails.premesisPinCode},${allNewContractDetails.premesisTaluka},${allNewContractDetails.premesisDistrict},${allNewContractDetails.premesisState}`;
    setAddress(joinedAddress);
  };

  const handleBranchType = (name, value) => {
    // console.log(value, "value");
    setAllNewContractDetails({
      ...allNewContractDetails,
      [name]: value,
    });

    setSelectedValue(value);
    if (typeof value === "undefined") {
      getAllBranchID(value);
      getBranchIdDetails(value);
    }
  };

  const handleBranchID = (_, value) => {
    setBranchDetails(() => ({
      ...branchDetails,
      branchID: value,
    }));
    getBranchIdDetails(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedValue) {
          await getAllBranchID(selectedValue);
          await getBranchIdDetails(branchDetails.branchID);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedValue, branchDetails.branchID]);

  // const getAllBranchID = async () => {
  //   // let branchType = selectedValue.label;
  //   const { data } = await getBranchIDForBranchDetails(selectedValue.label);
  //   // console.log(selectedValue, "selectedValue");
  //   // console.log(data, "IDdata");
  //   if (data) {
  //     let branchIDData = [];
  //     data?.map((val) => {
  //       branchIDData?.push(val);
  //     });
  //     setBranchData(branchIDData || []);
  //   } else if (!selectedValue || !selectedValue.label) {
  //     setBranchData([]);
  //   }
  // };

  const getAllBranchID = async (branchType) => {
    try {
      const { data } = await getBranchIDForBranchDetails(branchType.label);
      if (data) {
        setBranchData(data || []);
      } else {
        setBranchData([]);
      }
    } catch (error) {
      console.error("Error fetching branch IDs", error);
    }
  };

  // const getBranchIdDetails = async () => {
  //   let branchType = selectedValue.label;
  //   const { data } = await getRentContractDetailsOnBranchID(
  //     branchDetails?.branchID,
  //     branchType
  //   );
  //   if (data) {
  //     if (data) {
  //       setAllNewContractDetails(data?.data || {});
  //     }
  //   }
  // };

  const getBranchIdDetails = async (branchID) => {
    try {
      const branchType = selectedValue.label;
      const { data } = await getRentContractDetailsOnBranchID(
        branchID,
        branchType
      );
      if (data) {
        setAllNewContractDetails(data?.data || {});
      }
    } catch (error) {
      console.error("Error fetching branch details", error);
    }
  };

  return (
    <>
      <Box sx={{ height: "calc(100% - 55px)", overflowY: "scroll" }}>
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-3">
            Branch/Office Hierarchy Details
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <Grid item className="d-flex m-2 px-3" lg={12}>
              <DropDownComponent
                label="Premesis Type"
                sx={{ width: 300 }}
                options={BranchType}
                name="lesseeBranchType"
                value={selectedValue}
                // onSelect={handleBranchType}
                onChange={(val) => handleBranchType("lesseeBranchType", val)}
              />

              <DropDownComponent
                label="Entity Details "
                sx={{ width: 300 }}
                options={EntityDetails}
                name="lesseeEntityDetails"
                value={allNewContractDetails?.lesseeEntityDetails}
                // onSelect={handleEntityDetails}
                onChange={(val) =>
                  handleEntityDetails("lesseeEntityDetails", val)
                }
              />
            </Grid>
          </Grid>

          {selectedValue.label &&
          selectedValue.label !== "HO-Office" &&
          selectedValue.label !== "HO-Maintenance" &&
          selectedValue.label !== "DO / RO-Office" &&
          selectedValue.label !== "DO / RO-Maintenance" &&
          selectedValue.label !== "StoreRoom-Office" &&
          selectedValue.label !== "StoreRoom-Maintenance" &&
          selectedValue.label !== "Training Center" &&
          selectedValue.label !== "Training Center-Maintainence" ? (
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" lg={12}>
                <Autocomplete
                  size="small"
                  sx={{ width: 300, ml: 1, borderRadius: 10 }}
                  // defaultValue={null}
                  options={branchData}
                  value={
                    type === "edit"
                      ? branchDetails?.branchID
                      : branchDetails?.branchID
                  }
                  onChange={handleBranchID}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Branch ID"
                      variant="outlined"
                    />
                  )}
                />
                {/* <Autocomplete
                  size="small"
                  sx={{ width: 300, ml: 1, borderRadius: 10 }}
                  options={branchData}
                  value={
                    type === "edit"
                      ? branchDetails?.branchID
                      : branchData.find(
                          (branch) =>
                            branch.id ===
                            allNewContractDetails?.lesseeBranchType
                        )
                  }
                  onChange={handleBranchID}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Branch ID"
                      variant="outlined"
                    />
                  )}
                /> */}
              </Grid>

              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Branch Name"
                  placeholder="Enter Branch Name."
                  sx={{ width: 300 }}
                  name="lesseeBranchName"
                  value={allNewContractDetails?.branchName}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.lesseeBranchName}
                />
                <InputBoxComponent
                  label="Area Name"
                  placeholder="Enter Area Name ."
                  sx={{ width: 300 }}
                  name="areaName"
                  value={allNewContractDetails?.areaName}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.lesseeAreaName}
                />
                <InputBoxComponent
                  label="Division/Region"
                  placeholder="Enter Div/Reg No."
                  sx={{ width: 300 }}
                  name="region"
                  value={allNewContractDetails?.region}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.lesseeDivision}
                />
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Zone"
                  placeholder="Enter Zone ."
                  sx={{ width: 300 }}
                  name="zone"
                  value={allNewContractDetails?.zone}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.lesseeZone}
                />
                <InputBoxComponent
                  label="State"
                  placeholder="Enter State ."
                  sx={{ width: 300 }}
                  name="state"
                  value={allNewContractDetails?.state}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.lesseeState}
                />
              </Grid>
            </Grid>
          ) : null}
        </Box>

        {(selectedValue.label && selectedValue.label === "HO-Office") ||
        selectedValue.label === "HO-Maintenance" ||
        selectedValue.label === "DO / RO-Office" ||
        selectedValue.label === "DO / RO-Maintenance" ||
        selectedValue.label === "StoreRoom-Office" ||
        selectedValue.label === "StoreRoom-Maintenance" ||
        selectedValue.label === "Training Center" ||
        selectedValue.label === "Training Center-Maintainence" ? (
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <Grid item className="d-flex m-2" lg={12}>
              <DropDownComponent
                label="Office Name"
                options={premesisName}
                sx={{ width: 300 }}
                name="premesisOfficeName"
                value={allNewContractDetails?.premesisOfficeName}
                onChange={(val) =>
                  handleHeadOfficeChange("premesisOfficeName", val)
                }
              />
            </Grid>
          </Grid>
        ) : null}
        <Box
          className="d-flex justify-content-center w-100"
          sx={{ height: "calc(100% - 55px)" }}
        >
          <Box>
            <Typography className="fs-20 fw-500 pt-4 px-3">
              Premesis Details
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" lg={12}>
                <DropDownComponent
                  label="Location"
                  sx={{ width: 300 }}
                  options={location}
                  name="premesisLocation"
                  // onSelect={handleLocationChange}
                  value={allNewContractDetails?.premesisLocation}
                  onChange={(val) =>
                    handleLocationChange("premesisLocation", val)
                  }
                />
                <DropDownComponent
                  label="Building Type"
                  sx={{ width: 300 }}
                  options={typeOfBuliding}
                  name="branchName"
                  value={allNewContractDetails?.premesisBuildingType}
                  // onSelect={handleBulidingType}
                  onChange={(val) =>
                    handleBulidingType("premesisBuildingType", val)
                  }
                />
              </Grid>
            </Grid>

            <Box>
              <Typography className="fs-20 fw-500 pt-4 px-3">
                Premises Address Details
              </Typography>
              <Grid container spacing={2} className="px-2 py-2 mt-1">
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Door No."
                    placeholder="Enter Door No."
                    sx={{ width: 300 }}
                    name="premesisDoorNumber"
                    value={allNewContractDetails?.premesisDoorNumber}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisDoorNumber}
                  />
                  <InputBoxComponent
                    label="Floor No."
                    placeholder="Enter Floor No."
                    sx={{ width: 300 }}
                    name="premesisFloorNumber"
                    value={allNewContractDetails?.premesisFloorNumber}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisFloorNumber}
                  />
                  <InputBoxComponent
                    label="Land Mark"
                    placeholder="Enter Land Mark"
                    sx={{ width: 300 }}
                    name="premesisLandMark"
                    value={allNewContractDetails?.premesisLandMark}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisLandMark}
                  />
                </Grid>
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Road/Street"
                    placeholder="Enter Road"
                    sx={{ width: 300 }}
                    name="premesisStreet"
                    value={allNewContractDetails?.premesisStreet}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisStreet}
                  />
                  <InputBoxComponent
                    label="Ward Name/No Area Name/Layout Name/Extension"
                    placeholder="Enter Ward No."
                    sx={{ width: 300 }}
                    name="premesisWardNo"
                    value={allNewContractDetails?.premesisWardNo}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisWardNo}
                  />
                  <InputBoxComponent
                    label="City"
                    sx={{ width: 300 }}
                    placeholder="Enter City"
                    name="premesisCity"
                    value={allNewContractDetails?.premesisCity}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisCity}
                  />
                </Grid>
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Pincode"
                    placeholder="Enter Pincode"
                    sx={{ width: 300 }}
                    name="premesisPinCode"
                    value={allNewContractDetails?.premesisPinCode}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisPinCode}
                  />
                  <InputBoxComponent
                    label="Taluk"
                    placeholder="Enter Taluk"
                    sx={{ width: 300 }}
                    name="premesisTaluka"
                    value={allNewContractDetails?.premesisTaluka}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisTaluka}
                  />

                  <InputBoxComponent
                    label="District "
                    sx={{ width: 300 }}
                    placeholder="Enter District"
                    name="premesisDistrict"
                    value={allNewContractDetails?.premesisDistrict}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisDistrict}
                  />
                </Grid>
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="State "
                    sx={{ width: 300 }}
                    placeholder="Enter State"
                    name="premesisState"
                    value={allNewContractDetails?.premesisState}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisState}
                  />
                </Grid>

                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Plot Area"
                    placeholder="Enter Plot Area ."
                    sx={{ width: 300 }}
                    name="plotNumber"
                    value={allNewContractDetails?.plotNumber}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.plotNumber}
                  />
                  <InputBoxComponent
                    label="Buit-Up Area"
                    placeholder="Enter Bulit-Up Area ."
                    sx={{ width: 300 }}
                    name="builtupArea"
                    value={allNewContractDetails?.builtupArea}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.builtupArea}
                  />
                </Grid>

                <Grid
                  item
                  className="d-flex flex-column align-items-start justify-content-start m-3"
                  md={12}
                >
                  <Button onClick={joinAddress}>Join Address</Button>
                  {address && (
                    <InputBoxComponent
                      label="Address"
                      placeholder="Enter Address"
                      multiline
                      sx={{ width: 300 }}
                      size="large"
                      value={address}
                      readOnly
                    />
                  )}
                </Grid>

                <Box>
                  <Typography className="fs-20 fw-500 pt-4 px-4">
                    Premesis Schedule Details
                  </Typography>
                  <Grid container spacing={2} className="d-flex px-2 py-2 mt-1">
                    <Grid item className="d-flex m-2" md={12}>
                      <Grid item className="d-flex m-2" md={12}>
                        <Typography>1. </Typography>
                        <Typography>North:</Typography>
                        <InputBoxComponent
                          label="Description"
                          placeholder="Enter Description"
                          sx={{ width: 300, mt: -1.5, ml: 1 }}
                          name="northPremesis"
                          value={allNewContractDetails?.northPremesis}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.northPremesis}
                          multiline
                        />
                      </Grid>
                      <Grid item className="d-flex  m-2" md={12}>
                        <Typography>2.</Typography>
                        <Typography>South:</Typography>
                        <InputBoxComponent
                          label="Description"
                          placeholder="Enter Description"
                          sx={{ width: 300, mt: -1.5, ml: 1 }}
                          name="southPremesis"
                          value={allNewContractDetails?.southPremesis}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.southPremesis}
                          multiline
                        />
                      </Grid>
                    </Grid>
                    <Grid item className="d-flex m-2" md={12}>
                      <Grid item className="d-flex m-2" md={12}>
                        <Typography>3.</Typography>
                        <Typography>East:</Typography>
                        <InputBoxComponent
                          label="Description"
                          placeholder="Enter Description"
                          sx={{ width: 300, mt: -1.5, ml: 1 }}
                          name="eastPremesis"
                          value={allNewContractDetails?.eastPremesis}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.eastPremesis}
                          multiline
                        />
                      </Grid>
                      <Grid item className="d-flex m-2" md={12}>
                        <Typography>4.</Typography>
                        <Typography>West:</Typography>
                        <InputBoxComponent
                          label="Description"
                          placeholder="Enter Description"
                          sx={{ width: 300, mt: -1.5, ml: 1 }}
                          name="westPremesis"
                          value={allNewContractDetails?.westPremesis}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.westPremesis}
                          multiline
                        />
                      </Grid>
                      {/* <ReusableTable columns={columns}/> */}
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  className="d-flex justify-content-center w-100"
                  sx={{ overflow: "hidden" }}
                >
                  <Box>
                    <Typography className="fs-20 fw-500 pt-4 px-4">
                      GPS Details
                    </Typography>
                    <Grid container spacing={2} className="px-3 py-0 mt-0">
                      <Grid item className="d-flex m-2" md={12}>
                        <InputBoxComponent
                          label="Lattitude"
                          placeholder="Enter Lattitude"
                          sx={{ width: 300 }}
                          name="lattitude"
                          value={allNewContractDetails?.lattitude}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.lattitude}
                        />
                        <InputBoxComponent
                          label="Longitude"
                          placeholder="Enter Longitude"
                          sx={{ width: 300 }}
                          name="longitude"
                          value={allNewContractDetails?.longitude}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.longitude}
                        />

                        <InputBoxComponent
                          label="GPS Co-ordinates"
                          placeholder="Enter GPS Co-ordinates"
                          sx={{ width: 300 }}
                          name="gpsCoordinates"
                          value={allNewContractDetails?.gpsCoordinates}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.gpsCoordinates}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="d-flex justify-content-end w-100">
        <Button
          disabled={activeStep && activeStep === 0}
          onClick={handleBack}
          variant="contained"
          sx={{ m: 1 }}
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
    </>
  );
};

export default LesseeInformation;
