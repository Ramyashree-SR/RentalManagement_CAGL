import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReusableTable from "../../../../molecules/ReusableTable";
import { rentDueData } from "../../../../../constants/RentDueData";
import { getRentDueDetails } from "../../../../services/RentDueApi";
import { Typography } from "antd";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { getBranchID } from "../../../../services/RentContractsApi";
import { green } from "@mui/material/colors";

const RentDue = (props) => {
  const {
    branchIDforDue,
    rentDueDataByBranchId,
    branchFilter,
    handleBranchID,
    getAllRentDueDetailsByBranchID,
  } = props;

  const userData = [
    { id: 1, col1: "1", col2: "3/16", col3: "open", col4: "Branch" },
    { id: 2, col1: "1", col2: "3/16", col3: "open", col4: "Branch" },
  ];
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
  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen={props.fullscreen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="w-100"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Branch-wise Rent Due Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box>
            <Grid className="d-flex m-2" sx={{ fontSize: 15, fontWeight: 700 }}>
              {/* <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Branch ID : {branchIDforDue}
              </Typography> */}
            </Grid>
            <Grid className="d-flex m-2" sx={{ fontSize: 15, fontWeight: 700 }}>
              <Autocomplete
                size="small"
                sx={{
                  // backgroundColor: "#FAFAFA",
                  background: "#C5EBF6 ", //#C5EBF6 #D5F7DC
                  borderRadius: "100px",
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: green[900],
                    },
                  },
                  "& .MuiOutlinedInput-root:focus": {
                    "& > fieldset": {
                      // outline: "none",
                      borderColor: "#E4E7EB",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: "#E4E7EB",
                      borderRadius: "100px",
                    },
                    width: 200,
                  },
                }}
                options={Array.isArray(branchFilter) ? branchFilter : []}
                // getOptionLabel={(option) => (option ? option.label : "")} // Handle null option
                value={branchIDforDue}
                onChange={handleBranchID}
                renderInput={(params) => (
                  <TextField {...params} label="Branch ID" variant="outlined" />
                )}
              />
            </Grid>
            {branchIDforDue ? 
            <ReusableTable data={rentDueDataByBranchId} columns={rentDueData} />:null}
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RentDue;
