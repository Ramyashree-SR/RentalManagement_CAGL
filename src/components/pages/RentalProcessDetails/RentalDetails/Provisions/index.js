import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../../atoms/DropDownComponent";

const Provisions = (props) => {
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
                    label="Agreement Sign Dtae"
                    placeholder=" Agreement Sign Date"
                    sx={{ width: 200 }}
                    value={props.selectedItem?.agreementSignDate}
                  />

                  <InputBoxComponent
                    label="Agreement Start Date"
                    placeholder="Agreement Start Date"
                    sx={{ width: 200 }}
                    value={props.selectedItem?.agreementStartDate}
                  />
                  <InputBoxComponent
                    label="Agreement End Date"
                    placeholder="Agreement End Date"
                    sx={{ width: 200 }}
                    value={props.selectedItem?.agreementEndDate}
                  />

                  <InputBoxComponent
                    label="Tenure Period"
                    placeholder=" Tenure Period"
                    sx={{ width: 200 }}
                    value={props.selectedItem?.agreementTenure}
                  />
                </Grid>
              </Col>
              <Col xs={12}>
                <Grid className="d-flex m-2">
                  <Typography>Provision for the month :</Typography>
                </Grid>
                <Grid className="d-flex px-2 ml-4 mt-4">
                  <DropDownComponent
                    label="Month"
                    placeholder="Select "
                    sx={{ width: 300, ml: 0 }}
                    size="small"
                    // options={months}
                    // onSelect={handleActivationStatus}
                    // name="agreementActivationStatus"
                    // value={allNewContractDetails?.agreementActivationStatus}
                    // onChange={(value) =>
                    //   handleActivationStatus("agreementActivationStatus", value)
                    // }
                  />
                </Grid>
                <Grid className="d-flex px-2 ml-4 mt-4">
                  <InputBoxComponent
                    textLabel="Remarks :"
                    placeholder="Type here..."
                    sx={{ width: 400, height: 400 }}
                    rows={4}
                    // value={props.selectedItem?.agreementSignDate}
                    multiline
                  />
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
