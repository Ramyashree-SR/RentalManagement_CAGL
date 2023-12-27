import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../../atoms/DropDownComponent";

const Provisions = (props) => {
  const {
    rentEndDate,
    rentStartDate,
    branchIDforDue,
    agreementTenure,
    AddProvisionFortheMonth,
    addProvisions,
    setAddProvisions,
    monthlyRent,
    uniqueID,
  } = props;
  // console.log(props, "props");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  // Parse the provided rent end date
  const endDateObject = new Date(rentEndDate);

  // Check if the provided rent end date is valid
  if (isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }

  // Extract the year from the rent end date
  const currentYear = endDateObject?.getFullYear();

  // Generate an array of years, including the current year
  const yearOptions = Array.from({ length: 101 }, (_, index) => ({
    value: currentYear - index, // currentYear - index
    label: `${currentYear - index}`,
  }));

  const handleChange = (name, newValue) => {
    setAddProvisions({
      ...addProvisions,
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

  const handleMonthChange = (name, newValue) => {
    setAddProvisions({
      ...addProvisions,
      [name]: newValue,
    });
    if (newValue && newValue.month) {
      // Access newValue.month here
      setSelectedMonth(newValue);
    } else {
      console.error("newValue or newValue.month is undefined");
    }
  };

  const updateChange = (e) => {
    setAddProvisions({
      ...addProvisions,
      [e.target.name]: e.target.value,
    });
  };

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
            Provisions Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <Grid className="d-flex m-2">
                  <InputBoxComponent
                    label="Branch ID"
                    placeholder=" Branch ID"
                    sx={{ width: 200 }}
                    value={branchIDforDue}
                  />

                  <InputBoxComponent
                    label="Rent Start Date"
                    placeholder="Rent Start Date"
                    sx={{ width: 200 }}
                    value={rentStartDate}
                  />
                  <InputBoxComponent
                    label="Rent End Date"
                    placeholder="Rent End Date"
                    sx={{ width: 200 }}
                    value={rentEndDate}
                  />

                  <InputBoxComponent
                    label="Tenure Period"
                    placeholder=" Tenure Period"
                    sx={{ width: 200 }}
                    value={agreementTenure}
                  />
                </Grid>
              </Col>
              <Col xs={12}>
                <Grid className="d-flex m-2">
                  <Typography>Provision for the month :</Typography>
                </Grid>
                {/* <Grid className="d-flex px-2 ml-4 mt-4">
                  <InputBoxComponent
                    label="Contract ID"
                    placeholder="Contract ID"
                    sx={{ width: 200 }}
                    value={uniqueID}
                    onChange={(e) => updateChange(e)}
                  />

                  <InputBoxComponent
                    label="Provision ID"
                    placeholder="Provision ID"
                    sx={{ width: 200 }}
                    value={addProvisions.provisionID}
                    onChange={(e) => updateChange(e)}
                  />
                </Grid> */}
                <Grid className="d-flex  ">
                  <DropDownComponent
                    label="Month"
                    placeholder="Select "
                    sx={{ width: 300, ml: 0 }}
                    size="small"
                    options={months}
                    name="month"
                    value={addProvisions.month}
                    onChange={(val) => {
                      handleMonthChange("month", val);
                    }}
                  />

                  <DropDownComponent
                    label="Year"
                    placeholder="Select "
                    sx={{ width: 300, ml: 0 }}
                    size="small"
                    options={yearOptions}
                    value={addProvisions?.year}
                    onChange={(val) => {
                      handleChange("year", val);
                    }}
                  />

                  <InputBoxComponent
                    label="Provision Amount"
                    placeholder="Provision Amount"
                    sx={{ width: 300, ml: 0 ,mt:-1.3}}
                    value={monthlyRent}
                    onChange={(e) => updateChange(e)}
                  />
                </Grid>

                <Grid className="d-flex flex-row mt-4">
                  <InputBoxComponent
                    textLabel="Remarks :"
                    placeholder="Type here..."
                    sx={{ width: 400 }}
                    rows={4}
                    name="remark"
                    value={addProvisions?.remark}
                    multiline
                    onChange={(e) => updateChange(e)}
                  />

                  <Button
                    onClick={() => {
                      AddProvisionFortheMonth();
                      // handleClose();
                    }}
                  >
                    Make Provision
                  </Button>
                </Grid>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Provisions;
