import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import { deepOrange, green, pink, purple, red } from "@mui/material/colors";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import ExcelExport from "../../../../../ExcelExport";
import PaymentTableComponent from "../../../../molecules/PaymentTableComponent";
import { paymentColumn } from "../../../../../constants/PaymentReport";
import { getRentPaymentReportDetails } from "../../../../services/PaymentReportApi";
import {
  AddRentActualDetails,
  getAllRentContractDetailsByContractID,
} from "../../../../services/RentActualApi";
import { useToasts } from "react-toast-notifications";
import RentActualDetails from "../RentActualDetails";
import CloseIcon from "@mui/icons-material/Close";

const RentActual = (props) => {
  const { addToast } = useToasts();
  const [RentActualIDs, setRentActualIDs] = useState("");
  const [fullscreen, setFullscreen] = useState(true);
  const [rentActualData, setRentActualData] = useState([]);
  const [getPaymentReport, setGetPaymentReport] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [openActualDetailsModal, setOpenActualDetailsModal] = useState(false);
  const [settlementAmt, setSettlementAmt] = useState([]);
  // const [open, setOpen] = useState(false);
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
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const action = (
    <React.Fragment>
      {/* <Button color="warning" size="small" onClick={handleClose}>
        UNDO
      </Button> */}

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  useEffect(() => {
    getAllRentActualDetailsByUniqueID();
  }, [RentActualIDs]);

  useEffect(() => {
    getAllPaymentReportDetailsOfMonth();
  }, [selectedMonth]);

  const updateChange = (e) => {
    // setRentActualIDs({
    //   ...RentActualIDs,
    //   [e.target.name]: e.target.value,
    // });
    setRentActualIDs(e.target.value);
  };

  const updatedChange = (e) => {
    setSettlementAmt({
      ...settlementAmt,
      [e.target.name]: e.target.value,
    });
  };
  const endDateObject = new Date();

  // Check if the provided rent end date is valid
  if (isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }
  const currentYear = endDateObject?.getFullYear();

  const yearOptions = Array.from({ length: 10 }, (_, index) => ({
    id: currentYear - index, // currentYear
    label: `${currentYear - index}`,
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

  const getAllPaymentReportDetailsOfMonth = async () => {
    const { data } = await getRentPaymentReportDetails(
      rentActualData.uniqueID,
      selectedMonth,
      selectedYear
    );
    // console.log(data, "ReportData");
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetPaymentReport(getData);
      } else {
        setGetPaymentReport([]);
      }
    }
  };

  const getAllRentActualDetailsByUniqueID = async () => {
    const { data } = await getAllRentContractDetailsByContractID(RentActualIDs);
    // console.log(uniqueID, "ActualId");
    if (data) {
      if (data) {
        let getData = data?.data;
        setRentActualData(getData);
      }
    }
  };
  
  {
    /* <Alert severity="success"  variant="outined">Payment Settled</Alert> */
  }
  // const AddRentActualFortheMonth = async () => {
  //   let payload = {
  //     contractID: rentActualData.uniqueID,
  //     branchID: rentActualData.branchID,
  //     year: selectedYear,
  //     Amount: addRentActual.Amount,
  //     month: selectedMonth,
  //     startDate: rentActualData.rentStartDate,
  //     endDate: rentActualData.rentEndDate,
  //   };
  //   const { data, errRes } = await AddRentActualDetails(payload);
  //   if (data) {
  //     setAddRentActual({
  //       contractID: "",
  //       branchID: "",
  //       year: "",
  //       Amount: "",
  //       month: "",
  //       startDate: "",
  //       endDate: "",
  //     });
  //     addToast("Rent Actual Payment Done Successfully", {
  //       appearance: "success",
  //     });

  //     props.close();
  //   } else if (errRes) {
  //     addToast(errRes, { appearance: "error" });
  //     props.close();
  //   }
  // };

  const handleActualClick = () => {
    setOpenActualDetailsModal(true);
  };
  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen={props.fullscreen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="w-100"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Rent Actual Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <Grid
                  container
                  className="d-flex"
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    mt: -2,
                    ml: -6,
                    flexBasis: "80%",
                  }}
                >
                  <Grid
                    item
                    className="d-flex"
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      position: "fixed",
                      mt: -2,
                      m: 0,
                      flexBasis: "80%",
                    }}
                  >
                    <InputBoxComponent
                      label="Contract ID"
                      placeholder="Enter Contact ID"
                      sx={{ width: 200, mr: 2, mt: 1 }}
                      name="RentActualIDs"
                      value={RentActualIDs}
                      onChange={(e) => updateChange(e)}
                    />
                  </Grid>
                </Grid>
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
                    onClick={() => handleActualClick()}
                    sx={{ backgroundColor: pink[900] }}
                  >
                    Rent Actual Details
                  </Button>
                </Grid>

                <RentActualDetails
                  show={openActualDetailsModal}
                  close={() => setOpenActualDetailsModal(false)}
                  fullscreen={fullscreen}
                />

                {RentActualIDs && (
                  <Grid
                    container
                    className="d-flex flex-row py-1"
                    sx={{ fontSize: 15, fontWeight: 700, mt: 3 }}
                  >
                    <Grid
                      item
                      className="d-flex flex-row"
                      sx={{ flexBasis: "35%" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Contract ID :&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, fontWeight: 700, color: pink[900] }}
                      >
                        {rentActualData?.uniqueID}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className="d-flex flex-row"
                      sx={{ flexBasis: "35%" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Branch ID :&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, fontWeight: 700, color: pink[900] }}
                      >
                        {rentActualData.branchID}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className="d-flex flex-row"
                      sx={{ flexBasis: "30%" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Branch Name :&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, fontWeight: 700, color: pink[900] }}
                      >
                        {rentActualData?.lesseeBranchName}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {/* <hr/> */}
                <Col xs={12}>
                  {RentActualIDs && (
                    <Grid
                      container
                      className="d-flex flex-row"
                      sx={{ fontSize: 15, fontWeight: 700 }}
                    >
                      <Grid
                        item
                        className="d-flex flex-row"
                        sx={{ flexBasis: "35%" }}
                      >
                        <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                          Rent Start Date :&nbsp;&nbsp;
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: pink[900],
                          }}
                        >
                          {rentActualData?.rentStartDate}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        className="d-flex flex-row"
                        sx={{ flexBasis: "35%" }}
                      >
                        <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                          Rent End Date :&nbsp;&nbsp;
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: pink[900],
                          }}
                        >
                          {rentActualData?.rentEndDate}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        className="d-flex flex-row"
                        sx={{ flexBasis: "30%" }}
                      >
                        <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                          Lessor Name :&nbsp;&nbsp;
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: pink[900],
                          }}
                        >
                          {" "}
                          {rentActualData?.lessorName}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  {RentActualIDs && <hr />}
                </Col>

                {RentActualIDs && (
                  <Grid item className="d-flex flex-row">
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Payment Report of the Branch-&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: red[900],
                      }}
                    >
                      {rentActualData?.lesseeBranchName}
                    </Typography>
                  </Grid>
                )}
                {RentActualIDs && (
                  <Grid container className="d-flex flex-row " sx={{ mt: 2 }}>
                    <Grid
                      item
                      className="d-flex ml-2"
                      sx={{ flexBasis: "50%" }}
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
                    <Grid
                      item
                      className="d-flex flex-row align-items-end justify-content-end "
                      sx={{ flexBasis: "50%" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Rent Actual Amount :&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: pink[900],
                        }}
                      >
                        {getPaymentReport?.actualAmount}
                      </Typography>
                    </Grid>
                  </Grid>
                )}

                {selectedMonth && (
                  <PaymentTableComponent
                    data={[getPaymentReport]}
                    columns={paymentColumn}
                    sx={{
                      // height: "300px",
                      width: "100%",
                      overFlowX: "scroll",
                      overFlowY: "scroll",
                      mt: 4,
                    }}
                  />
                )}
              </Col>

              <Col>
                <Grid
                  item
                  className="d-flex flex-column "
                  sx={{ flexBasis: "100%", mt: 2 }}
                >
                  {selectedMonth && (
                    <Grid
                      item
                      className="d-flex flex-column "
                      sx={{ flexBasis: "100%", mt: 2 }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        SD Settlements :&nbsp;&nbsp;
                      </Typography>
                      <Grid
                        item
                        className="d-flex flex-row"
                        sx={{ flexBasis: "100%", mt: 2 }}
                      >
                        {/* <InputBoxComponent
                          label="ID"
                          placeholder="Enter ID"
                          sx={{ width: 200, mt: -1 }}
                          name="Amount"
                          value={addRentActual.Amount}
                          onChange={(e) => {
                            updatedChange(e);
                          }}
                        /> */}

                        <InputBoxComponent
                          label="Amount"
                          placeholder="Enter Amount"
                          sx={{ width: 200, mt: -1 }}
                          // name="Amount"
                          // value={Amount}
                          onChange={(e) => {
                            updatedChange(e);
                          }}
                        />
                        <Button
                          className="d-flex"
                          variant="contained"
                          size="small"
                          onClick={handleClick({
                            vertical: "top",
                            horizontal: "center",
                          })}
                          sx={{
                            width: 150,
                            fontSize: 10,
                            height: 30,
                            mt: 1,
                            backgroundColor: green[900],
                          }}
                        >
                          Made Settlement
                        </Button>
                      </Grid>
                      {/* <Button onClick={handleClick}>
                        Open simple snackbar
                      </Button> */}
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message="Note: Please Change the Rent End Date for Tenure Close"
                        action={action}
                      />
                    </Grid>
                  )}
                </Grid>
              </Col>
            </Row>
          </Container>
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

export default RentActual;
