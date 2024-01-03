import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import ReusableTable from "../../../../molecules/ReusableTable";
import { paymentColumns } from "../../../../../constants/PaymentReport";
import { getRentPaymentReportDetails } from "../../../../services/PaymentReportApi";

const PaymentReport = (props) => {
  const { uniqueID } = props;
  console.log(props, "props");
  const [reportData, setReportData] = useState(null);
  const [getPaymentReport, setGetPaymentReport] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const handleChange = (name, newValue) => {
    setReportData({
      ...reportData,
      [name]: newValue,
    });
  };

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
    getAllPaymentReportDetailsOfMonth();
  }, []);

  const handleMonthChange = (name, newValue) => {
    setReportData({
      ...reportData,
      [name]: newValue,
    });
    if (newValue && newValue.month) {
      // Access newValue.month here
      setSelectedMonth(newValue);
    } else {
      console.error("newValue or newValue.month is undefined");
    }
  };

  const endDateObject = new Date();

  // Check if the provided rent end date is valid
  if (isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }

  // Extract the year from the rent end date
  const currentYear = endDateObject?.getFullYear();

  const yearOptions = Array.from({ length: 101 }, (_, index) => ({
    value: currentYear - index, // currentYear
    label: `${currentYear - index}`,
  }));

  const getAllPaymentReportDetailsOfMonth = async (month, year) => {
    const { data } = await getRentPaymentReportDetails(uniqueID, month, year);
    // console.log(data?.data, "allData");
    if (data) {
      setGetPaymentReport(data);
    }
  };
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
          <Modal.Title id="contained-modal-title-vcenter">
            Payment Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid className="d-flex  ">
            <DropDownComponent
              label="Year"
              placeholder="Select "
              sx={{ width: 200, ml: 0 }}
              size="small"
              options={yearOptions}
              value={getPaymentReport?.year}
              onChange={(val) => {
                handleChange("year", val);
              }}
            />
            <DropDownComponent
              label="Month"
              placeholder="Select "
              sx={{ width: 200, ml: 0 }}
              size="small"
              options={months}
              name="month"
              value={getPaymentReport?.month}
              onChange={(val) => {
                handleMonthChange("month", val);
              }}
            />
          </Grid>

          {/* <Grid className="d-flex m-4">
            {selectedMonth && (
              <ReusableTable data={getPaymentReport} columns={paymentColumns} />
            )}
          </Grid> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentReport;
