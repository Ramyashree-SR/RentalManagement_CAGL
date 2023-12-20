import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReusableTable from "../../../../molecules/ReusableTable";
import { rentDueData } from "../../../../../constants/RentDueData";
import { getRentDueDetails } from "../../../../services/RentDueApi";
import { Typography } from "antd";

const RentDue = (props) => {
  // const [rentDueDetails, setRentDueDetails] = useState([]);
  const { branchIDforDue, rentDueDetails } = props;
  // console.log(props, "props");
  const userData = [
    { id: 1, col1: "1", col2: "3/16", col3: "open", col4: "Branch" },
    { id: 2, col1: "1", col2: "3/16", col3: "open", col4: "Branch" },
  ];

  // const [rentDueDetails, setRentDueDetails] = useState([]);

  // useEffect(() => {
  //   getAllRentDueDetailsByBranchID();
  // }, []);

  // const getAllRentDueDetailsByBranchID = async () => {
  //   const { data } = await getRentDueDetails(uniqueID);
  //   console.log(data, "data");
  //   if (data) {
  //     let getData = data?.data;
  //     setRentDueDetails(getData);
  //   }
  // };

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
            Rent Due Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box>
            <Grid className="d-flex m-2" sx={{ fontSize: 15, fontWeight: 700 }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Branch ID : {branchIDforDue}
              </Typography>
            </Grid>
            <ReusableTable data={rentDueDetails} columns={rentDueData} />
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
