import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import StepperComponent from "../../molecules/StepperComponent";
import GeneralInformation from "./GeneralInformation";
import PremisesInformation from "./PremesisInformation";
import { Modal, ModalFooter } from "react-bootstrap";
import AgreementDetails from "./AgreementDetails";

import GPSInformation from "./GPSInformation";
import LesseeInformation from "./LesseeInformation";
import RentTermsDetails from "./RentTermsDetails";
import { AddRentContractDetails } from "../../services/AddContractApi";
import moment from "moment/moment";
import {
  emailRegex,
  gstRegex,
  mobileRegex,
  nameRegex,
  nameWithSpaces,
  nameWithSpacesAndNumbers,
  numberNameWithSpecialCharacters,
  numbers,
  numbersRegex,
  numbersWithSpecialChatracters,
  numbersWithSpecialChatractersAndSeparated,
  panCardRegex,
  pincodeRegex,
} from "../../../constants/RegexConstacts";
import {
  EditRentContractDetails,
  EditRentRenewContractDetails,
} from "../../services/EditContractApi";
import {
  datePickerFormat,
  formatDateToBackEndReqirement,
} from "../../CommonFunction/CommonFunction";
import { useToasts } from "react-toast-notifications";
import DropDownComponent from "../../atoms/DropDownComponent";
import { getBranchID } from "../../services/RentContractsApi";
import { getRentContractDetailsOnBranchID } from "../../services/BranchDetails";

let errObj = {
  lessorName: "",
  lessorContactNumber: "",
  lessorEmailAddress: "",
  lessorPanNumber: "",
  lessorGstNumber: "",
  lessorTdsNumber: "",
  paymentMode: "",
  nationality: "",
  contractStatus: "",
  lessorElectricityBillPath: "",
  lessorTaxNumberPath: "",
  lessorBankPassBookPath: "",
  panDocumentPath: "",
  recipiants: [
    {
      lessorRecipiantsName: "",
      lessorBankName: "",
      lessorIfscNumber: "",
      lessorBranchName: "",
      lessorAccountNumber: "",
      lessorRentAmount: "",
      panNo: "",
      gstNo: "",
    },
  ],
  recipiantsID: "",
  lessorRecipiantsName: "",
  lessorBankName: "",
  lessorIfscNumber: "",
  lessorBranchName: "",
  lessorAccountNumber: "",
  lessorRentAmount: "",
  panNo: "",
  gstNo: "",

  lessorDoorNumber: "",
  lessorFloorNumber: "",
  lessorLandMark: "",
  lessorStreet: "",
  lessorWardNo: "",
  lessorCity: "",
  lessorPinCode: "",
  lessorTaluka: "",
  lessorDistrict: "",
  lessorState: "",
  lesseeBranchType: "",
  branchID: "",
  lesseeBranchName: "",
  lesseeAreaName: "",
  lesseeDivision: "",
  lesseeZone: "",
  lesseeState: "",

  lesseeApproverrenewals: "",
  lesseeApproverRelocation: "",
  lesseeEntityDetails: "",
  premesisLocation: "",
  premesisDoorNumber: "",
  premesisFloorNumber: "",
  premesisWardNo: "",
  premesisLandMark: "",
  premesisStreet: "",
  premesisCity: "",
  premesisPinCode: "",
  premesisTaluka: "",
  premesisDistrict: "",
  northPremesis: "",
  southPremesis: "",
  eastPremesis: "",
  westPremesis: "",
  premesisState: "",
  premesisBuildingType: "",
  agreementSignDate: null,
  agreementTenure: "",
  agreementActivationStatus: "",
  agreementStartDate: null,
  agreementEndDate: null,
  rentStartDate: null,
  rentEndDate: null,
  maintaineneCharge: "",
  waterCharge: "",
  electricity: "",
  documentType: "",
  documentPath: "",
  securityDepositAmount: "",
  securityDepositPaymentDate: "",
  securityDepositPaymentMode: "",
  securityDepositUtr: "",
  securityDepositLockinPeriod: "",
  securityDepositnoticePeriod: "",
  securityDepositExitTerm: "",
  standardDeducition: "",
  escalation: "",
  lattitude: "",
  longitude: "",
  gpsCoordinates: "",
  tds: "",
  gst: "",
  firstRentDate: "",
  lastRentDate: "",
  plotNumber: "",
  builtupArea: "",
  glName: "",
  glEmpId: "",
  signedDate: "",
  monthlyRent: "",
};

