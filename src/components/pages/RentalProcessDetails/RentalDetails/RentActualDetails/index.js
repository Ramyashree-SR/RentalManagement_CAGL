import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { useToasts } from "react-toast-notifications";
import ReusableTable from "./../../../../molecules/ReusableTable/index";
import { RentActualColumn } from "../../../../../constants/RentActual";
import { AddRentActualDetails } from "../../../../services/RentActualApi";

const RentActualDetails = (props) => {
  const { addToast } = useToasts();
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

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    console.log(value, "value");
    if (value) {
      // Access value.month here
      setSelectedMonth(value);
    } else {
      console.error("value or value.month is undefined");
    }
    // getAllPaymentReportDetailsOfMonth(value);
  };
  const handleChange = (newValue) => {
    let value = newValue?.label;
    setSelectedYear(value);
    // getAllPaymentReportDetailsOfMonth(value);
  };

  const AddRentActualFortheMonth = async () => {
    let payload = {
      contractID: rentActualData.uniqueID,
      branchID: rentActualData.branchID,
      year: selectedYear,
      Amount: addRentActual.Amount,
      month: selectedMonth,
      startDate: rentActualData.rentStartDate,
      endDate: rentActualData.rentEndDate,
  };
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
          {/* <Grid
            container
            className="d-flex m-3 "
            sx={{ fontSize: 15, fontWeight: 700 }}
          >
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
                // options={Array.isArray(branchFilter) ? branchFilter : []}
                // value={branchIDforDue}
                // onChange={handleBranchID}
                renderInput={(params) => (
                  <TextField {...params} label="Branch ID" variant="outlined" />
                )}
              />
            </Grid>
          </Grid> */}

          <Grid container className="d-flex flex-row " sx={{ mt: 1 }}>
            <Grid item className="d-flex ml-2" sx={{ flexBasis: "50%" }}>
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
            {selectedMonth && (
              <ReusableTable
                data={rentActualData}
                columns={RentActualColumn}
                sx={{ mt: 1.5 }}
              />
            )}
            <Grid
              item
              className="d-flex align-item-end justify-content-end"
              sx={{
                fontSize: 15,
                fontWeight: 700,
                flexBasis: "20%",
                mt: 1.5,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                //   setconfirmDeleteVal(value);
                }}
                sx={{ backgroundColor: green[900] }}
              > Confirm Payment</Button>
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
                  <Button onClick={handleDialogClose} variant="contained">Back</Button>
                  <Button onClick={handleConfirmSubmit} variant="contained" sx={{backgroundColor:green[900]}}>Make Payment</Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
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

export default RentActualDetails;
