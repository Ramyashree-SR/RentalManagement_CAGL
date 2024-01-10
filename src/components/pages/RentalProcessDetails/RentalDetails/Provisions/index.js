import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { red } from "@mui/material/colors";
import { getBranchWiseProvisionsList } from "../../../../services/ProvisionsListApi";
import ReusableTable from "../../../../molecules/ReusableTable";
import { ProvisionsColumns } from "../../../../../constants/ProvisionList";
import PaymentTableComponent from "../../../../molecules/PaymentTableComponent";
import { ExportToCSV } from "../../../../ExportToCSV";

const Provisions = (props) => {
  const {
    rentEndDate,
    rentStartDate,
    branchIDforDue,
    lessorName,
    AddProvisionFortheMonth,
    addProvisions,
    setAddProvisions,
    monthlyRent,
    uniqueID,
    lesseeBranchName,
  } = props;

  const [dataSelect, setDataSelect] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [provisionsList, setProvisionsList] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);

  let flag = [{ id: "All", label: "All" }];

  const handleChange = (newValue) => {
    console.log(newValue, "newValue");
    setSelectedYear(newValue.label);
  };

  const handleSelectChange = (value) => {
    // console.log(value, "value");
    setDataSelect(value.label);
  };

  useEffect(() => {
    getProvisionListDetails();
  }, [inputValue, selectedYear]);

  // Parse the provided rent end date
  // const endDateObject = new Date(rentEndDate);
  const endDateObject = new Date();

  // Check if the provided rent end date is valid
  if (isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }

  // Extract the year from the rent end date
  const currentYear = endDateObject?.getFullYear();

  // Generate an array of years, including the current MOnth
  const yearOptions = Array.from({ length: 10 }, (_, index) => ({
    value: currentYear - index, // currentYear
    label: `${currentYear - index}`,
  }));

  // const getProvisionListDetails = async () => {
  //   // let params = id ? id : "All";
  //   const { data } = await getBranchWiseProvisionsList(
  //     dataSelect,
  //     selectedYear
  //   );
  //   // console.log(data?.data?.data, "Provisionsdata");
  //   if (data) {
  //     if (data) {
  //       let getData = data?.data;
  //       setProvisionsList(getData);
  //     } else {
  //       setProvisionsList([]);
  //     }
  //   }
  // };
  const getProvisionListDetails = async () => {
    // let params = id ? id : "All";
    const { data } = await getBranchWiseProvisionsList(
      inputValue,
      selectedYear
    );
    // console.log(data?.data?.data, "Provisionsdata");
    if (data) {
      if (data) {
        let getData = data?.data;
        setProvisionsList(getData);
      } else {
        setProvisionsList([]);
      }
    }
  };

  const handleBranchIDChange = (e) => {
    // setProvisionsList({
    //   ...provisionsList,
    //   [e.target.name]: e.target.value,
    // });
    setInputValue(e.target.value);
  };

  const getProvisionReport = provisionsList?.map((item) => ({
    ContractID: item.contractID,
    BranchID: item.info?.branchID,
    BranchName: item.info?.lesseeBranchName,
    AreaName: item.info?.lesseeAreaName,
    Division: item.lesseeDivision,
    Zone: item.info?.lesseeZone,
    State: item.info?.lesseeState,
    BankName: item.info?.lessorBankName,
    IFSCNumber: item.info?.lessorIfscNumber,
    AccountNumber: item.info?.lessorAccountNumber,
  }));

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
          {/* <Container>
            <Row>
              <Col xs={12}> */}
          <Grid className="d-flex flex-column m-2" sx={{ position: "fixed" }}>
            <Grid className="d-flex " sx={{ mt: -1.5 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
                List of Branch with Provisions:
              </Typography>
            </Grid>
            {/* <hr /> */}
            <Grid className="d-flex" sx={{ mt: 0.5 }}>
              <InputBoxComponent
                label="ID"
                placeholder="Enter ID"
                sx={{ width: 200, mt: -1 }}
                name="inputValue"
                value={inputValue}
                onChange={(e) => {
                  handleBranchIDChange(e);
                }}
              />

              <DropDownComponent
                label="Year"
                placeholder="Select "
                sx={{ width: 200, mt: 0.5 }}
                size="small"
                options={yearOptions}
                value={selectedYear}
                onChange={handleChange}
              />

              <Grid
                item
                className="d-flex flex-row align-items-end justify-content-end"
                sx={{
                  mt: 0.1,
                  ml: 10,
                  width: 120,
                  height: 40,
                }}
              >
                {/* <ExcelExport
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
                /> */}
                <ExportToCSV
                  // excelData={provisionsList}
                  excelData={getProvisionReport}
                  fileName={"ProvisionsList"}
                />
              </Grid>
            </Grid>
          </Grid>
          <Box
            sm={12}
            xs={12}
            sx={{
              marginLeft: "1px auto auto 1px",
            }}
          >
            {selectedYear && (
              <ReusableTable
                data={provisionsList}
                columns={ProvisionsColumns}
                sx={{ height: 320, mt: 10 }}
              />
            )}
          </Box>
          {/* <PaymentTableComponent
                    data={provisionsList}
                    columns={ProvisionsColumns}
                  /> */}
          {/* </Col>
            </Row>
          </Container> */}
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

export default Provisions;

