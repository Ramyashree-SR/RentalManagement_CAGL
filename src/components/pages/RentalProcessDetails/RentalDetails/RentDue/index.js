import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReusableTable from "../../../../molecules/ReusableTable";
import { rentDueData } from "../../../../../constants/RentDueData";
import {
  getRentDueDetails,
  getRentDueExcelDetails,
} from "../../../../services/RentDueApi";
import { Typography } from "antd";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { getBranchID } from "../../../../services/RentContractsApi";
import { deepOrange, green } from "@mui/material/colors";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import ExcelExport from "../../../../../ExcelExport";
import axios from "axios";

const RentDue = (props) => {
  const {
    branchIDforDue,
    rentDueDataByBranchId,
    branchFilter,
    handleBranchID,
    lesseeBranchName,
    rentContractDetails,
    activationStatusFilterDue,
    getAllRentDueDetailsByBranchID,
    handleActivationStatusFilterChangeDue,
  } = props;
  const [monthlyTotal, setMonthlyTotal] = useState({});
  const [dataToExcel, setDataToExcel] = useState([]);
  console.log(dataToExcel, dataToExcel);
  // Calculate monthly totals
  const calculateMonthlyTotal = () => {
    const total = {};
    rentDueDataByBranchId.forEach((entry) => {
      Object.keys(entry).forEach((month) => {
        if (
          month !== "rentDueID" &&
          month !== "startDate" &&
          month !== "endDate" &&
          month !== "year" &&
          month !== "escalation" &&
          month !== "contractID"
        ) {
          total[month] = (total[month] || 0) + entry[month];
        }
      });
    });
    setMonthlyTotal(total);
  };

  // Calculate totals on component mount
  useEffect(() => {
    calculateMonthlyTotal();
  }, [rentDueDataByBranchId]);
  // const userData = [
  //   { id: 1, col1: "1", col2: "3/16", col3: "open", col4: "Branch" },
  //   { id: 2, col1: "1", col2: "3/16", col3: "open", col4: "Branch" },
  // ];
  // const [BranchID, setBranchID] = useState([]);

  // useEffect(() => {
  //   getBranchId();
  // }, []);

  // const handleBranchID = (value) => {
  //   setBranchID({
  //     ...BranchID,
  //     branchID: value.target.outerText,
  //   });
  //   if(value.target.outerText){
  //     getAllRentDueDetailsByBranchID(value.target.outerText)
  //   }

  //   // setbranchIDforDue(value.target.outerText);
  //   // getAllContractDetails(value.target.outerText);
  // };

  // const getBranchId = async () => {
  //   const { data } = await getBranchID();
  //   if (data) {
  //     if (data) {
  //       let branchIDData = [];
  //       data?.data.map((val) => {
  //         branchIDData.push([val]);
  //       });
  //     //  let id=data?.data
  //       setBranchID(branchIDData);
  //     } else {
  //       setBranchID([]);
  //     }
  //   }
  // };
  // console.log(BranchID,"BranchID");

  let activationStatus = [
    { id: "1", label: "All" },
    { id: "2", label: "Open" },
    { id: "3", label: "Closed" },
  ];

  const months = [
    { id: 1, label: "January" },
    { id: 2, label: "February" },
    { id: 3, label: "March" },
    { id: 4, label: "April" },
    { id: 5, label: "May" },
    { id: 6, label: "June" },
    { id: 7, label: "July" },
    { id: 8, label: "August" },
    { id: 9, label: "September" },
    { id: 10, label: "October" },
    { id: 11, label: "November" },
    { id: 12, label: "December" },
  ];

  // const filteredData = rentDueDataByBranchId?.filter((item) => {
  //   if (activationStatusFilterDue === "") {
  //     return []; // Show all rows if 'all' is selected
  //   }
  //   return item["status"] === activationStatusFilterDue; // Customize the filtering condition based on your data structure
  // });

  // const filterOptions = rentDueDataByBranchId?.reduce((options, item) => {
  //   if (!options.includes(item["status"])) {
  //     options?.push(item["status"]);
  //   }
  //   return options;
  // }, []);

  const fileName = "Rent Due Excel"; // here enter filename for your excel file

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRentDueExcelDetails(branchIDforDue);
      console.log(data, "duedata");
      if (data) {
        setDataToExcel(data);
      }
    };
    fetchData();
  }, [branchIDforDue]);

  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen={props.fullscreen}
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        className="w-100"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Branch-wise Rent Due Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box sx={{ height: "100%", width: "100%" }}>
            <Grid
              container
              className="d-flex m-3 "
              sx={{ fontSize: 15, fontWeight: 700 }}
            >
              {/* <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Branch ID : {branchIDforDue}
              </Typography> */}

              <Grid
                item
                className="d-flex"
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  position: "fixed",
                  mt: -2,
                  flexBasis: "80%",
                }}
              >
                <Autocomplete
                  size="small"
                  sx={{
                    // backgroundColor: "#FAFAFA",
                    // background: "#C5EBF6 ", //#C5EBF6 #D5F7DC
                    // borderRadius: "100px",
                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: green[900],
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiOutlinedInput-root:focus": {
                      "& > fieldset": {
                        borderColor: "#E4E7EB",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        borderColor: "#E4E7EB",
                        borderWidth: "1px",
                      },
                      width: 200,
                    },
                  }}
                  options={Array.isArray(branchFilter) ? branchFilter : []}
                  // getOptionLabel={(option) => (option ? option.label : "")} // Handle null option
                  value={branchIDforDue}
                  onChange={handleBranchID}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Branch ID"
                      variant="outlined"
                    />
                  )}
                />
                {/* </Grid> */}
                {/* <Grid item className="d-flex px-1 py-1" > */}
                <InputBoxComponent
                  label="Branch Name"
                  placeholder="Branch Name"
                  sx={{ width: 200, ml: 1, mt: -1.5 }}
                  value={lesseeBranchName}
                />

                <DropDownComponent
                  label="ActivationStatus"
                  placeholder="select"
                  sx={{ width: 200 }}
                  size="small"
                  options={
                    Array.isArray(activationStatus) ? activationStatus : []
                  }
                  name="status"
                  value={activationStatusFilterDue || "All"}
                  onChange={(val) =>
                    handleActivationStatusFilterChangeDue("status", val)
                  }
                />

                <DropDownComponent
                  label="Months"
                  placeholder="Months"
                  size="small"
                  options={months}
                  sx={{ width: 200, ml: 1, mt: 0 }}
                  value={lesseeBranchName}
                />
                {/* </Grid> */}
              </Grid>
              <Grid
                item
                className="d-flex align-items-end justify-content-end"
                sx={{ flexBasis: "100%", mt: -2 }}
              >
                <ExcelExport
                  excelData={dataToExcel}
                  fileName={fileName}
                  sx={{
                    mr: 1,
                    backgroundColor: deepOrange[600],
                    width: 120,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Grid>
            </Grid>
            <Box
              sm={12}
              xs={12}
              sx={{
                background: "#232323",
                // height: "90%",
                width: "97%",
                position: "fixed",
                mt: 0,
              }}
            >
              {branchIDforDue && (
                <ReusableTable
                  data={rentDueDataByBranchId}
                  columns={rentDueData}
                  sx={{
                    height: "370px",
                    width: "100%",
                    overFlowX: "scroll",
                    overFlowY: "scroll",
                  }}
                  showTotal={true}
                />
              )}
            </Box>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close} variant="contained">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RentDue;
