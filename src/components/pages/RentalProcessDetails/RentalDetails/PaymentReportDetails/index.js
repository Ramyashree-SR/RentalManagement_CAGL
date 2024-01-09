import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import ReusableTable from "../../../../molecules/ReusableTable";
import { getRentPaymentReportDetails } from "../../../../services/PaymentReportApi";
import { paymentColumn } from "../../../../../constants/PaymentReport";
import { deepOrange, orange, red } from "@mui/material/colors";
import PaymentTableComponent from "./../../../../molecules/PaymentTableComponent/index";
import { ExportToCSV } from "../../../../ExportToCSV";
import ExcelExport from "../../../../../ExcelExport";

const PaymentReportDetails = (props) => {
  const {
    uniqueID,
    branchIDforDue,
    rentStartDate,
    rentEndDate,
    lesseeBranchName,
    lessorName,
  } = props;

  const [getPaymentReport, setGetPaymentReport] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

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

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    if (value) {
      // Access value.month here
      setSelectedMonth(value);
    } else {
      console.error("value or value.month is undefined");
    }
    getAllPaymentReportDetailsOfMonth(value);
  };

  useEffect(() => {
    getAllPaymentReportDetailsOfMonth();
  }, [uniqueID, selectedMonth, selectedYear]);

  const startDateObject = new Date(rentStartDate);
  const endDateObject = new Date(rentEndDate);

  // Check if the provided rent end date is valid
  if (isNaN(startDateObject.getTime()) || isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }

  // Extract the year from the rent end date
  const startYear = startDateObject?.getFullYear();
  const endYear = endDateObject?.getFullYear();

  // const yearOptions = Array.from({ length: 10 }, (_, index) => ({
  //   id: currentYear - index, // currentYear
  //   label: `${currentYear - index}`,
  // }));
  // Generate an array of years between the start and end dates
  const yearOptions = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => ({
      id: startYear + index,
      label: `${startYear + index}`,
    })
  );

  const handleChange = (newValue) => {
    let value = newValue?.label;
    setSelectedYear(value);
    getAllPaymentReportDetailsOfMonth(value);
  };

  const getAllPaymentReportDetailsOfMonth = async () => {
    const { data } = await getRentPaymentReportDetails(
      uniqueID,
      selectedMonth,
      selectedYear
    );
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetPaymentReport(getData);
      } else {
        setGetPaymentReport([]);
      }
    }
  };

  // console.log(getPaymentReport, "getPaymentReport");.
  // let Report = Object.values(getPaymentReport);

  const getPaymentReportData = Object.values([getPaymentReport])?.map(
    (item) => ({
      ID: item.info?.uniqueID,
      MonthYear: item.monthYear,
      BranchID: item.info?.branchID,
      BranchName: item.info?.lesseeBranchName,
      AreaName: item.info?.lesseeAreaName,
      Division: item.lesseeDivision,
      Zone: item.info?.lesseeZone,
      State: item.info?.lesseeState,
      RentStartDate: item.info?.rentStartDate,
      RentEndDate: item.info?.rentEndDate,
      MonthlyRent: item.info?.monthlyRent,
      Due: item.due,
      Provision: item.provision,
      Goss: item.gross,
      Tds: item.tds,
      net: item.net,
    })
  );

  // console.log(Report, "Report");
  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen={props.fullscreen}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="w-100"
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 900, fontFamily: "sans-serif" }}
          >
            Payment Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Grid
            container
            sx={{ position: "fixed" }}
            className="d-flex flex-row m-1"
          >
            <Grid item className="d-flex flex-row">
              <Typography
                sx={{ fontSize: 15, fontWeight: 700 }}
                className="d-flex"
              >
                BranchID :&nbsp;&nbsp;
                <Typography
                  className="d-flex"
                  sx={{ fontSize: 15, fontWeight: 700, color: deepOrange[900] }}
                >
                  {branchIDforDue}
                </Typography>
              </Typography>
            </Grid> */}
          <Grid
            className="d-flex flex-row m-2"
            sx={{ fontSize: 15, fontWeight: 700 }}
          >
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Contract ID :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
              >
                {uniqueID}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Branch ID :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
              >
                {branchIDforDue}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Branch Name :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
              >
                {lesseeBranchName}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            className="d-flex flex-row m-2"
            sx={{ fontSize: 15, fontWeight: 700 }}
          >
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Rent Start Date :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
              >
                {rentStartDate}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Rent End Date :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
              >
                {rentEndDate}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Lessor Name :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
              >
                {" "}
                {lessorName}
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid container className="d-flex flex-row px-0 py-1">
            <Grid item className="d-flex" sx={{ flexBasis: "50%" }}>
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
              className="d-flex align-items-end justify-content-end"
              sx={{
                width: 120,
                height: 40,
                flexBasis: "50%",
              }}
            >
              <ExcelExport
                excelData={getPaymentReportData}
                fileName={"Payment Report"}
                sx={{ color: "#ffffff", backgroundColor: deepOrange[900] }}
              />
            </Grid>
            {/* <ExportToCSV
              excelData={getPaymentReportData}
              fileName={"Payment Report"}
            /> */}
          </Grid>

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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close} variant="contained">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentReportDetails;
