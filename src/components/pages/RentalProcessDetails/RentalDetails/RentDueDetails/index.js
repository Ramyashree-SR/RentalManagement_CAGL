import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReusableTable from "../../../../molecules/ReusableTable";
import { rentDueData } from "../../../../../constants/RentDueData";
import { getRentDueDetails } from "../../../../services/RentDueApi";
import { Typography } from "antd";

const RentDueDetails = (props) => {
  const {
    branchIDforDue,
    rentDueDetails,
    rentStartDate,
    rentEndDate,
    agreementTenure,
    uniqueID,
  } = props;

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
            <Grid
              className="d-flex flex-column m-2"
              sx={{ fontSize: 15, fontWeight: 700 }}
            >
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Contract ID : {uniqueID}
              </Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Branch ID : {branchIDforDue}
              </Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Rent Start Date : {rentStartDate}
              </Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Rent End Date : {rentEndDate}
              </Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Tenure : {agreementTenure}
              </Typography>
            </Grid>

            {uniqueID && (
              <ReusableTable data={rentDueDetails} columns={rentDueData} />
            )}
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RentDueDetails;
