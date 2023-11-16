import { Button } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";

const PaymentReport = (props) => {
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
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentReport;