const MasterDetails = (props) => {
  const { addToast } = useToasts();
  const [activeStep, setActiveStep] = useState(0);
  const [serialNumber, setSerialNumber] = useState(1);

  const [stepData1, setStepData1] = useState("");
  // console.log(stepData1, "stepData1");
  const [stepData2, setStepData2] = useState("");
  const [stepData3, setStepData3] = useState("");
  const [stepData4, setStepData4] = useState("");
  const [stepData5, setStepData5] = useState("");
  const [stepData6, setStepData6] = useState("");
  const [allNewContractDetails, setAllNewContractDetails] = useState({
    lessorName: "",
    lessorContactNumber: "",
    lessorEmailAddress: "",
    lessorPanNumber: "",
    lessorGstNumber: "",
    lessorTdsNumber: "",
    paymentMode: "",
    nationality: "",
    contractStatus: "",
    lessorElectricityBillPath: "",
    lessorTaxNumberPath: "",
    lessorBankPassBookPath: "",
    panDocumentPath: "",
    recipiants: [
      {
        lessorRecipiantsName: "",
        lessorBankName: "",
        lessorIfscNumber: "",
        lessorBranchName: "",
        lessorAccountNumber: "",
        lessorRentAmount: "",
        panNo: "",
        gstNo: "",
      },
    ],
    recipiantsID: "",
    lessorRecipiantsName: "",
    lessorBankName: "",
    lessorIfscNumber: "",
    lessorBranchName: "",
    lessorAccountNumber: "",
    lessorRentAmount: "",
    panNo: "",
    gstNo: "",

    lessorDoorNumber: "",
    lessorFloorNumber: "",
    lessorLandMark: "",
    lessorStreet: "",
    lessorWardNo: "",
    lessorCity: "",
    lessorPinCode: "",
    lessorTaluka: "",
    lessorDistrict: "",
    lessorState: "",
    lesseeBranchType: "",
    branchID: "",
    lesseeBranchName: "",
    lesseeAreaName: "",
    lesseeDivision: "",
    lesseeZone: "",
    lesseeState: "",

    lesseeApproverrenewals: "",
    lesseeApproverRelocation: "",
    lesseeEntityDetails: "",
    premesisLocation: "",
    premesisDoorNumber: "",
    premesisFloorNumber: "",
    premesisWardNo: "",
    premesisLandMark: "",
    premesisStreet: "",
    premesisCity: "",
    premesisPinCode: "",
    premesisTaluka: "",
    premesisDistrict: "",
    northPremesis: "",
    southPremesis: "",
    eastPremesis: "",
    westPremesis: "",
    premesisState: "",
    premesisBuildingType: "",
    agreementSignDate: null,
    agreementTenure: "",
    agreementActivationStatus: "",
    agreementStartDate: null,
    agreementEndDate: null,
    rentStartDate: null,
    rentEndDate: null,
    maintaineneCharge: "",
    waterCharge: "",
    electricity: "",
    documentType: "",
    documentPath: "",
    securityDepositAmount: "",
    securityDepositPaymentDate: "",
    securityDepositPaymentMode: "",
    securityDepositUtr: "",
    securityDepositLockinPeriod: "",
    securityDepositnoticePeriod: "",
    securityDepositExitTerm: "",
    standardDeducition: "",
    escalation: "",
    lattitude: "",
    longitude: "",
    gpsCoordinates: "",
    tds: "",
    gst: "",
    firstRentDate: "",
    lastRentDate: "",
    plotNumber: "",
    builtupArea: "",
    glName: "",
    glEmpId: "",
    signedDate: "",
    monthlyRent: "",
  });

  // console.log("allNewContractDetails", allNewContractDetails);
  const [allNewContractDetailsErr, setAllNewContractDetailsErr] =
    useState(errObj);
  const [recipientCount, setRecipientCount] = useState(1);
  const [ifscCodes, setIFSCCodes] = useState(Array(recipientCount).fill(""));
  // console.log(ifscCodes, "ifscCodes");
  const [bankAndBranch, setBankAndBranch] = useState(
    Array(recipientCount).fill({
      bank: "",
      branch: "",
    })
  );

  const handleClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const [branchDetails, setBranchDetails] = useState({
    branchID: "",
    branchName: "",
    areaName: "",
    region: "",
    zone: "",
    state: "",
  });
  useEffect(() => {
    let errObj = {
      lessorName: "",
      lessorContactNumber: "",
      lessorEmailAddress: "",
      lessorPanNumber: "",
      lessorGstNumber: "",
      lessorTdsNumber: "",
      paymentMode: "",
      nationality: "",
      contractStatus: "",
      lessorElectricityBillPath: "",
      lessorTaxNumberPath: "",
      lessorBankPassBookPath: "",
      panDocumentPath: "",
      recipiants: [
        {
          lessorRecipiantsName: "",
          lessorBankName: "",
          lessorIfscNumber: "",
          lessorBranchName: "",
          lessorAccountNumber: "",
          lessorRentAmount: "",
          panNo: "",
          gstNo: "",
        },
      ],
      recipiantsID: "",
      lessorRecipiantsName: "",
      lessorBankName: "",
      lessorIfscNumber: "",
      lessorBranchName: "",
      lessorAccountNumber: "",
      lessorRentAmount: "",
      panNo: "",
      gstNo: "",

      lessorDoorNumber: "",
      lessorFloorNumber: "",
      lessorLandMark: "",
      lessorStreet: "",
      lessorWardNo: "",
      lessorCity: "",
      lessorPinCode: "",
      lessorTaluka: "",
      lessorDistrict: "",
      lessorState: "",
      lesseeBranchType: "",
      branchID: "",
      lesseeBranchName: "",
      lesseeAreaName: "",
      lesseeDivision: "",
      lesseeZone: "",
      lesseeState: "",

      lesseeApproverrenewals: "",
      lesseeApproverRelocation: "",
      lesseeEntityDetails: "",
      premesisLocation: "",
      premesisDoorNumber: "",
      premesisFloorNumber: "",
      premesisWardNo: "",
      premesisLandMark: "",
      premesisStreet: "",
      premesisCity: "",
      premesisPinCode: "",
      premesisTaluka: "",
      premesisDistrict: "",
      northPremesis: "",
      southPremesis: "",
      eastPremesis: "",
      westPremesis: "",
      premesisState: "",
      premesisBuildingType: "",
      agreementSignDate: null,
      agreementTenure: "",
      agreementActivationStatus: "",
      agreementStartDate: null,
      agreementEndDate: null,
      rentStartDate: null,
      rentEndDate: null,
      maintaineneCharge: "",
      waterCharge: "",
      electricity: "",
      documentType: "",
      documentPath: "",
      securityDepositAmount: "",
      securityDepositPaymentDate: "",
      securityDepositPaymentMode: "",
      securityDepositUtr: "",
      securityDepositLockinPeriod: "",
      securityDepositnoticePeriod: "",
      securityDepositExitTerm: "",
      standardDeducition: "",
      escalation: "",
      lattitude: "",
      longitude: "",
      gpsCoordinates: "",
      tds: "",
      gst: "",
      firstRentDate: "",
      lastRentDate: "",
      plotNumber: "",
      builtupArea: "",
      glName: "",
      glEmpId: "",
      signedDate: "",
      monthlyRent: "",
    };
    setAllNewContractDetailsErr(errObj);
  }, []);

  const handleAddRentContractInformationError = () => {
    let errorInForm = false;
    let errObj = {
      uniqueID: "",
      lessorName: "",
      lessorContactNumber: "",
      lessorEmailAddress: "",
      lessorPanNumber: "",
      lessorGstNumber: "",
      lessorTdsNumber: "",
      paymentMode: "",
      lessorElectricityBillNumber: "",
      lessorTaxNumber: "",
      lessorBankPassBookNumber: "",
      lessorCheuque: "",
      recipiants: [
        {
          lessorRecipiantsName: "",
          lessorBankName: "",
          lessorIfscNumber: "",
          lessorBranchName: "",
          lessorAccountNumber: "",
          lessorRentAmount: "",
          panNo: "",
          gstNo: "",
        },
      ],
      recipiantsID: "",
      lessorRecipiantsName: "",
      lessorBankName: "",
      lessorIfscNumber: "",
      lessorBranchName: "",
      lessorAccountNumber: "",
      lessorRentAmount: "",
      panNo: "",
      gstNo: "",
      lessorDoorNumber: "",
      lessorFloorNumber: "",
      lessorLandMark: "",
      lessorStreet: "",
      lessorWardNo: "",
      lessorArea: "",
      lessorCity: "",
      lessorLocation: "",
      lessorPinCode: "",
      lessorTaluka: "",
      lessorDistrict: "",
      lessorState: "",
      lesseeBranchType: "",
      branchID: "",
      lesseeBranchName: "",
      lesseeAreaName: "",
      lesseeDivision: "",
      lesseeZone: "",
      lesseeState: "",

      lesseeApproverrenewals: "",
      lesseeApproverRelocation: "",
      lesseeEntityDetails: "",
      premesisLocation: "",
      premesisDoorNumber: "",
      premesisFloorNumber: "",
      premesisWardNo: "",
      premesisLandMark: "",
      premesisStreet: "",
      premesisCity: "",
      premesisPinCode: "",
      premesisTaluka: "",
      premesisDistrict: "",
      northPremesis: "",
      southPremesis: "",
      eastPremesis: "",
      westPremesis: "",
      premesisState: "",
      premesisBuildingType: "",
      agreementSignDate: null,
      agreementTenure: "",
      agreementActivationStatus: "",
      agreementStartDate: null,
      agreementEndDate: null,
      rentStartDate: null,
      rentEndDate: null,
      agreementRefreshStartDate: "",
      agreementRefreshEndDate: "",
      maintaineneCharge: "",
      waterCharge: "",
      electricity: "",
      documentType: "",
      documentPath: "",
      securityDepositAmount: "",
      securityDepositPaymentDate: "",
      securityDepositPaymentMode: "",
      securityDepositUtr: "",
      securityDepositLockinPeriod: "",
      securityDepositnoticePeriod: "",
      securityDepositExitTerm: "",
      standardDeducition: "",
      firstMonthvalue: "",
      lastMonthvalue: "",
      // rentAmount: "",
      escalation: "",
      // renewalTenure: "",
      lattitude: "",
      longitude: "",
      gpsCoordinates: "",
      tds: "",
      gst: "",
      firstRentDate: "",
      lastRentDate: "",
      plotNumber: "",
      builtupArea: "",
      // renewalStatus: "",
      glName: "",
      glEmpId: "",
      signedDate: "",
      monthlyRent: "",
    };
    if (!allNewContractDetails.lessorDoorNumber) {
      errObj.lessorDoorNumber = "This field is required";
    } else if (
      allNewContractDetails.lessorDoorNumber.trim().length !==
      allNewContractDetails.lessorDoorNumber.length
    ) {
      errObj.lessorDoorNumber = "*Invalid Field";
    } else if (
      !nameWithSpacesAndNumbers.test(allNewContractDetails.lessorDoorNumber)
    ) {
      errObj.lessorDoorNumber = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorFloorNumber) {
      errObj.lessorFloorNumber = "This field is required";
    } else if (
      allNewContractDetails.lessorFloorNumber.trim().length !==
      allNewContractDetails.lessorFloorNumber.length
    ) {
      errObj.lessorFloorNumber = "*Invalid Field";
    } else if (
      !nameWithSpacesAndNumbers.test(allNewContractDetails.lessorFloorNumber)
    ) {
      errObj.lessorFloorNumber = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorLandMark) {
      errObj.lessorLandMark = "This field is required";
    } else if (
      allNewContractDetails.lessorLandMark.trim().length !==
      allNewContractDetails.lessorLandMark.length
    ) {
      errObj.lessorLandMark = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorLandMark)) {
      errObj.lessorLandMark = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorStreet) {
      errObj.lessorStreet = "This field is required";
    } else if (
      allNewContractDetails.lessorStreet.trim().length !==
      allNewContractDetails.lessorStreet.length
    ) {
      errObj.lessorStreet = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorStreet)) {
      errObj.lessorStreet = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorWardNo) {
      errObj.lessorWardNo = "This field is required";
    } else if (
      allNewContractDetails.lessorWardNo.trim().length !==
      allNewContractDetails.lessorWardNo.length
    ) {
      errObj.lessorWardNo = "*Invalid Field";
    } else if (!numbersRegex.test(allNewContractDetails.lessorWardNo)) {
      errObj.lessorWardNo = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorArea) {
      errObj.lessorArea = "This field is required";
    } else if (
      allNewContractDetails.lessorArea.trim().length !==
      allNewContractDetails.lessorArea.length
    ) {
      errObj.lessorArea = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorArea)) {
      errObj.lessorArea = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorCity) {
      errObj.lessorCity = "This field is required";
    } else if (
      allNewContractDetails.lessorCity.trim().length !==
      allNewContractDetails.lessorCity.length
    ) {
      errObj.lessorCity = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorCity)) {
      errObj.lessorCity = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorLocation) {
      errObj.lessorLocation = "This field is required";
    } else if (
      allNewContractDetails.lessorLocation.trim().length !==
      allNewContractDetails.lessorLocation.length
    ) {
      errObj.lessorLocation = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorLocation)) {
      errObj.lessorLocation = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorPinCode) {
      errObj.lessorPinCode = "This field is required";
    } else if (
      allNewContractDetails.lessorPinCode.trim().length !==
      allNewContractDetails.lessorPinCode.length
    ) {
      errObj.lessorPinCode = "*Invalid Field";
    } else if (!pincodeRegex.test(allNewContractDetails.lessorPinCode)) {
      errObj.lessorPinCode = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorTaluka) {
      errObj.lessorTaluka = "This field is required";
    } else if (
      allNewContractDetails.lessorTaluka.trim().length !==
      allNewContractDetails.lessorTaluka.length
    ) {
      errObj.lessorTaluka = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorTaluka)) {
      errObj.lessorTaluka = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorDistrict) {
      errObj.lessorDistrict = "This field is required";
    } else if (
      allNewContractDetails.lessorDistrict.trim().length !==
      allNewContractDetails.lessorDistrict.length
    ) {
      errObj.lessorDistrict = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorDistrict)) {
      errObj.lessorDistrict = "*Invalid Field";
    }

    if (!allNewContractDetails.premesisDoorNumber) {
      errObj.premesisDoorNumber = "This field is required";
    } else if (
      allNewContractDetails.premesisDoorNumber.trim().length !==
      allNewContractDetails.premesisDoorNumber.length
    ) {
      errObj.premesisDoorNumber = "*Invalid Field";
    } else if (
      !numberNameWithSpecialCharacters.test(
        allNewContractDetails.premesisDoorNumber
      )
    ) {
      errObj.premesisDoorNumber = "*Invalid Field";
    }

    if (!allNewContractDetails.premesisFloorNumber) {
      errObj.premesisFloorNumber = "This field is required";
    } else if (
      allNewContractDetails.premesisFloorNumber.trim().length !==
      allNewContractDetails.premesisFloorNumber.length
    ) {
      errObj.premesisFloorNumber = "*Invalid Field";
    } else if (
      !nameWithSpacesAndNumbers.test(allNewContractDetails.premesisFloorNumber)
    ) {
      errObj.premesisFloorNumber = "*Invalid Field";
    }

    if (!allNewContractDetails.premesisWardNo) {
      errObj.premesisWardNo = "This field is required";
    } else if (
      allNewContractDetails.premesisWardNo.trim().length !==
      allNewContractDetails.premesisWardNo.length
    ) {
      errObj.premesisWardNo = "*Invalid Field";
    } else if (!numbersRegex.test(allNewContractDetails.premesisWardNo)) {
      errObj.premesisWardNo = "*Invalid Field";
    }

    if (!allNewContractDetails.premesisLandMark) {
      errObj.premesisLandMark = "This field is required";
    } else if (
      allNewContractDetails.premesisLandMark.trim().length !==
      allNewContractDetails.premesisLandMark.length
    ) {
      errObj.premesisLandMark = "*Invalid Field";
    } else if (
      !nameWithSpacesAndNumbers.test(allNewContractDetails.premesisLandMark)
    ) {
      errObj.premesisLandMark = "*Invalid Field";
    }

    if (!allNewContractDetails.premesisStreet) {
      errObj.premesisStreet = "This field is required";
    } else if (
      allNewContractDetails.premesisStreet.trim().length !==
      allNewContractDetails.premesisStreet.length
    ) {
      errObj.premesisStreet = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.premesisStreet)) {
      errObj.premesisStreet = "*Invalid Field";
    }

    if (!allNewContractDetails.premesisCity) {
      errObj.premesisCity = "This field is required";
    } else if (
      allNewContractDetails.premesisCity.trim().length !==
      allNewContractDetails.premesisCity.length
    ) {
      errObj.premesisCity = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.premesisCity)) {
      errObj.premesisCity = "*Invalid Field";
    }

    if (!allNewContractDetails.premesisPinCode) {
      errObj.premesisPinCode = "This field is required";
    } else if (
      allNewContractDetails.premesisPinCode.trim().length !==
      allNewContractDetails.premesisPinCode.length
    ) {
      errObj.premesisPinCode = "*Invalid Field";
    } else if (!pincodeRegex.test(allNewContractDetails.premesisPinCode)) {
      errObj.premesisPinCode = "*Invalid Field";
    }

    if (!allNewContractDetails.premesisTaluka) {
      errObj.premesisTaluka = "This field is required";
    } else if (
      allNewContractDetails.premesisTaluka.trim().length !==
      allNewContractDetails.premesisTaluka.length
    ) {
      errObj.premesisTaluka = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.premesisTaluka)) {
      errObj.premesisTaluka = "*Invalid Field";
    }

    if (!allNewContractDetails.premesisDistrict) {
      errObj.premesisDistrict = "This field is required";
    } else if (
      allNewContractDetails.premesisDistrict.trim().length !==
      allNewContractDetails.premesisDistrict.length
    ) {
      errObj.premesisDistrict = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.premesisDistrict)) {
      errObj.premesisDistrict = "*Invalid Field";
    }

    if (!allNewContractDetails.premesisState) {
      errObj.premesisState = "This field is required";
    } else if (!nameWithSpaces.test(allNewContractDetails.premesisState)) {
      errObj.premesisState = "*Invalid Field";
    }

    if (!allNewContractDetails.northPremesis) {
      errObj.northPremesis = "This field is required";
    } else if (
      allNewContractDetails.northPremesis.trim().length !==
      allNewContractDetails.northPremesis.length
    ) {
      errObj.northPremesis = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.northPremesis)) {
      errObj.northPremesis = "*Invalid Field";
    }

    if (!allNewContractDetails.southPremesis) {
      errObj.southPremesis = "This field is required";
    } else if (
      allNewContractDetails.southPremesis.trim().length !==
      allNewContractDetails.southPremesis.length
    ) {
      errObj.southPremesis = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.southPremesis)) {
      errObj.southPremesis = "*Invalid Field";
    }

    if (!allNewContractDetails.eastPremesis) {
      errObj.eastPremesis = "This field is required";
    } else if (
      allNewContractDetails.eastPremesis.trim().length !==
      allNewContractDetails.eastPremesis.length
    ) {
      errObj.eastPremesis = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.eastPremesis)) {
      errObj.eastPremesis = "*Invalid Field";
    }

    if (!allNewContractDetails.westPremesis) {
      errObj.westPremesis = "This field is required";
    } else if (
      allNewContractDetails.westPremesis.trim().length !==
      allNewContractDetails.westPremesis.length
    ) {
      errObj.westPremesis = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.westPremesis)) {
      errObj.westPremesis = "*Invalid Field";
    }

    if (!allNewContractDetails.glName) {
      errObj.glName = "This field is required";
    } else if (
      allNewContractDetails.glName.trim().length !==
      allNewContractDetails.glName.length
    ) {
      errObj.glName = "*Invalid Field";
    } else if (!nameWithSpaces.test(allNewContractDetails.glName)) {
      errObj.glName = "*Invalid Field";
    }

    if (!allNewContractDetails.glEmpId) {
      errObj.glEmpId = "This field is required";
    } else if (
      allNewContractDetails.glEmpId.trim().length !==
      allNewContractDetails.glEmpId.length
    ) {
      errObj.glEmpId = "*Invalid Field";
    } else if (!nameWithSpacesAndNumbers.test(allNewContractDetails.glEmpId)) {
      errObj.glEmpId = "*Invalid Field";
    }

    if (!allNewContractDetails.securityDepositAmount) {
      errObj.securityDepositAmount = "This field is required";
    } else if (
      !numbersRegex.test(allNewContractDetails.securityDepositAmount)
    ) {
      errObj.securityDepositAmount = "";
    }

    if (!allNewContractDetails.monthlyRent) {
      errObj.monthlyRent = "This field is required";
    } else if (!numbersRegex.test(allNewContractDetails.monthlyRent)) {
      errObj.monthlyRent = "";
    }

    if (!allNewContractDetails.escalation) {
      errObj.escalation = "This field is required";
    } else if (
      allNewContractDetails.escalation.trim().length !==
      allNewContractDetails.escalation.length
    ) {
      errObj.escalation = "*Invalid Field";
    } else if (!numbersRegex.test(allNewContractDetails.escalation)) {
      errObj.escalation = "*Invalid Field";
    }

    if (!allNewContractDetails.lattitude) {
      errObj.lattitude = "This field is required";
    } else if (
      allNewContractDetails.lattitude.trim().length !==
      allNewContractDetails.lattitude.length
    ) {
      errObj.lattitude = "*Invalid Field";
    } else if (
      !numbersWithSpecialChatracters.test(allNewContractDetails.lattitude)
    ) {
      errObj.lattitude = "*Invalid Field";
    }

    if (!allNewContractDetails.longitude) {
      errObj.longitude = "This field is required";
    } else if (
      allNewContractDetails.longitude.trim().length !==
      allNewContractDetails.longitude.length
    ) {
      errObj.longitude = "*Invalid Field";
    } else if (
      !numbersWithSpecialChatracters.test(allNewContractDetails.longitude)
    ) {
      errObj.longitude = "*Invalid Field";
    }

    if (!allNewContractDetails.gpsCoordinates) {
      errObj.gpsCoordinates = "This field is required";
    } else if (
      allNewContractDetails.gpsCoordinates.trim().length !==
      allNewContractDetails.gpsCoordinates.length
    ) {
      errObj.gpsCoordinates = "*Invalid Field";
    } else if (
      !numbersWithSpecialChatractersAndSeparated.test(
        allNewContractDetails.gpsCoordinates
      )
    ) {
      errObj.gpsCoordinates = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorContactNumber) {
      errObj.lessorContactNumber = "This field is required";
    } else if (
      allNewContractDetails.lessorContactNumber.trim().length !==
      allNewContractDetails.lessorContactNumber.length
    ) {
      errObj.lessorContactNumber = "*Invalid Field";
    } else if (!mobileRegex.test(allNewContractDetails.lessorContactNumber)) {
      errObj.lessorContactNumber = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorPanNumber) {
      errObj.lessorPanNumber = "This field is required";
    } else if (
      allNewContractDetails.lessorPanNumber.trim().length !==
      allNewContractDetails.lessorPanNumber.length
    ) {
      errObj.lessorPanNumber = "*Invalid Field";
    } else if (!panCardRegex.test(allNewContractDetails.lessorPanNumber)) {
      errObj.lessorPanNumber = "*Invalid Field";
    }

    if (!allNewContractDetails.lessorGstNumber) {
      errObj.lessorGstNumber = "This field is required";
    } else if (
      allNewContractDetails.lessorGstNumber.trim().length !==
      allNewContractDetails.lessorGstNumber.length
    ) {
      errObj.lessorGstNumber = "*Invalid Field";
    } else if (!gstRegex.test(allNewContractDetails.lessorGstNumber)) {
      errObj.lessorGstNumber = "*Invalid Field";
    }

    console.log("Validation Result:", errorInForm);
    setAllNewContractDetailsErr({ ...errObj });
    return errorInForm;
  };

  const handleSaveData = (stepData) => {
    switch (activeStep) {
      case 0:
        setStepData1(stepData);
        break;
      case 1:
        setStepData2(stepData);
        break;
      case 2:
        setStepData3(stepData);
        break;
      case 3:
        setStepData4(stepData);
        break;
      case 4:
        setStepData5(stepData);
        break;
      case 5:
        setStepData6(stepData);
        break;
      default:
        break;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const contractStatus = [
    { id: "New/Relocate", label: "New/Relocate" },
    { id: "Renewal", label: "Renewal" },
  ];

  const [rentContractStatus, setRentContractStatus] = useState([]);

  const handleContractChange = (value) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      contractStatus: value,
    });
    setRentContractStatus(value);
    // editAllRenewRentContractDetails(value);
  };
  const AddAllNewRentContactInformation = async () => {
    let payload = {
      branchID: allNewContractDetails?.branchID,
      lessorName: allNewContractDetails?.lessorName,
      lessorContactNumber: allNewContractDetails?.lessorContactNumber,
      lessorEmailAddress: allNewContractDetails?.lessorEmailAddress,
      lessorPanNumber: allNewContractDetails?.lessorPanNumber,
      lessorGstNumber: allNewContractDetails?.lessorGstNumber,
      // lessorTdsNumber: allNewContractDetails?.lessorTdsNumber,
      paymentMode: allNewContractDetails?.paymentMode?.label,
      recipiants: allNewContractDetails?.recipiants?.map(
        (recipient, index) => ({
          lessorRecipiantsName: recipient?.lessorRecipiantsName,
          lessorIfscNumber: recipient?.lessorIfscNumber || ifscCodes?.[index],
          lessorBankName:
            recipient?.lessorBankName || bankAndBranch?.[index].bank, // Use bank name from state
          lessorBranchName:
            recipient?.lessorBranchName || bankAndBranch?.[index].branch, // Use branch name from state
          // Use IFSC code from state
          lessorAccountNumber: recipient?.lessorAccountNumber,
          lessorRentAmount: recipient?.lessorRentAmount,
          panNo: recipient?.panNo,
          gstNo: recipient?.gstNo,
        })
      ),
      nationality: allNewContractDetails?.nationality,
      contractStatus: allNewContractDetails?.contractStatus?.label,

      lessorDoorNumber: allNewContractDetails?.lessorDoorNumber,
      lessorFloorNumber: allNewContractDetails?.lessorFloorNumber,
      lessorWardNo: allNewContractDetails?.lessorWardNo,
      lessorLandMark: allNewContractDetails?.lessorLandMark,
      lessorStreet: allNewContractDetails?.lessorStreet,
      lessorCity: allNewContractDetails?.lessorCity,
      lessorPinCode: allNewContractDetails?.lessorPinCode,
      lessorTaluka: allNewContractDetails?.lessorTaluka,
      lessorDistrict: allNewContractDetails?.lessorDistrict,
      lessorState: allNewContractDetails?.lessorState,

      lesseeBranchType: allNewContractDetails?.lesseeBranchType.label,
      lesseeBranchName: allNewContractDetails?.branchName,
      lesseeAreaName: allNewContractDetails?.areaName,
      lesseeDivision: allNewContractDetails?.region,
      lesseeZone: allNewContractDetails?.zone,
      lesseeState: allNewContractDetails?.state,

      lesseeApproverrenewals: allNewContractDetails?.lesseeApproverrenewals,
      lesseeApproverRelocation: allNewContractDetails?.lesseeApproverRelocation,
      lesseeEntityDetails: allNewContractDetails?.lesseeEntityDetails?.label,

      premesisLocation: allNewContractDetails?.premesisLocation?.label,
      premesisDoorNumber: allNewContractDetails?.premesisDoorNumber,
      premesisFloorNumber: allNewContractDetails?.premesisFloorNumber,
      premesisWardNo: allNewContractDetails?.premesisWardNo,
      premesisLandMark: allNewContractDetails?.premesisLandMark,
      premesisStreet: allNewContractDetails?.premesisStreet,
      premesisCity: allNewContractDetails?.premesisCity,
      premesisTaluka: allNewContractDetails?.premesisTaluka,
      premesisPinCode: allNewContractDetails?.premesisPinCode,
      premesisDistrict: allNewContractDetails?.premesisDistrict,
      premesisState: allNewContractDetails?.lesseeState,
      district: allNewContractDetails?.premesisDistrict,
      northPremesis: allNewContractDetails?.northPremesis,
      southPremesis: allNewContractDetails?.southPremesis,
      eastPremesis: allNewContractDetails?.eastPremesis,
      westPremesis: allNewContractDetails?.westPremesis,
      premesisBuildingType: allNewContractDetails?.premesisBuildingType?.label,
      agreementSignDate: allNewContractDetails?.agreementSignDate,
      agreementTenure: allNewContractDetails?.agreementTenure,
      agreementActivationStatus:
        allNewContractDetails?.agreementActivationStatus?.label,
      agreementStartDate: allNewContractDetails?.agreementStartDate,
      agreementEndDate: allNewContractDetails?.agreementEndDate,
      rentStartDate: allNewContractDetails?.rentStartDate,
      rentEndDate: allNewContractDetails?.rentEndDate,

      maintaineneCharge: allNewContractDetails?.maintaineneCharge,
      waterCharge: allNewContractDetails?.waterCharge,
      electricity: allNewContractDetails?.electricity,
      documentType: allNewContractDetails?.documentType?.label,
      securityDepositAmount: allNewContractDetails?.securityDepositAmount,
      securityDepositPaymentDate:
        allNewContractDetails?.securityDepositPaymentDate,
      securityDepositPaymentMode:
        allNewContractDetails?.securityDepositPaymentMode,
      securityDepositUtr: allNewContractDetails?.securityDepositUtr,
      securityDepositLockinPeriod:
        allNewContractDetails?.securityDepositLockinPeriod?.label,
      securityDepositnoticePeriod:
        allNewContractDetails?.securityDepositnoticePeriod?.label,
      securityDepositExitTerm: allNewContractDetails?.securityDepositExitTerm,
      standardDeducition: allNewContractDetails?.standardDeducition,
      firstMonthvalue: allNewContractDetails?.firstMonthvalue,
      exittermlastMonthvalues: allNewContractDetails?.lastMonthvalue,

      rentAmount: allNewContractDetails?.rentAmount,
      escalation: allNewContractDetails?.escalation,
      renewalTenure: allNewContractDetails?.renewalTenure,

      tds: allNewContractDetails?.tds,
      gst: allNewContractDetails.gst,

      lattitude: allNewContractDetails?.lattitude,
      longitude: allNewContractDetails?.longitude,
      gpsCoordinates: allNewContractDetails?.gpsCoordinates,

      firstRentDate: allNewContractDetails?.rentStartDate,
      lastRentDate: allNewContractDetails?.lastRentDate,
      plotNumber: allNewContractDetails?.plotNumber,
      builtupArea: allNewContractDetails?.builtupArea,
      renewalStatus: allNewContractDetails?.renewalStatus,

      glName: allNewContractDetails?.glName,
      glEmpId: allNewContractDetails?.glEmpId,
      signedDate: allNewContractDetails?.signedDate,

      monthlyRent: allNewContractDetails?.monthlyRent,
    };
    const { data, errRes } = await AddRentContractDetails(payload);
    // console.log(data,"addData");
    if (data?.data) {
      setBranchDetails({
        branchID: allNewContractDetails?.branchID,
        branchName: allNewContractDetails?.lesseeBranchName,
        areaName: allNewContractDetails?.lesseeAreaName,
        region: allNewContractDetails?.lesseeDivision,
        zone: allNewContractDetails?.lesseeZone,
        state: allNewContractDetails?.lesseeState,
        // ... other fields
      });
      setAllNewContractDetails({
        lessorName: "",
        lessorContactNumber: "",
        lessorEmailAddress: "",
        lessorPanNumber: "",
        lessorGstNumber: "",
        lessorTdsNumber: "",
        paymentMode: "",
        nationality: "",
        contractStatus: "",
        lessorElectricityBillPath: "",
        lessorTaxNumberPath: "",
        lessorBankPassBookPath: "",
        panDocumentPath: "",
        recipiants: [
          {
            lessorRecipiantsName: "",
            lessorBankName: "",
            lessorIfscNumber: "",
            lessorBranchName: "",
            lessorAccountNumber: "",
            lessorRentAmount: "",
            panNo: "",
            gstNo: "",
          },
        ],
        recipiantsID: "",
        lessorRecipiantsName: "",
        lessorBankName: "",
        lessorIfscNumber: "",
        lessorBranchName: "",
        lessorAccountNumber: "",
        lessorRentAmount: "",
        panNo: "",
        gstNo: "",

        lessorDoorNumber: "",
        lessorFloorNumber: "",
        lessorLandMark: "",
        lessorStreet: "",
        lessorWardNo: "",
        lessorCity: "",
        lessorPinCode: "",
        lessorTaluka: "",
        lessorDistrict: "",
        lessorState: "",
        lesseeBranchType: "",
        branchID: "",
        lesseeBranchName: "",
        lesseeAreaName: "",
        lesseeDivision: "",
        lesseeZone: "",
        lesseeState: "",

        lesseeApproverrenewals: "",
        lesseeApproverRelocation: "",
        lesseeEntityDetails: "",
        premesisLocation: "",
        premesisDoorNumber: "",
        premesisFloorNumber: "",
        premesisWardNo: "",
        premesisLandMark: "",
        premesisStreet: "",
        premesisCity: "",
        premesisPinCode: "",
        premesisTaluka: "",
        premesisDistrict: "",
        northPremesis: "",
        southPremesis: "",
        eastPremesis: "",
        westPremesis: "",
        premesisState: "",
        premesisBuildingType: "",
        agreementSignDate: null,
        agreementTenure: "",
        agreementActivationStatus: "",
        agreementStartDate: null,
        agreementEndDate: null,
        rentStartDate: null,
        rentEndDate: null,
        maintaineneCharge: "",
        waterCharge: "",
        electricity: "",
        documentType: "",
        documentPath: "",
        securityDepositAmount: "",
        securityDepositPaymentDate: "",
        securityDepositPaymentMode: "",
        securityDepositUtr: "",
        securityDepositLockinPeriod: "",
        securityDepositnoticePeriod: "",
        securityDepositExitTerm: "",
        standardDeducition: "",
        escalation: "",
        lattitude: "",
        longitude: "",
        gpsCoordinates: "",
        tds: "",
        gst: "",
        firstRentDate: "",
        lastRentDate: "",
        plotNumber: "",
        builtupArea: "",
        glName: "",
        glEmpId: "",
        signedDate: "",
        monthlyRent: "",
      });
      setIFSCCodes(Array(recipientCount).fill(""));
      setBankAndBranch(Array(recipientCount).fill({ bank: "", branch: "" }));
      addToast("Rent Contract Data Added Successfully", {
        appearance: "success",
      });
      props.getContractDetails(data?.data);
      props.close();
      setTimeout(() => {
        props.getContractDetails();
      }, 9000);
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
      props.close();
    }
  };

  const editAllNewRentContractDetails = async () => {
    // if (props.type === "edit") {
    let payload = {
      branchID: allNewContractDetails?.branchID,
      lessorName: allNewContractDetails?.lessorName,
      lessorContactNumber: allNewContractDetails?.lessorContactNumber,
      lessorEmailAddress: allNewContractDetails?.lessorEmailAddress,
      lessorPanNumber: allNewContractDetails?.lessorPanNumber,
      lessorGstNumber: allNewContractDetails?.lessorGstNumber,
      paymentMode: allNewContractDetails?.paymentMode,
      // recipiants: allNewContractDetails?.recipiants?.map(
      //   (recipient, index) => ({
      //     lessorRecipiantsName: recipient?.lessorRecipiantsName,
      //     lessorIfscNumber: recipient?.lessorIfscNumber || ifscCodes?.[index],
      //     lessorBankName:
      //       recipient?.lessorBankName || bankAndBranch?.[index].bank, // Use bank name from state
      //     lessorBranchName:
      //       recipient?.lessorBranchName || bankAndBranch?.[index].branch, // Use branch name from state
      //     // Use IFSC code from state
      //     lessorAccountNumber: recipient?.lessorAccountNumber,
      //     lessorRentAmount: recipient?.lessorRentAmount,
      //     panNo: recipient?.panNo,
      //     gstNo: recipient?.gstNo,
      //   })
      // ),
      nationality: allNewContractDetails?.nationality,
      contractStatus: allNewContractDetails?.contractStatus?.label,
      recipiantsID: allNewContractDetails?.recipiantsID,
      lessorRecipiantsName: allNewContractDetails?.lessorRecipiantsName,
      lessorBankName: allNewContractDetails?.lessorBankName,
      lessorIfscNumber: allNewContractDetails?.lessorIfscNumber,
      lessorBranchName: allNewContractDetails?.lessorBranchName,
      lessorAccountNumber: allNewContractDetails?.lessorAccountNumber,
      lessorRentAmount: allNewContractDetails?.lessorRentAmount,
      panNo: allNewContractDetails?.panNo,
      gstNo: allNewContractDetails?.gstNo,
      lessorDoorNumber: allNewContractDetails?.lessorDoorNumber,
      lessorFloorNumber: allNewContractDetails?.lessorFloorNumber,
      lessorWardNo: allNewContractDetails?.lessorWardNo,
      lessorLandMark: allNewContractDetails?.lessorLandMark,
      lessorStreet: allNewContractDetails?.lessorStreet,
      lessorArea: allNewContractDetails?.lessorArea,
      lessorCity: allNewContractDetails?.lessorCity,
      lessorLocation: allNewContractDetails?.lessorLocation,
      lessorPinCode: allNewContractDetails?.lessorPinCode,
      lessorTaluka: allNewContractDetails?.lessorTaluka,
      lessorDistrict: allNewContractDetails?.lessorDistrict,
      lessorState: allNewContractDetails?.lessorState,

      lesseeBranchType: allNewContractDetails?.lesseeBranchType,
      lesseeBranchName: allNewContractDetails?.lesseeBranchName,
      lesseeAreaName: allNewContractDetails?.lesseeAreaName,
      lesseeDivision: allNewContractDetails?.lesseeDivision,
      lesseeZone: allNewContractDetails?.lesseeZone,
      lesseeState: allNewContractDetails?.lesseeState,

      lesseeApproverrenewals: allNewContractDetails?.lesseeApproverrenewals,
      lesseeApproverRelocation: allNewContractDetails?.lesseeApproverRelocation,
      lesseeEntityDetails: allNewContractDetails?.lesseeEntityDetails,

      premesisLocation: allNewContractDetails?.premesisLocation,
      premesisDoorNumber: allNewContractDetails?.premesisDoorNumber,
      premesisFloorNumber: allNewContractDetails?.premesisFloorNumber,
      premesisWardNo: allNewContractDetails?.premesisWardNo,
      premesisLandMark: allNewContractDetails?.premesisLandMark,
      premesisStreet: allNewContractDetails?.premesisStreet,
      premesisCity: allNewContractDetails?.premesisCity,
      premesisTaluka: allNewContractDetails?.premesisTaluka,
      premesisDistrict: allNewContractDetails?.premesisDistrict,
      premesisState: allNewContractDetails?.lesseeState,
      premesisPinCode: allNewContractDetails?.premesisPinCode,
      premesisBuildingType: allNewContractDetails?.premesisBuildingType,
      northPremesis: allNewContractDetails?.northPremesis,
      southPremesis: allNewContractDetails?.southPremesis,
      eastPremesis: allNewContractDetails?.eastPremesis,
      westPremesis: allNewContractDetails?.westPremesis,
      agreementSignDate: formatDateToBackEndReqirement(
        allNewContractDetails?.agreementSignDate
      ),
      // agreementSignDate: allNewContractDetails?.agreementSignDate,
      agreementTenure: allNewContractDetails?.agreementTenure,
      agreementActivationStatus:
        allNewContractDetails?.agreementActivationStatus?.label,
      agreementStartDate: formatDateToBackEndReqirement(
        allNewContractDetails?.agreementStartDate
      ),
      // agreementStartDate: allNewContractDetails?.agreementStartDate,
      agreementEndDate: formatDateToBackEndReqirement(
        allNewContractDetails?.agreementEndDate
      ),
      // agreementEndDate: allNewContractDetails?.agreementEndDate,
      rentStartDate: formatDateToBackEndReqirement(
        allNewContractDetails?.rentStartDate
      ),
      // rentStartDate: allNewContractDetails?.rentStartDate,
      rentEndDate: formatDateToBackEndReqirement(
        allNewContractDetails?.rentEndDate
      ),
      // rentEndDate: allNewContractDetails?.rentEndDate,

      maintaineneCharge: allNewContractDetails?.maintaineneCharge,
      waterCharge: allNewContractDetails?.waterCharge,
      electricity: allNewContractDetails?.electricity,
      documentType: allNewContractDetails?.documentType,
      securityDepositAmount: allNewContractDetails?.securityDepositAmount,
      securityDepositPaymentDate:
        allNewContractDetails?.securityDepositPaymentDate,
      // securityDepositPaymentMode:
      //   allNewContractDetails?.securityDepositPaymentMode,
      securityDepositUtr: allNewContractDetails?.securityDepositUtr,
      securityDepositLockinPeriod:
        allNewContractDetails?.securityDepositLockinPeriod,
      securityDepositnoticePeriod:
        allNewContractDetails?.securityDepositnoticePeriod,
      securityDepositExitTerm: allNewContractDetails?.securityDepositExitTerm,
      standardDeducition: allNewContractDetails?.standardDeducition,

      rentAmount: allNewContractDetails?.rentAmount,
      escalation: allNewContractDetails?.escalation,
      renewalTenure: allNewContractDetails?.renewalTenure,

      lattitude: allNewContractDetails?.lattitude,
      longitude: allNewContractDetails?.longitude,
      gpsCoordinates: allNewContractDetails?.gpsCoordinates,

      firstRentDate: allNewContractDetails?.firstRentDate,
      lastRentDate: allNewContractDetails?.lastRentDate,
      plotNumber: allNewContractDetails?.plotNumber,
      builtupArea: allNewContractDetails?.builtupArea,
      renewalStatus: allNewContractDetails?.renewalStatus,
      tds: allNewContractDetails.tds,
      gst: allNewContractDetails.gst,

      glName: allNewContractDetails?.glName,
      glEmpId: allNewContractDetails?.glEmpId,
      signedDate: allNewContractDetails?.signedDate,

      monthlyRent: allNewContractDetails?.monthlyRent,
    };
    const { data, errRes } = await EditRentContractDetails(
      props.uniqueID,
      payload
    );
    if (data) {
      setIFSCCodes(Array(recipientCount).fill(""));
      setBankAndBranch(Array(recipientCount).fill({ bank: "", branch: "" }));
      props.getContractDetails();
      addToast("Rent Contract Data Edited Successfully", {
        appearance: "success",
      });
      props.close();
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
      props.close();
    }
  };

  useEffect(() => {
    if (props.type === "edit") {
      setAllNewContractDetails({
        uniqueID: props.EditLessorData?.uniqueID,
        branchID: props.EditLessorData?.branchID,
        lessorName: props.EditLessorData?.lessorName,
        lessorContactNumber: props.EditLessorData?.lessorContactNumber,
        lessorEmailAddress: props.EditLessorData?.lessorEmailAddress,
        lessorPanNumber: props.EditLessorData?.lessorPanNumber,
        lessorGstNumber: props.EditLessorData?.lessorGstNumber,
        paymentMode: props.EditLessorData?.paymentMode,
        // recipiants: props.EditLessorData?.recipiants.map(
        //   (recipient, index) => ({
        //     recipiantsID: recipient?.recipiantsID,
        //     lessorRecipiantsName: recipient?.lessorRecipiantsName,
        //     lessorIfscNumber: recipient?.lessorIfscNumber || ifscCodes?.[index],
        //     lessorBankName:
        //       recipient?.lessorBankName || bankAndBranch?.[index].bank, // Use bank name from state
        //     lessorBranchName:
        //       recipient?.lessorBranchName || bankAndBranch?.[index].branch,
        //     lessorAccountNumber: recipient?.lessorAccountNumber,
        //     lessorRentAmount: recipient?.lessorRentAmount,
        //     panNo: recipient?.panNo,
        //     gstNo: recipient?.gstNo,
        //   })
        // ),
        nationality: props.EditLessorData?.nationality,
        contractStatus: props.EditLessorData?.contractStatus,
        recipiantsID: props.EditLessorData?.recipiantsID,
        lessorRecipiantsName: props.EditLessorData?.lessorRecipiantsName,
        lessorBankName: props.EditLessorData?.lessorBankName,
        lessorIfscNumber: props.EditLessorData?.lessorIfscNumber,
        lessorBranchName: props.EditLessorData?.lessorBranchName,
        lessorAccountNumber: props.EditLessorData?.lessorAccountNumber,
        lessorRentAmount: props.EditLessorData?.lessorRentAmount,
        panNo: props.EditLessorData?.panNo,
        gstNo: props.EditLessorData?.gstNo,
        lessorDoorNumber: props.EditLessorData?.lessorDoorNumber,
        lessorFloorNumber: props.EditLessorData?.lessorFloorNumber,
        lessorWardNo: props.EditLessorData?.lessorWardNo,
        lessorLandMark: props.EditLessorData?.lessorLandMark,
        lessorStreet: props.EditLessorData?.lessorStreet,
        lessorArea: props.EditLessorData?.lessorArea,
        lessorCity: props.EditLessorData?.lessorCity,
        lessorLocation: props.EditLessorData?.lessorLocation,
        lessorPinCode: props.EditLessorData?.lessorPinCode,
        lessorTaluka: props.EditLessorData?.lessorTaluka,
        lessorDistrict: props.EditLessorData?.lessorDistrict,
        lessorState: props.EditLessorData?.lessorState,

        lesseeBranchType: props.EditLessorData?.lesseeBranchType,
        lesseeBranchName: props.EditLessorData?.lesseeBranchName,
        lesseeAreaName: props.EditLessorData?.lesseeAreaName,
        lesseeDivision: props.EditLessorData?.lesseeDivision,
        lesseeZone: props.EditLessorData?.lesseeZone,
        lesseeState: props.EditLessorData?.lesseeState,

        lesseeApproverrenewals: props.EditLessorData?.lesseeApproverrenewals,
        lesseeApproverRelocation:
          props.EditLessorData?.lesseeApproverRelocation,
        lesseeEntityDetails: props.EditLessorData?.lesseeEntityDetails,

        premesisLocation: props.EditLessorData?.premesisLocation,
        premesisDoorNumber: props.EditLessorData?.premesisDoorNumber,
        premesisFloorNumber: props.EditLessorData?.premesisFloorNumber,
        premesisWardNo: props.EditLessorData?.premesisWardNo,
        premesisLandMark: props.EditLessorData?.premesisLandMark,
        premesisStreet: props.EditLessorData?.premesisStreet,
        buildingType: props.EditLessorData?.premesisBuildingType,
        premesisCity: props.EditLessorData?.premesisCity,
        premesisTaluka: props.EditLessorData?.premesisTaluka,
        premesisDistrict: props.EditLessorData?.premesisDistrict,
        premesisState: props.EditLessorData?.lesseeState,
        premesisPinCode: props.EditLessorData?.premesisPinCode,
        premesisBuildingType: props.EditLessorData?.premesisBuildingType,
        northPremesis: props.EditLessorData?.northPremesis,
        southPremesis: props.EditLessorData?.southPremesis,
        eastPremesis: props.EditLessorData?.eastPremesis,
        westPremesis: props.EditLessorData?.westPremesis,
        // agreementSignDate: datePickerFormat(
        //   props.EditLessorData?.agreementSignDate
        // ),
        agreementSignDate: new Date(props.EditLessorData?.agreementSignDate),
        agreementTenure: props.EditLessorData?.agreementTenure,
        agreementActivationStatus:
          props.EditLessorData?.agreementActivationStatus,
        // agreementStartDate: datePickerFormat(
        //   props.EditLessorData?.agreementStartDate
        // ),
        agreementStartDate: new Date(props.EditLessorData?.agreementStartDate),
        // agreementEndDate: datePickerFormat(
        //   props.EditLessorData?.agreementEndDate
        // ),
        agreementEndDate: new Date(props.EditLessorData?.agreementEndDate),
        rentStartDate: new Date(props.EditLessorData?.rentStartDate),
        // rentStartDate: props.EditLessorData?.rentStartDate,
        // rentEndDate: datePickerFormat(props.EditLessorData?.rentEndDate),
        rentEndDate: new Date(props.EditLessorData?.rentEndDate),

        maintaineneCharge: props.EditLessorData?.maintaineneCharge,
        waterCharge: props.EditLessorData?.waterCharge,
        electricity: props.EditLessorData?.electricity,
        documentType: props.EditLessorData?.documentType,
        securityDepositAmount: props.EditLessorData?.securityDepositAmount,

        securityDepositPaymentMode:
          props.EditLessorData?.securityDepositPaymentMode,
        securityDepositUtr: props.EditLessorData?.securityDepositUtr,
        securityDepositLockinPeriod:
          props.EditLessorData?.securityDepositLockinPeriod,
        securityDepositnoticePeriod:
          props.EditLessorData?.securityDepositnoticePeriod,
        securityDepositExitTerm: props.EditLessorData?.securityDepositExitTerm,
        standardDeducition: props.EditLessorData?.standardDeducition,
        firstMonthvalue: props.EditLessorData?.firstMonthvalue,
        lastMonthvalue: props.EditLessorData?.lastMonthvalue,

        rentAmount: props.EditLessorData?.rentAmount,
        escalation: props.EditLessorData?.escalation,
        renewalTenure: props.EditLessorData?.renewalTenure,

        lattitude: props.EditLessorData?.lattitude,
        longitude: props.EditLessorData?.longitude,
        gpsCoordinates: props.EditLessorData?.gpsCoordinates,

        firstRentDate: props.EditLessorData?.firstRentDate,
        lastRentDate: props.EditLessorData?.lastRentDate,
        plotNumber: props.EditLessorData?.plotNumber,
        builtupArea: props.EditLessorData?.builtupArea,
        renewalStatus: props.EditLessorData?.renewalStatus,
        tds: props.EditLessorData?.tds,
        gst: props.EditLessorData?.gst,

        glName: props.EditLessorData?.glName,
        glEmpId: props.EditLessorData?.glEmpId,
        signedDate: props.EditLessorData?.signedDate,

        monthlyRent: props?.EditLessorData?.monthlyRent,
      });
      setIFSCCodes(Array(recipientCount).fill(""));
      setBankAndBranch(Array(recipientCount).fill({ bank: "", branch: "" }));
    }
  }, [props.EditLessorData]);

  useEffect(() => {
    if (rentContractStatus?.label === "Renewal") {
      setAllNewContractDetails({
        uniqueID: props.EditLessorRenewData?.uniqueID,
        branchID: props.EditLessorRenewData?.branchID,
        lessorName: props.EditLessorRenewData?.lessorName,
        lessorContactNumber: props.EditLessorRenewData?.lessorContactNumber,
        lessorEmailAddress: props.EditLessorRenewData?.lessorEmailAddress,
        lessorPanNumber: props.EditLessorRenewData?.lessorPanNumber,
        lessorGstNumber: props.EditLessorRenewData?.lessorGstNumber,
        paymentMode: props.EditLessorRenewData?.paymentMode,
        // recipiants: props.EditLessorRenewData?.recipiants.map(
        //   (recipient, index) => ({
        //     recipiantsID: recipient?.recipiantsID,
        //     lessorRecipiantsName: recipient?.lessorRecipiantsName,
        //     lessorIfscNumber: recipient?.lessorIfscNumber || ifscCodes?.[index],
        //     lessorBankName:
        //       recipient?.lessorBankName || bankAndBranch?.[index].bank, // Use bank name from state
        //     lessorBranchName:
        //       recipient?.lessorBranchName || bankAndBranch?.[index].branch,
        //     lessorAccountNumber: recipient?.lessorAccountNumber,
        //     lessorRentAmount: recipient?.lessorRentAmount,
        //     panNo: recipient?.panNo,
        //     gstNo: recipient?.gstNo,
        //   })
        // ),
        nationality: props.EditLessorRenewData?.nationality,
        contractStatus: props.EditLessorRenewData?.contractStatus,
        recipiantsID: props.EditLessorRenewData?.recipiantsID,
        lessorRecipiantsName: props.EditLessorRenewData?.lessorRecipiantsName,
        lessorBankName: props.EditLessorRenewData?.lessorBankName,
        lessorIfscNumber: props.EditLessorRenewData?.lessorIfscNumber,
        lessorBranchName: props.EditLessorRenewData?.lessorBranchName,
        lessorAccountNumber: props.EditLessorRenewData?.lessorAccountNumber,
        lessorRentAmount: props.EditLessorRenewData?.lessorRentAmount,
        panNo: props.EditLessorRenewData?.panNo,
        gstNo: props.EditLessorRenewData?.gstNo,
        lessorDoorNumber: props.EditLessorRenewData?.lessorDoorNumber,
        lessorFloorNumber: props.EditLessorRenewData?.lessorFloorNumber,
        lessorWardNo: props.EditLessorRenewData?.lessorWardNo,
        lessorLandMark: props.EditLessorRenewData?.lessorLandMark,
        lessorStreet: props.EditLessorRenewData?.lessorStreet,
        lessorArea: props.EditLessorRenewData?.lessorArea,
        lessorCity: props.EditLessorRenewData?.lessorCity,
        lessorLocation: props.EditLessorRenewData?.lessorLocation,
        lessorPinCode: props.EditLessorRenewData?.lessorPinCode,
        lessorTaluka: props.EditLessorRenewData?.lessorTaluka,
        lessorDistrict: props.EditLessorRenewData?.lessorDistrict,
        lessorState: props.EditLessorRenewData?.lessorState,

        lesseeBranchType: props.EditLessorRenewData?.lesseeBranchType,
        lesseeBranchName: props.EditLessorRenewData?.lesseeBranchName,
        lesseeAreaName: props.EditLessorRenewData?.lesseeAreaName,
        lesseeDivision: props.EditLessorRenewData?.lesseeDivision,
        lesseeZone: props.EditLessorRenewData?.lesseeZone,
        lesseeState: props.EditLessorRenewData?.lesseeState,

        lesseeApproverrenewals:
          props.EditLessorRenewData?.lesseeApproverrenewals,
        lesseeApproverRelocation:
          props.EditLessorRenewData?.lesseeApproverRelocation,
        lesseeEntityDetails: props.EditLessorRenewData?.lesseeEntityDetails,

        premesisLocation: props.EditLessorRenewData?.premesisLocation,
        premesisDoorNumber: props.EditLessorRenewData?.premesisDoorNumber,
        premesisFloorNumber: props.EditLessorRenewData?.premesisFloorNumber,
        premesisWardNo: props.EditLessorRenewData?.premesisWardNo,
        premesisLandMark: props.EditLessorRenewData?.premesisLandMark,
        premesisStreet: props.EditLessorRenewData?.premesisStreet,
        buildingType: props.EditLessorRenewData?.premesisBuildingType,
        premesisCity: props.EditLessorRenewData?.premesisCity,
        premesisTaluka: props.EditLessorRenewData?.premesisTaluka,
        premesisDistrict: props.EditLessorRenewData?.premesisDistrict,
        premesisState: props.EditLessorRenewData?.lesseeState,
        premesisPinCode: props.EditLessorRenewData?.premesisPinCode,
        premesisBuildingType: props.EditLessorRenewData?.premesisBuildingType,
        northPremesis: props.EditLessorRenewData?.northPremesis,
        southPremesis: props.EditLessorRenewData?.southPremesis,
        eastPremesis: props.EditLessorRenewData?.eastPremesis,
        westPremesis: props.EditLessorRenewData?.westPremesis,
        // agreementSignDate: datePickerFormat(
        //   props.EditLessorRenewData?.agreementSignDate
        // ),
        agreementSignDate: new Date(
          props.EditLessorRenewData?.agreementSignDate
        ),
        agreementTenure: props.EditLessorRenewData?.agreementTenure,
        agreementActivationStatus:
          props.EditLessorRenewData?.agreementActivationStatus,
        // agreementStartDate: datePickerFormat(
        //   props.EditLessorRenewData?.agreementStartDate
        // ),
        agreementStartDate: new Date(
          props.EditLessorRenewData?.agreementStartDate
        ),
        // agreementEndDate: datePickerFormat(
        //   props.EditLessorRenewData?.agreementEndDate
        // ),
        agreementEndDate: new Date(props.EditLessorRenewData?.agreementEndDate),
        rentStartDate: new Date(props.EditLessorRenewData?.rentStartDate),
        // rentStartDate: props.EditLessorRenewData?.rentStartDate,
        // rentEndDate: datePickerFormat(props.EditLessorRenewData?.rentEndDate),
        rentEndDate: new Date(props.EditLessorRenewData?.rentEndDate),

        maintaineneCharge: props.EditLessorRenewData?.maintaineneCharge,
        waterCharge: props.EditLessorRenewData?.waterCharge,
        electricity: props.EditLessorRenewData?.electricity,
        documentType: props.EditLessorRenewData?.documentType,
        securityDepositAmount: props.EditLessorRenewData?.securityDepositAmount,

        securityDepositPaymentMode:
          props.EditLessorRenewData?.securityDepositPaymentMode,
        securityDepositUtr: props.EditLessorRenewData?.securityDepositUtr,
        securityDepositLockinPeriod:
          props.EditLessorRenewData?.securityDepositLockinPeriod,
        securityDepositnoticePeriod:
          props.EditLessorRenewData?.securityDepositnoticePeriod,
        securityDepositExitTerm:
          props.EditLessorRenewData?.securityDepositExitTerm,
        standardDeducition: props.EditLessorRenewData?.standardDeducition,
        firstMonthvalue: props.EditLessorRenewData?.firstMonthvalue,
        lastMonthvalue: props.EditLessorRenewData?.lastMonthvalue,

        rentAmount: props.EditLessorRenewData?.rentAmount,
        escalation: props.EditLessorRenewData?.escalation,
        renewalTenure: props.EditLessorRenewData?.renewalTenure,

        lattitude: props.EditLessorRenewData?.lattitude,
        longitude: props.EditLessorRenewData?.longitude,
        gpsCoordinates: props.EditLessorRenewData?.gpsCoordinates,

        firstRentDate: props.EditLessorRenewData?.firstRentDate,
        lastRentDate: props.EditLessorRenewData?.lastRentDate,
        plotNumber: props.EditLessorRenewData?.plotNumber,
        builtupArea: props.EditLessorRenewData?.builtupArea,
        renewalStatus: props.EditLessorRenewData?.renewalStatus,
        tds: props.EditLessorRenewData?.tds,
        gst: props.EditLessorRenewData?.gst,

        glName: props.EditLessorRenewData?.glName,
        glEmpId: props.EditLessorRenewData?.glEmpId,
        signedDate: props.EditLessorRenewData?.signedDate,

        monthlyRent: props?.EditLessorRenewData?.monthlyRent,
      });
      setIFSCCodes(Array(recipientCount).fill(""));
      setBankAndBranch(Array(recipientCount).fill({ bank: "", branch: "" }));
    }
  }, [props.EditLessorRenewData]);

  useEffect(() => {
    editAllRenewRentContractDetails();
  }, [props.branchIDforDue]);

  const editAllRenewRentContractDetails = async () => {
    const { data, errRes } = await EditRentRenewContractDetails(
      props.branchIDforDue
    );
    // console.log(props.branchIDforDue, "data");
    // console.log(data, "resdata");
    if (data) {
      if (data) {
        let renewData = data?.data;
        setAllNewContractDetails(renewData);
      }
    }
  };

  const steps = [
    {
      label: (
        <Button onClick={handleClick} sx={{ fontSize: 12 }}>
          Branch Information
        </Button>
      ),
      content: (
        <LesseeInformation
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          allNewContractDetailsErr={allNewContractDetailsErr}
          onSave={handleSaveData}
          // onSave={handleSave}
          allNewContractDetails={allNewContractDetails}
          setAllNewContractDetails={setAllNewContractDetails}
          type={props.type}
          handleAddRentContractInformationError={
            handleAddRentContractInformationError
          }
          branchDetails={branchDetails}
          setBranchDetails={setBranchDetails}
        />
      ),
    },
    {
      label: (
        <Button onClick={handleClick} sx={{ fontSize: 12 }}>
          Agreement Information
        </Button>
      ),
      content: (
        <AgreementDetails
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          onSave={handleSaveData}
          close={props.close}
          allNewContractDetailsErr={allNewContractDetailsErr}
          allNewContractDetails={allNewContractDetails}
          setAllNewContractDetails={setAllNewContractDetails}
          AddAllNewRentContactInformation={AddAllNewRentContactInformation}
          type={props.type}
          handleAddRentContractInformationError={
            handleAddRentContractInformationError
          }
          ifscCodes={ifscCodes}
          setIFSCCodes={setIFSCCodes}
          bankAndBranch={bankAndBranch}
          setBankAndBranch={setBankAndBranch}
          recipientCount={recipientCount}
          setRecipientCount={setRecipientCount}
        />
      ),
    },
    {
      label: (
        <Button onClick={handleClick} sx={{ fontSize: 12 }}>
          Vendor/Owner Information
        </Button>
      ),
      content: (
        <GeneralInformation
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          onSave={handleSaveData}
          allNewContractDetails={allNewContractDetails}
          setAllNewContractDetails={setAllNewContractDetails}
          allNewContractDetailsErr={allNewContractDetailsErr}
          type={props.type}
          handleAddRentContractInformationError={
            handleAddRentContractInformationError
          }
          close={props.close}
          AddAllNewRentContactInformation={AddAllNewRentContactInformation}
          editAllNewRentContractDetails={editAllNewRentContractDetails}
          // editAllRenewRentContractDetails={editAllRenewRentContractDetails}
          EditLessorData={props.EditLessorData.uniqueID}
          contractStatus={allNewContractDetails?.contractStatus?.label}
        />
      ),
    },

    // // Add more steps as needed
  ];

  // console.log(allNewContractDetails?.contractStatus?.label, "contractStatus");
  return (
    <>
      <Modal
        show={props.show}
        // close={props.close}
        fullscreen={props.fullscreen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="w-100"
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="d-flex  align-items-end justify-content-end "
          >
            {props.type === "edit" ||
            allNewContractDetails?.contractStatus?.label === "Renewal"
              ? "Edit Rent Contract Information"
              : "Add New Rent Contract Information"}
          </Modal.Title>

          <DropDownComponent
            label="Contract Status"
            options={contractStatus}
            sx={{ width: 300, ml: 30 }}
            value={allNewContractDetails?.contractStatus}
            onChange={handleContractChange}
          />
          {rentContractStatus?.label &&
          rentContractStatus?.label === "Renewal" ? (
            <Autocomplete
              size="small"
              sx={{ width: 300, ml: 1, borderRadius: 10 }}
              // defaultValue={null}
              options={
                Array.isArray(props.branchFilter) ? props.branchFilter : []
              }
              getOptionLabel={(option) =>
                option?.label ? option?.label : option || ""
              }
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                value === "" ||
                option?.label === value?.label
              }
              value={props.branchIDforDue}
              onChange={props.handleBranchID}
              renderInput={(params) => (
                <TextField {...params} label="Branch ID" variant="outlined" />
              )}
            />
          ) : null}
        </Modal.Header>
        <Modal.Body>
          <Box className="px-2 h-100 w-100" sx={{ position: "sticky" }}>
            {rentContractStatus?.label &&
            rentContractStatus?.label === "New/Relocate" ? (
              <Box
                className="w-20 h-100 rounded d-flex px-0 py-0"
                sx={{ border: "1px solid #70B3D1" }}
              >
                <Box
                  className="w-30 h-100 py-0 px-"
                  sx={{
                    borderRight: "1px solid #70B3D1",
                  }}
                >
                  <StepperComponent
                    steps={steps}
                    setStep={setActiveStep}
                    activeStep={activeStep}
                    onStepperClick={(ind) => {
                      setActiveStep(ind);
                    }}
                  />
                </Box>

                <Box className="w-100 d-flex flex-column ">
                  <Box sx={{ height: "100%" }}>
                    {steps[activeStep]?.content}
                  </Box>
                </Box>
              </Box>
            ) : null}

            {props.branchIDforDue ? (
              <Box
                className="w-20 h-100 rounded d-flex px-0 py-0"
                sx={{ border: "1px solid #70B3D1" }}
              >
                <Box
                  className="w-30 h-100 py-0 px-"
                  sx={{
                    borderRight: "1px solid #70B3D1",
                  }}
                >
                  <StepperComponent
                    steps={steps}
                    setStep={setActiveStep}
                    activeStep={activeStep}
                    onStepperClick={(ind) => {
                      setActiveStep(ind);
                    }}
                  />
                </Box>

                <Box className="w-100 d-flex flex-column ">
                  <Box sx={{ height: "100%" }}>
                    {steps[activeStep]?.content}
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
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

export default MasterDetails;
