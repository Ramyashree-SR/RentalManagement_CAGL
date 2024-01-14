import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { useToasts } from "react-toast-notifications";
import ReusableTable from "./../../../../molecules/ReusableTable/index";
import { RentActualColumn } from "../../../../../constants/RentActual";
import { AddRentActualDetails } from "../../../../services/RentActualApi";
import { getRentPaymentReportDetails } from "../../../../services/PaymentReportApi";

import { AllPaymentColumns } from "../../../../../constants/AllPaymentReport";
import RentActualPaymentTable from "../../../../molecules/RentActualPaymentTable";

const RentActualDetails = (props) => {
  const { addToast } = useToasts();
  const [getActualPaymentReport, setGetAcualPaymentReport] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [rentActualData, setRentActualData] = useState([]);
  const [addRentActual, setAddRentActual] = useState({
    contractID: "",
    branchID: "",
    year: "",
    Amount: "",
    month: "",
    startDate: "",
    endDate: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmSubmit, setconfirmSubmit] = useState(false);
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
  useEffect(() => {
    getAllActualPaymentReportDetailsOfMonth();
  }, [selectedMonth]);

  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleConfirmSubmit = () => {
    setconfirmSubmit(true);
    AddRentActualFortheMonth();
  };
  const endDateObject = new Date();

  // Check if the provided rent end date is valid
  if (isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }
  const currentYear = endDateObject?.getFullYear();

  //   const yearOptions = Array.from({ length: 10 }, (_, index) => ({
  //     id: currentYear - index, // currentYear
  //     label: `${currentYear - index}`,
  //   }));
  const yearOptions = Array.from({ length: 1 }, (_, index) => ({
    id: currentYear, // currentYear
    label: `${currentYear}`,
  }));

  const handleChange = (newValue) => {
    let value = newValue?.label;
    setSelectedYear(value);
    // getAllPaymentReportDetailsOfMonth(value);
  };

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    console.log(value, "value");
    if (value) {
      // Access value.month here
      setSelectedMonth(value);
    } else {
      console.error("value or value.month is undefined");
    }
    getAllActualPaymentReportDetailsOfMonth(value);
  };

  const getAllActualPaymentReportDetailsOfMonth = async () => {
    const { data } = await getRentPaymentReportDetails(
      "all",
      selectedMonth,
      selectedYear
    );
    // console.log(data?.data, "allData");
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetAcualPaymentReport(getData);
        setRentActualData(getData);
      } else {
        setGetAcualPaymentReport([]);
        setRentActualData([]);
      }
    }
  };

  const handleSaveSelectedRows = () => {
    return getSelectedRowDetails();
  };
  // Function to get the details of the selected rows
  const getSelectedRowDetails = () => {
    return selectedRows.map((rowId) =>
      getActualPaymentReport?.find((row) => row.info.uniqueID === rowId)
    );
  };

  const AddRentActualFortheMonth = async () => {
    let selectedRowsData = handleSaveSelectedRows();
    // Assuming selectedRowsData is an array of objects
    const payload = selectedRowsData.map((selectedRow) => ({
      contractID: selectedRow.info.uniqueID,
      branchID: selectedRow.info?.branchID,
      year: selectedYear,
      Amount: selectedRow.actualAmount,
      month: selectedMonth,
      startDate: selectedRow.info.rentStartDate,
      endDate: selectedRow.info.rentEndDate,
    }));
    const { data, errRes } = await AddRentActualDetails(payload);
    if (data) {
      setAddRentActual({
        contractID: "",
        branchID: "",
        year: "",
        Amount: "",
        month: "",
        startDate: "",
        endDate: "",
      });
      addToast("Rent Actual Payment Done Successfully", {
        appearance: "success",
      });
      props.close();
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
      props.close();
    }
  };

  

  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen={props.fullscreen}
        centered
        // className="w-100"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Branch-wise Rent Actual Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <Grid
                  container
                  className="d-flex flex-row "
                  sx={{ position: "relative", top: 2, width: "100%" }}
                >
                  <Grid
                    item
                    className="d-flex ml-2"
                    sx={{ flexBasis: "50%", mt: 0 }}
                  >
                    <DropDownComponent
                      label="Year"
                      placeholder="Select "
                      sx={{ width: 200 }}
                      size="small"
                      options={yearOptions}
                      value={selectedYear}
                      onChange={handleChange}
                    />
                    <DropDownComponent
                      label="Month"
                      placeholder="Select "
                      sx={{ width: 200 }}
                      size="small"
                      options={months}
                      value={selectedMonth}
                      onChange={handleMonthChange}
                    />
                  </Grid>
                </Grid>
              </Col>
              <Box sm={12} xs={12}>
                {selectedMonth && (
                  <RentActualPaymentTable
                    data={getActualPaymentReport}
                    sx={{ mt: 2 }}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    getSelectedRowDetails={getSelectedRowDetails}
                  />
                )}
              </Box>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Grid
            item
            className="d-flex align-item-end justify-content-end"
            sx={{
              fontSize: 15,
              fontWeight: 700,
              // flexBasis: "0%",
              mt: 0,
              mr: 2,
            }}
          >
            {selectedMonth && (
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                  //   setconfirmDeleteVal(value);
                }}
                sx={{ backgroundColor: green[900] }}
              >
                {" "}
                Confirm Payment
              </Button>
            )}
            <Dialog
              open={open}
              onClose={handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <Typography>Are you sure you want to submit?</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} variant="contained">
                  Back
                </Button>
                <Button
                  onClick={handleConfirmSubmit}
                  variant="contained"
                  sx={{ backgroundColor: green[900] }}
                >
                  Make Payment
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Button onClick={props.close} variant="contained">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RentActualDetails;
