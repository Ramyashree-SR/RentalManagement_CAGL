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
import { EditRentContractDetails } from "../../services/EditContractApi";
import {
  datePickerFormat,
  formatDateToBackEndReqirement,
} from "../../CommonFunction/CommonFunction";
import { useToasts } from "react-toast-notifications";
import DropDownComponent from "../../atoms/DropDownComponent";
import { getBranchID } from "../../services/RentContractsApi";

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
  rentAmount: "",
  escalation: "",
  renewalTenure: "",
  lattitude: "",
  longitude: "",
  gpsCoordinates: "",
  tds: "",
  gst: "",
  firstRentDate: "",
  lastRentDate: "",
  plotNumber: "",
  builtupArea: "",
  renewalStatus: "",
  glName: "",
  glEmpId: "",
  signedDate: "",
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
    // uniqueID: "",
    lessorName: "",
    lessorContactNumber: "",
    lessorEmailAddress: "",
    lessorPanNumber: "",
    lessorGstNumber: "",
    lessorTdsNumber: "",
    paymentMode: { label: "" },
    lessorElectricityBillNumber: "",
    lessorTaxNumber: "",
    lessorBankPassBookNumber: "",
    lessorCheuque: "",
    recipiants: [
      {
        recipiantsID: "",
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
    rentAmount: "",
    escalation: "",
    renewalTenure: "",
    lattitude: "",
    longitude: "",
    gpsCoordinates: "",
    tds: "",
    gst: "",
    firstRentDate: "",
    lastRentDate: "",
    plotNumber: "",
    builtupArea: "",
    renewalStatus: "",
    glName: "",
    glEmpId: "",
    signedDate: "",
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
      // uniqueID: "",
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
      branchID: "",
      lesseeBranchName: "",
      lesseeAreaName: "",
      lesseeDivision: "",
      lesseeZone: "",
      lesseeState: "",
      lesseeBranchType: "",
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
      agreementSignDate: "",
      agreementTenure: "",
      agreementActivationStatus: "",
      agreementStartDate: "",
      agreementEndDate: "",
      rentStartDate: "",
      rentEndDate: "",
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
      rentAmount: "",
      escalation: "",
      renewalTenure: "",
      lattitude: "",
      longitude: "",
      gpsCoordinates: "",
      firstRentDate: "",
      lastRentDate: "",
      plotNumber: "",
      builtupArea: "",
      renewalStatus: "",
      tds: "",
      gst: "",
      glName: "",
      glEmpId: "",
      signedDate: "",
    };
    setAllNewContractDetailsErr(errObj);
  }, []);

  const handleAddRentContractInformationError = () => {
    let errorInForm = false;
    let errObj = {
      // uniqueID: "",
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
      branchID: "",
      lesseeBranchName: "",
      lesseeAreaName: "",
      lesseeDivision: "",
      lesseeZone: "",
      lesseeState: "",
      lesseeBranchType: "",
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
      agreementSignDate: "",
      agreementTenure: "",
      agreementActivationStatus: "",
      agreementStartDate: "",
      agreementEndDate: "",
      rentStartDate: "",
      rentEndDate: "",
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
      rentAmount: "",
      escalation: "",
      renewalTenure: "",
      lattitude: "",
      longitude: "",
      gpsCoordinates: "",
      tds: "",
      gst: "",
      glName: "",
      glEmpId: "",
      signedDate: "",
    };
    if (allNewContractDetails.lesseeBranchName === "") {
      errObj.lesseeBranchName = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lesseeBranchName)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lesseeBranchName = "*Invalid  Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lesseeBranchName = "";
    }

    if (allNewContractDetails.lesseeAreaName === "") {
      errObj.lesseeAreaName = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lesseeAreaName)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lesseeAreaName = "*Invalid  Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lesseeAreaName = "";
    }
    if (allNewContractDetails.lesseeDivision === "") {
      errObj.lesseeDivision = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lesseeDivision)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lesseeDivision = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lesseeDivision = "";
    }
    if (allNewContractDetails.lesseeZone === "") {
      errObj.lesseeZone = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lesseeZone)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lesseeZone = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lesseeZone = "";
    }
    if (allNewContractDetails.lesseeState === "") {
      errObj.lesseeState = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lesseeState)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lesseeState = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lesseeState = "";
    }
    if (allNewContractDetails.premesisDoorNumber === "") {
      errObj.premesisDoorNumber = "*This field is required";
      errorInForm = true;
    } else if (
      !nameWithSpacesAndNumbers.test(allNewContractDetails.premesisDoorNumber)
    ) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.premesisDoorNumber = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.premesisDoorNumber = "";
    }
    if (allNewContractDetails.premesisFloorNumber === "") {
      errObj.premesisFloorNumber = "*This field is required";
      errorInForm = true;
    } else if (
      !nameWithSpacesAndNumbers.test(allNewContractDetails.premesisFloorNumber)
    ) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.premesisFloorNumber = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.premesisFloorNumber = "";
    }
    if (allNewContractDetails.premesisLandMark === "") {
      errObj.premesisLandMark = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.premesisLandMark)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.premesisLandMark = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.premesisLandMark = "";
    }
    if (allNewContractDetails.premesisLandMark === "") {
      errObj.premesisLandMark = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.premesisLandMark)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.premesisLandMark = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.premesisLandMark = "";
    }
    if (allNewContractDetails.premesisPinCode === "") {
      errObj.premesisPinCode = "*This field is required";
      errorInForm = true;
    } else if (!pincodeRegex.test(allNewContractDetails.premesisPinCode)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.premesisPinCode = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.premesisPinCode = "";
    }
    if (allNewContractDetails.premesisCity === "") {
      errObj.premesisCity = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.premesisCity)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.premesisCity = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.premesisCity = "";
    }
    if (allNewContractDetails.premesisState === "") {
      errObj.premesisState = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.premesisState)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.premesisState = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.premesisState = "";
    }
    if (allNewContractDetails.premesisDistrict === "") {
      errObj.premesisDistrict = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.premesisDistrict)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.premesisDistrict = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.premesisDistrict = "";
    }

    if (allNewContractDetails.plotNumber === "") {
      errObj.plotNumber = "*This field is required";
      errorInForm = true;
    } else if (!numbersRegex.test(allNewContractDetails.plotNumber)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.plotNumber = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.plotNumber = "";
    }
    if (allNewContractDetails.builtupArea === "") {
      errObj.builtupArea = "*This field is required";
      errorInForm = true;
    } else if (!numbersRegex.test(allNewContractDetails.builtupArea)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.builtupArea = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.builtupArea = "";
    }
    if (allNewContractDetails.northPremesis === "") {
      errObj.northPremesis = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.northPremesis)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.northPremesis = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.northPremesis = "";
    }
    if (allNewContractDetails.southPremesis === "") {
      errObj.southPremesis = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.southPremesis)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.southPremesis = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.southPremesis = "";
    }
    if (allNewContractDetails.eastPremesis === "") {
      errObj.eastPremesis = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.eastPremesis)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.eastPremesis = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.eastPremesis = "";
    }
    if (allNewContractDetails.westPremesis === "") {
      errObj.westPremesis = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.westPremesis)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.westPremesis = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.westPremesis = "";
    }
    if (allNewContractDetails.lattitude === "") {
      errObj.lattitude = "*This field is required";
      errorInForm = true;
    } else if (
      !numbersWithSpecialChatracters.test(allNewContractDetails.lattitude)
    ) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lattitude = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lattitude = "";
    }

    if (allNewContractDetails.longitude === "") {
      errObj.longitude = "*This field is required";
      errorInForm = true;
    } else if (
      !numbersWithSpecialChatracters.test(allNewContractDetails.longitude)
    ) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.longitude = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.longitude = "";
    }
    if (allNewContractDetails.gpsCoordinates === "") {
      errObj.gpsCoordinates = "*This field is required";
      errorInForm = true;
    } else if (
      !numbersWithSpecialChatractersAndSeparated.test(
        allNewContractDetails.gpsCoordinates
      )
    ) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.gpsCoordinates = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.gpsCoordinates = "";
    }
    if (allNewContractDetails.glName === "") {
      errObj.glName = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.glName)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.glName = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.glName = "";
    }

    if (allNewContractDetails.glEmpId === "") {
      errObj.glEmpId = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpacesAndNumbers.test(allNewContractDetails.glEmpId)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.glEmpId = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.glEmpId = "";
    }

    if (allNewContractDetails.agreementTenure === "") {
      errObj.agreementTenure = "*This field is required";
      errorInForm = true;
    } else if (!numbersRegex.test(allNewContractDetails.agreementTenure)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.agreementTenure = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.agreementTenure = "";
    }
    if (allNewContractDetails.lessorEmailAddress === "") {
      errObj.lessorEmailAddress = "*This field is required";
      errorInForm = true;
    } else if (!emailRegex.test(allNewContractDetails.lessorEmailAddress)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorEmailAddress = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorEmailAddress = "";
    }
    if (allNewContractDetails.lessorFloorNumber === "") {
      errObj.lessorFloorNumber = "*This field is required";
      errorInForm = true;
    } else if (
      !nameWithSpacesAndNumbers.test(allNewContractDetails.lessorFloorNumber)
    ) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorFloorNumber = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorFloorNumber = "";
    }
    if (allNewContractDetails.lessorRecipiantsName === "") {
      errObj.lessorRecipiantsName = "*This field is required";
      errorInForm = true;
    } else if (
      !nameWithSpaces.test(allNewContractDetails.lessorRecipiantsName)
    ) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorRecipiantsName = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorRecipiantsName = "";
    }
    if (allNewContractDetails.lessorRentAmount === "") {
      errObj.lessorRentAmount = "*This field is required";
      errorInForm = true;
    } else if (!numbersRegex.test(allNewContractDetails.lessorRentAmount)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorRentAmount = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorRentAmount = "";
    }
    if (allNewContractDetails.lessorAccountNumber === "") {
      errObj.lessorAccountNumber = "*This field is required";
      errorInForm = true;
    } else if (!numbersRegex.test(allNewContractDetails.lessorAccountNumber)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorAccountNumber = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.longitude = "";
    }
    if (allNewContractDetails.lessorBankName === "") {
      errObj.lessorBankName = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorBankName)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorBankName = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorBankName = "";
    }
    if (allNewContractDetails.lessorBranchName === "") {
      errObj.lessorBranchName = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorBranchName)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorBranchName = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorBranchName = "";
    }
    if (allNewContractDetails.lessorGstNumber === "") {
      errObj.lessorGstNumber = "*This field is required";
      errorInForm = true;
    } else if (!gstRegex.test(allNewContractDetails.lessorGstNumber)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorGstNumber = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorGstNumber = "";
    }
    if (allNewContractDetails.lessorPanNumber === "") {
      errObj.lessorPanNumber = "*This field is required";
      errorInForm = true;
    } else if (!panCardRegex.test(allNewContractDetails.lessorPanNumber)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorPanNumber = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorPanNumber = "";
    }
    if (allNewContractDetails.lessorName === "") {
      errObj.lessorName = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorName)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorName = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorName = "";
    }
    if (allNewContractDetails.lessorDoorNumber === "") {
      errObj.lessorDoorNumber = "*This field is required";
      errorInForm = true;
    } else if (
      !nameWithSpacesAndNumbers.test(allNewContractDetails.lessorDoorNumber)
    ) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorDoorNumber = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorDoorNumber = "";
    }
    if (allNewContractDetails.lessorFloorNumber === "") {
      errObj.lessorFloorNumber = "*This field is required";
      errorInForm = true;
    } else if (
      !nameWithSpacesAndNumbers.test(allNewContractDetails.lessorFloorNumber)
    ) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorFloorNumber = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorFloorNumber = "";
    }
    if (allNewContractDetails.lessorCity === "") {
      errObj.lessorCity = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorCity)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorCity = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorCity = "";
    }
    if (allNewContractDetails.lessorArea === "") {
      errObj.lessorArea = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorArea)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorArea = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorArea = "";
    }
    if (allNewContractDetails.lessorLandMark === "") {
      errObj.lessorLandMark = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorLandMark)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorLandMark = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorLandMark = "";
    }

    if (allNewContractDetails.lessorLocation === "") {
      errObj.lessorLocation = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorLocation)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorLocation = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorLocation = "";
    }

    if (allNewContractDetails.lessorPinCode === "") {
      errObj.lessorPinCode = "*This field is required";
      errorInForm = true;
    } else if (!pincodeRegex.test(allNewContractDetails.lessorPinCode)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorPinCode = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorPinCode = "";
    }

    if (allNewContractDetails.lessorWardNo === "") {
      errObj.lessorWardNo = "*This field is required";
      errorInForm = true;
    } else if (!numbersRegex.test(allNewContractDetails.lessorWardNo)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorWardNo = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorWardNo = "";
    }

    if (allNewContractDetails.lessorDistrict === "") {
      errObj.lessorDistrict = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorDistrict)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorDistrict = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorDistrict = "";
    }

    if (allNewContractDetails.lessorStreet === "") {
      errObj.lessorStreet = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorStreet)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorStreet = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorStreet = "";
    }

    if (allNewContractDetails.lessorState === "") {
      errObj.lessorState = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorState)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorState = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorState = "";
    }
    if (allNewContractDetails.lessorTaluka === "") {
      errObj.lessorTaluka = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorTaluka)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorTaluka = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorTaluka = "";
    }
    if (allNewContractDetails.lessorDistrict === "") {
      errObj.lessorDistrict = "*This field is required";
      errorInForm = true;
    } else if (!nameWithSpaces.test(allNewContractDetails.lessorDistrict)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorDistrict = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorDistrict = "";
    }

    if (allNewContractDetails.lessorContract === "") {
      errObj.lessorContract = "*This field is required";
      errorInForm = true;
    } else if (!mobileRegex.test(allNewContractDetails.lessorContract)) {
      // Check if the name contains only valid characters (spaces included)
      errorInForm = true;
      errObj.lessorContract = "*Invalid Name";
    } else {
      // Reset the error message if the field is valid
      errObj.lessorContract = "";
    }

    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(allNewContractDetails)?.some(
      (value) => value === ""
    );

    if (isAnyFieldEmpty) {
      addToast("Please fill in all the fields", {
        appearance: "error",
      });
      return true;
    }
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
    // Uncommented code for validation and moving to the next step
    // const validateFields = await handleAddRentContractInformationError();
    // if (!validateFields) {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }
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
      lessorDoorNumber: allNewContractDetails?.lessorDoorNumber,
      lessorFloorNumber: allNewContractDetails?.lessorFloorNumber,
      lessorWardNo: allNewContractDetails?.lessorWardNo,
      lessorLandMark: allNewContractDetails?.lessorLandMark,
      lessorStreet: allNewContractDetails?.lessorStreet,
      // lessorArea: allNewContractDetails?.lessorArea,
      lessorCity: allNewContractDetails?.lessorCity,
      // lessorLocation: allNewContractDetails?.lessorLocation,
      lessorPinCode: allNewContractDetails?.lessorPinCode,
      lessorTaluka: allNewContractDetails?.lessorTaluka,
      lessorDistrict: allNewContractDetails?.lessorDistrict,
      lessorState: allNewContractDetails?.lessorState,

      lesseeBranchType: allNewContractDetails?.lesseeBranchType?.label,
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
        lessorElectricityBillNumber: "",
        lessorTaxNumber: "",
        lessorBankPassBookNumber: "",
        lessorCheuque: "",
        recipiants: [
          {
            recipiantsID: "",
            lessorRecipiantsName: "",
            lessorIfscNumber: "",
            lessorBankName: "",
            lessorBranchName: "",
            lessorAccountNumber: "",
            lessorRentAmount: "",
            panNo: "",
            gstNo: "",
          },
        ],
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
        agreementSignDate: "",
        agreementTenure: "",
        agreementActivationStatus: "",
        agreementStartDate: "",
        agreementEndDate: "",
        rentStartDate: "",
        rentEndDate: "",
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
        rentAmount: "",
        escalation: "",
        renewalTenure: "",
        lattitude: "",
        longitude: "",
        gpsCoordinates: "",
        tds: "",
        gst: "",
        firstRentDate: "",
        lastRentDate: "",
        plotNumber: "",
        builtupArea: "",
        renewalStatus: "",
        glName: "",
        glEmpId: "",
        signedDate: "",
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
      recipiants: allNewContractDetails.recipiants.map((recipient, index) => ({
        recipiantsID: recipient?.recipiantsID,
        lessorRecipiantsName: recipient?.lessorRecipiantsName,
        lessorIfscNumber: recipient?.lessorIfscNumber || ifscCodes?.[index],
        lessorBankName:
          recipient?.lessorBankName || bankAndBranch?.[index].bank, // Use bank name from state
        lessorBranchName:
          recipient?.lessorBranchName || bankAndBranch?.[index].branch,
        lessorAccountNumber: recipient?.lessorAccountNumber,
        lessorRentAmount: recipient?.lessorRentAmount,
        panNo: recipient?.panNo,
        gstNo: recipient?.gstNo,
      })),
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
      rentAmount: allNewContractDetails?.rentAmount,
      securityDepositLockinPeriod:
        allNewContractDetails?.securityDepositLockinPeriod,
      securityDepositnoticePeriod:
        allNewContractDetails?.securityDepositnoticePeriod,
      securityDepositExitTerm: allNewContractDetails?.securityDepositExitTerm,
      standardDeducition: allNewContractDetails?.standardDeducition,
      firstMonthvalue: allNewContractDetails?.firstMonthvalue,
      lastMonthvalue: allNewContractDetails?.lastMonthvalue,

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
    };
    const { data, errRes } = await EditRentContractDetails(
      props.uniqueID,
      payload
    );
    if (data) {
      // setBranchDetails({
      //   branchID: allNewContractDetails?.branchID,
      //   branchName: allNewContractDetails?.lesseeBranchName,
      //   areaName: allNewContractDetails?.lesseeAreaName,
      //   region: allNewContractDetails?.lesseeDivision,
      //   zone: allNewContractDetails?.lesseeZone,
      //   state: allNewContractDetails?.lesseeState,
      //   // ... other fields
      // });

      // setAllNewContractDetails({
      //   lessorName: "",
      //   lessorContactNumber: "",
      //   lessorEmailAddress: "",
      //   lessorPanNumber: "",
      //   lessorGstNumber: "",
      //   lessorTdsNumber: "",
      //   paymentMode: "",
      //   lessorElectricityBillNumber: "",
      //   lessorTaxNumber: "",
      //   lessorBankPassBookNumber: "",
      //   lessorCheuque: "",
      //   recipiants: [
      //     {
      //       recipiantsID: "",
      //       lessorRecipiantsName: "",
      //       lessorIfscNumber: "",
      //       lessorBankName: "",
      //       lessorBranchName: "",
      //       lessorAccountNumber: "",
      //       lessorRentAmount: "",
      //       panNo: "",
      //       gstNo: "",
      //     },
      //   ],
      //   lessorDoorNumber: "",
      //   lessorFloorNumber: "",
      //   lessorLandMark: "",
      //   lessorStreet: "",
      //   lessorWardNo: "",
      //   lessorArea: "",
      //   lessorCity: "",
      //   lessorLocation: "",
      //   lessorPinCode: "",
      //   lessorTaluka: "",
      //   lessorDistrict: "",
      //   lessorState: "",

      //   lesseeBranchType: "",
      //   branchID: "",
      //   lesseeBranchName: "",
      //   lesseeAreaName: "",
      //   lesseeDivision: "",
      //   lesseeZone: "",
      //   lesseeState: "",

      //   lesseeApproverrenewals: "",
      //   lesseeApproverRelocation: "",
      //   lesseeEntityDetails: "",
      //   premesisLocation: "",
      //   premesisDoorNumber: "",
      //   premesisFloorNumber: "",
      //   premesisWardNo: "",
      //   premesisLandMark: "",
      //   premesisStreet: "",
      //   premesisCity: "",
      //   premesisPinCode: "",
      //   premesisTaluka: "",
      //   premesisDistrict: "",
      //   northPremesis: "",
      //   southPremesis: "",
      //   eastPremesis: "",
      //   westPremesis: "",
      //   premesisState: "",
      //   premesisBuildingType: "",
      //   agreementSignDate: "",
      //   agreementTenure: "",
      //   agreementActivationStatus: "",
      //   agreementStartDate: "",
      //   agreementEndDate: "",
      //   rentStartDate: "",
      //   rentEndDate: "",
      //   agreementRefreshStartDate: "",
      //   agreementRefreshEndDate: "",
      //   maintaineneCharge: "",
      //   waterCharge: "",
      //   electricity: "",
      //   documentType: "",
      //   documentPath: "",
      //   securityDepositAmount: "",
      //   securityDepositPaymentDate: "",
      //   securityDepositPaymentMode: "",
      //   securityDepositUtr: "",
      //   securityDepositLockinPeriod: "",
      //   securityDepositnoticePeriod: "",
      //   securityDepositExitTerm: "",
      //   standardDeducition: "",
      //   firstMonthvalue: "",
      //   lastMonthvalue: "",
      //   rentAmount: "",
      //   escalation: "",
      //   renewalTenure: "",
      //   lattitude: "",
      //   longitude: "",
      //   gpsCoordinates: "",
      //   tds: "",
      //   gst: "",
      //   firstRentDate: "",
      //   lastRentDate: "",
      //   plotNumber: "",
      //   builtupArea: "",
      //   renewalStatus: "",
      //   glName: "",
      //   glEmpId: "",
      //   signedDate: "",
      // });
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
        recipiants: props.EditLessorData?.recipiants.map(
          (recipient, index) => ({
            recipiantsID: recipient?.recipiantsID,
            lessorRecipiantsName: recipient?.lessorRecipiantsName,
            lessorIfscNumber: recipient?.lessorIfscNumber || ifscCodes?.[index],
            lessorBankName:
              recipient?.lessorBankName || bankAndBranch?.[index].bank, // Use bank name from state
            lessorBranchName:
              recipient?.lessorBranchName || bankAndBranch?.[index].branch,
            lessorAccountNumber: recipient?.lessorAccountNumber,
            lessorRentAmount: recipient?.lessorRentAmount,
            panNo: recipient?.panNo,
            gstNo: recipient?.gstNo,
          })
        ),

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
        // district: props.EditLessorData?.premesisDistrict,
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
        rentAmount: props.EditLessorData?.rentAmount,

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
      });
      setIFSCCodes(Array(recipientCount).fill(""));
      setBankAndBranch(Array(recipientCount).fill({ bank: "", branch: "" }));
    }
  }, [props.EditLessorData]);

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
          EditLessorData={props.EditLessorData.uniqueID}
        />
      ),
    },
    // {
    //   label: (
    //     <Button onClick={handleClick} sx={{ fontSize: 12 }}>
    //       Branch Information
    //     </Button>
    //   ),
    //   content: (
    //     <LesseeInformation
    //       setActiveStep={setActiveStep}
    //       activeStep={activeStep}
    //       allNewContractDetailsErr={allNewContractDetailsErr}
    //       onSave={handleSaveData}
    //       // onSave={handleSave}
    //       allNewContractDetails={allNewContractDetails}
    //       setAllNewContractDetails={setAllNewContractDetails}
    //       type={props.type}
    //       handleAddRentContractInformationError={
    //         handleAddRentContractInformationError
    //       }
    //     />
    //   ),
    // },
    // {
    //   label: (
    //     <Button onClick={handleClick} sx={{ fontSize: 12 }}>
    //       Premises Information
    //     </Button>
    //   ),
    //   content: (
    //     <PremisesInformation
    //       setActiveStep={setActiveStep}
    //       activeStep={activeStep}
    //       allNewContractDetailsErr={allNewContractDetailsErr}
    //       onSave={handleSaveData}
    //       // onSave={handleSave}
    //       allNewContractDetails={allNewContractDetails}
    //       setAllNewContractDetails={setAllNewContractDetails}
    //       type={props.type}
    //       handleAddRentContractInformationError={
    //         handleAddRentContractInformationError
    //       }
    //     />
    //   ),
    // },
    // {
    //   label: (
    //     <Button onClick={handleClick} sx={{ fontSize: 12 }}>
    //       Agreement Information
    //     </Button>
    //   ),
    //   content: (
    //     <AgreementDetails
    //       setActiveStep={setActiveStep}
    //       activeStep={activeStep}
    //       onSave={handleSaveData}
    //       close={props.close}
    //       allNewContractDetailsErr={allNewContractDetailsErr}
    //       allNewContractDetails={allNewContractDetails}
    //       setAllNewContractDetails={setAllNewContractDetails}
    //       AddAllNewRentContactInformation={AddAllNewRentContactInformation}
    //       type={props.type}
    //       editAllNewRentContractDetails={editAllNewRentContractDetails}
    //       EditLessorData={props.EditLessorData.uniqueID}
    //       handleAddRentContractInformationError={
    //         handleAddRentContractInformationError
    //       }
    //     />
    //   ),
    // },
    // {
    //   label: (
    //     <Button onClick={handleClick} sx={{ fontSize: 12 }}>
    //       Rent Terms Information
    //     </Button>
    //   ),
    //   content: (
    //     <RentTermsDetails
    //       setActiveStep={setActiveStep}
    //       activeStep={activeStep}
    //       onSave={handleSaveData}
    //       // onSave={handleSave}
    //       allNewContractDetails={allNewContractDetails}
    //       setAllNewContractDetails={setAllNewContractDetails}
    //       type={props.type}
    //       allNewContractDetailsErr={allNewContractDetailsErr}
    //       handleAddRentContractInformationError={
    //         handleAddRentContractInformationError
    //       }
    //     />
    //   ),
    // },
    // {
    //   label: (
    //     <Button onClick={handleClick} sx={{ fontSize: 12 }}>
    //       GPS Co-ordinate Information
    //     </Button>
    //   ),
    //   content: (
    //     <GPSInformation
    //       setActiveStep={setActiveStep}
    //       activeStep={activeStep}
    //       onSave={handleSaveData}
    //       close={props.close}
    //       allNewContractDetailsErr={allNewContractDetailsErr}
    //       allNewContractDetails={allNewContractDetails}
    //       setAllNewContractDetails={setAllNewContractDetails}
    //       AddAllNewRentContactInformation={AddAllNewRentContactInformation}
    //       type={props.type}
    //       editAllNewRentContractDetails={editAllNewRentContractDetails}
    //       EditLessorData={props.EditLessorData.uniqueID}
    //       handleAddRentContractInformationError={
    //         handleAddRentContractInformationError
    //       }
    //     />
    //   ),
    // },
    // // Add more steps as needed
  ];
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
  };

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
            {props.type === "edit"
              ? "Edit New Rent Contract Information"
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
          {/* <Box>
            <Button
              disabled={activeStep && activeStep === 0}
              onClick={handleBack}
              variant="contained"
              sx={{ m: 1 }}
            >
              Back
            </Button>
            <Button
              disabled={activeStep && activeStep === 0}
              onClick={() => handleSaveData(null)}
              variant="contained"
              sx={{ m: 1, background: "#238520" }}
            >
              {activeStep === 5 ? "Finish" : "Next"}
            </Button>
          </Box> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MasterDetails;

//overflowY: "scroll"

// useEffect(() => {
//   setAllNewContractDetails({
//     uniqueID: props.EditLessorData?.uniqueID,
//     branchID: props.EditLessorData?.branchID,
//     lessorName: props.EditLessorData?.lessorName,
//     lessorContactNumber: props.EditLessorData?.lessorContactNumber,
//     lessorEmailAddress: props.EditLessorData?.lessorEmailAddress,
//     lessorPanNumber: props.EditLessorData?.lessorPanNumber,
//     lessorGstNumber: props.EditLessorData?.lessorGstNumber,
//     lessorTdsNumber: props.EditLessorData?.lessorTdsNumber,
//     paymentMode: props.EditLessorData?.paymentMode,
//     // recipiants: [
//     //   {
//     //     lessorRecipiantsName: props.EditLessorData?.lessorRecipiantsName,
//     //     lessorBankName: props.EditLessorData?.lessorBankName,
//     //     lessorBranchName: props.EditLessorData?.lessorBranchName,
//     //     lessorIfscNumber: props.EditLessorData?.lessorIfscNumber,
//     //     lessorAccountNumber: props.EditLessorData?.lessorAccountNumber,
//     //   },
//     // ],
//     lessorElectricityBillNumber:
//       props.EditLessorData?.lessorElectricityBillNumber,
//     lessorTaxNumber: props.EditLessorData?.lessorTaxNumber,
//     lessorBankPassBookNumber: props.EditLessorData?.lessorBankPassBookNumber,
//     lessorCheuque: props.EditLessorData?.lessorCheuque,
//     lessorDoorNumber: props.EditLessorData?.lessorDoorNumber,
//     lessorFloorNumber: props.EditLessorData?.lessorFloorNumber,
//     lessorWardNo: props.EditLessorData?.lessorWardNo,
//     lessorLandMark: props.EditLessorData?.lessorLandMark,
//     lessorStreet: props.EditLessorData?.lessorStreet,
//     lessorArea: props.EditLessorData?.lessorArea,
//     lessorCity: props.EditLessorData?.lessorCity,
//     lessorLocation: props.EditLessorData?.lessorLocation,
//     lessorPinCode: props.EditLessorData?.lessorPinCode,
//     lessorTaluka: props.EditLessorData?.lessorTaluka,
//     lessorDistrict: props.EditLessorData?.lessorDistrict,
//     lessorState: props.EditLessorData?.lessorState,

//     lesseebranchName: props.EditLessorData?.lesseeBranchName,
//     lesseeAreaName: props.EditLessorData?.lesseeAreaName,
//     lesseeDivision: props.EditLessorData?.lesseeDivision,
//     lesseeZone: props.EditLessorData?.lesseeZone,
//     lesseeState: props.EditLessorData?.lesseeState,
//     lesseeBranchType: props.EditLessorData?.lesseeBranchType,
//     approverRenewal: props.EditLessorData?.lesseeApproverrenewals,
//     approverRelocation: props.EditLessorData?.lesseeApproverRelocation,
//     enitityDetails: props.EditLessorData?.lesseeEntityDetails,

//     location: props.EditLessorData?.premesisLocation,
//     branchName: props.EditLessorData?.premesisBranchName,
//     areaName: props.EditLessorData?.premesisAreaName,
//     division: props.EditLessorData?.premesisDivision,
//     zone: props.EditLessorData?.premesisZone,
//     state: props.EditLessorData?.premesisState,
//     buildingType: props.EditLessorData?.premesisBuildingType,
//     doorNo: props.EditLessorData?.premesisDoorNumber,
//     floorNo: props.EditLessorData?.premesisFloorNumber,
//     landMark: props.EditLessorData?.premesisLandMark,
//     roadName: props.EditLessorData?.premesisStreet,
//     wardName: props.EditLessorData?.premesisWardNo,
//     city: props.EditLessorData?.premesisCity,
//     pincode: props.EditLessorData?.premesisPinCode,
//     taluk: props.EditLessorData?.premesisTaluka,
//     district: props.EditLessorData?.premesisDistrict,

//     // agreementSignDate: moment(
//     //   new Date(props.EditLessorData?.agreementSignDate)
//     // ).format("YYYY-MM-DD"),
//     tenurePeriod: props.EditLessorData?.agreementTenure,
//     activationStatus: props.EditLessorData?.agreementActivationStatus,
//     agreementStartDate: props.EditLessorData?.agreementStartDate,
//     agreementEndDate: props.EditLessorData?.agreementEndDate,
//     rentStarttDate: props.EditLessorData?.rentStartDate,
//     rentEndDate: props.EditLessorData?.rentEndDate,
//     refreshStartDate: props.EditLessorData?.agreementRefreshStartDate,
//     refreshEndDate: props.EditLessorData?.agreementRefreshEndDate,
//     maintainenceCharges: props.EditLessorData?.maintaineneCharge,
//     waterCharges: props.EditLessorData?.waterCharge,
//     electricityCharges: props.EditLessorData?.electricity,
//     documentType: props.EditLessorData?.documentType,
//     paymentDate: props.EditLessorData?.securityDepositPaymentDate,
//     agreementpaymentMode: props.EditLessorData?.securityDepositPaymentMode,
//     securityDepositAmount: props.EditLessorData?.securityDepositAmount,
//     monthlyRent: props.EditLessorData?.securityDepositUtr,
//     firstMonthValue: props.EditLessorData?.firstMonthvalue,
//     lastMonthValue: props.EditLessorData?.lastMonthvalue,
//     utrDetails: props.EditLessorData?.securityDepositUtr,
//     lockinPeriod: props.EditLessorData?.securityDepositLockinPeriod,
//     noticePeriod: props.EditLessorData?.securityDepositnoticePeriod,
//     exitterms: props.EditLessorData?.securityDepositExitTerm,

//     rentAmount: props.EditLessorData?.rentAmount,
//     escalation: props.EditLessorData?.escalation,
//     renewalTenure: props.EditLessorData?.renewalTenure,

//     lattitude: props.EditLessorData?.lattitude,
//     longitude: props.EditLessorData?.longitude,
//     coordinates: props.EditLessorData?.gpsCoordinates,
//   });
// }, [props.EditLessorData]);

// const getEditDetails = async () => {
//   const { data } = await getAllRentContractDetails(props.editLessorData);
//   // console.log(data?.data, "dtaa");
//   if (data) {
//     if (data) {
//       const sendData = data?.data;
//       setAllNewContractDetails({
//         ...sendData,
//       });
//     }
//   }
// };

// if (allNewContractDetails.agreementSignDate === "") {
//   errorInForm = true;
//   errObj.agreementSignDate = "*This field is required";
// }
// if (allNewContractDetails.agreementTenure === "") {
//   errorInForm = true;
//   errObj.agreementTenure = "*This field is required";
// }
// if (allNewContractDetails.agreementStartDate === "") {
//   errorInForm = true;
//   errObj.agreementStartDate = "*This field is required";
// }
// if (allNewContractDetails.agreementActivationStatus === "") {
//   errorInForm = true;
//   errObj.agreementActivationStatus = "*This field is required";
// }
// if (allNewContractDetails.agreementStartDate === "") {
//   errorInForm = true;
//   errObj.agreementStartDate = "*This field is required";
// }
// if (allNewContractDetails.agreementEndDate === "") {
//   errorInForm = true;
//   errObj.agreementEndDate = "*This field is required";
// }
// if (allNewContractDetails.rentStartDate === "") {
//   errorInForm = true;
//   errObj.rentStartDate = "*This field is required";
// }
// if (allNewContractDetails.rentEndDate === "") {
//   errorInForm = true;
//   errObj.rentEndDate = "*This field is required";
// }
// if (allNewContractDetails.maintaineneCharge === "") {
//   errorInForm = true;
//   errObj.maintaineneCharge = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.maintaineneCharge) &&
//   allNewContractDetails.maintaineneCharge !== "") {
//   errorInForm = true;
//   errObj.maintaineneCharge = "*Invalid Charges";
// }

// if (allNewContractDetails.waterCharge === "") {
//   errorInForm = true;
//   errObj.waterCharge = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.waterCharge) &&
//   allNewContractDetails.waterCharge !== ""
// ) {
//   errorInForm = true;
//   errObj.waterCharge = "*Invalid Charges";
// }

// if (allNewContractDetails.electricity === "") {
//   errorInForm = true;
//   errObj.electricity = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.electricity) &&
//   allNewContractDetails.electricity !== ""
// ) {
//   errorInForm = true;
//   errObj.electricity = "*Invalid Charges";
// }

// if (allNewContractDetails.documentType === "") {
//   errorInForm = true;
//   errObj.documentType = "*This field is required";
// }

// if (allNewContractDetails.securityDepositAmount === "") {
//   errorInForm = true;
//   errObj.securityDepositAmount = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.securityDepositAmount) &&
//   allNewContractDetails.securityDepositAmount !== ""
// ) {
//   errorInForm = true;
//   errObj.securityDepositAmount = "*Invalid Amount Data";
// }

// if (allNewContractDetails.securityDepositUtr === "") {
//   errorInForm = true;
//   errObj.securityDepositUtr = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.securityDepositUtr) &&
//   allNewContractDetails.securityDepositUtr !== ""
// ) {
//   errorInForm = true;
//   errObj.securityDepositUtr = "*Invalid Utr Details";
// }

// if (allNewContractDetails.standardDeducition === "") {
//   errorInForm = true;
//   errObj.standardDeducition = "*This  field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.standardDeducition) &&
//   allNewContractDetails.standardDeducition !== ""
// ) {
//   errorInForm = true;
//   errObj.standardDeducition = "*Invalid Amount ";
// }

// if (allNewContractDetails.firstMonthvalue === "") {
//   errorInForm = true;
//   errObj.firstMonthvalue = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.firstMonthvalue) &&
//   allNewContractDetails.firstMonthvalue !== ""
// ) {
//   errorInForm = true;
//   errObj.firstMonthvalue = "*Invalid value";
// }

// if (allNewContractDetails.lastMonthvalue === "") {
//   errorInForm = true;
//   errObj.lastMonthvalue = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.lastMonthvalue) &&
//   allNewContractDetails.lastMonthvalue !== ""
// ) {
//   errorInForm = true;
//   errObj.lastMonthvalue = "*Invalid value";
// }

// if (allNewContractDetails.rentAmount === "") {
//   errorInForm = true;
//   errObj.rentAmount = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.rentAmount) &&
//   allNewContractDetails.rentAmount !== ""
// ) {
//   errorInForm = true;
//   errObj.rentAmount = "*Invalid value";
// }

// if (allNewContractDetails.escalation === "") {
//   errorInForm = true;
//   errObj.escalation = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.escalation) &&
//   allNewContractDetails.escalation !== ""
// ) {
//   errorInForm = true;
//   errObj.escalation = "*Invalid value";
// }

// if (allNewContractDetails.renewalTenure === "") {
//   errorInForm = true;
//   errObj.renewalTenure = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.renewalTenure) &&
//   allNewContractDetails.renewalTenure !== ""
// ) {
//   errorInForm = true;
//   errObj.renewalTenure = "*Invalid value";
// }

// if (allNewContractDetails.lessorName === "") {
//   errObj.lessorName = "*This field is required";
//   errorInForm = true;
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lessorName) &&
//   allNewContractDetails.lessorName !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorName = "*Invalid Name";
// }

// if (allNewContractDetails.lessorName === "") {
//   errObj.lessorName = "*This field is required";
//   errorInForm = true;
// } else if (!nameWithSpaces.test(allNewContractDetails.lessorName)) {
//   // Check if the name contains only valid characters (spaces included)
//   errorInForm = true;
//   errObj.lessorName = "*Invalid Name";
// } else {
//   // Reset the error message if the field is valid
//   errObj.lessorName = "";
// }

// if (allNewContractDetails.lessorContactNumber === "") {
//   errObj.lessorContactNumber = "*This field is required";
//   errorInForm = true;
// } else if (
//   !mobileRegex.test(allNewContractDetails?.lessorContactNumber) &&
//   allNewContractDetails.lessorContactNumber !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorContactNumber = "*Invalid Number";
// }

// if (allNewContractDetails.lessorEmailAddress === "") {
//   errObj.lessorEmailAddress = "*This field is required";
//   errorInForm = true;
// } else if (
//   !emailRegex.test(allNewContractDetails?.lessorEmailAddress) &&
//   allNewContractDetails.lessorEmailAddress !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorEmailAddress = "*Invalid Email";
// }

// if (allNewContractDetails.lessorPanNumber === "") {
//   errorInForm = true;
//   errObj.lessorPanNumber = "*This field is required";
// } else if (
//   !panCardRegex.test(allNewContractDetails?.lessorPanNumber) &&
//   allNewContractDetails.lessorPanNumber !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorPanNumber = "*Invalid Pan Number";
// }

// if (allNewContractDetails.lessorGstNumber === "") {
//   errorInForm = true;
//   errObj.lessorGstNumber = "*This field is required";
// } else if (
//   !gstRegex.test(allNewContractDetails?.lessorGstNumber) &&
//   allNewContractDetails.lessorGstNumber !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorGstNumber = "*Invalid GST Number";
// }

// if (allNewContractDetails.lessorDoorNumber === "") {
//   errorInForm = true;
//   errObj.lessorDoorNumber = "*This field is required";
// } else if (
//   !numberNameWithSpecialCharacters.test(
//     allNewContractDetails.lessorDoorNumber
//   ) &&
//   allNewContractDetails?.lessorDoorNumber !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorDoorNumber = "*Invalid Door Number";
// }

// if (allNewContractDetails.lessorFloorNumber === "") {
//   errorInForm = true;
//   errObj.lessorFloorNumber = "*This field is required";
// } else if (
//   !nameWithSpacesAndNumbers.test(
//     allNewContractDetails?.lessorFloorNumber
//   ) &&
//   allNewContractDetails.lessorFloorNumber !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorFloorNumber = "*Invalid Floor Number";
// }

// if (allNewContractDetails.lessorWardNo === "") {
//   errorInForm = true;
//   errObj.lessorWardNo = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.lessorWardNo) &&
//   allNewContractDetails.lessorWardNo !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorWardNo = "*Invalid Ward No";
// }

// if (allNewContractDetails.lessorLandMark === "") {
//   errorInForm = true;
//   errObj.lessorLandMark = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lessorLandMark) &&
//   allNewContractDetails.lessorLandMark !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorLandMark = "*Invalid LandMark";
// }

// if (allNewContractDetails.lessorStreet === "") {
//   errorInForm = true;
//   errObj.lessorStreet = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lessorStreet) &&
//   allNewContractDetails.lessorStreet !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorStreet = "*Invalid Street Name";
// }

// if (allNewContractDetails.lessorCity === "") {
//   errorInForm = true;
//   errObj.lessorCity = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lessorCity) &&
//   allNewContractDetails.lessorCity !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorCity = "*Invalid City name";
// }

// if (allNewContractDetails.lessorPinCode === "") {
//   errorInForm = true;
//   errObj.lessorPinCode = "*This field is required";
// } else if (
//   !pincodeRegex.test(allNewContractDetails?.lessorPinCode) &&
//   allNewContractDetails.lessorPinCode !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorPinCode = "*Invalid Pincode";
// }

// if (allNewContractDetails.lessorTaluka === "") {
//   errorInForm = true;
//   errObj.lessorTaluka = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lessorTaluka) &&
//   allNewContractDetails.lessorTaluka !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorTaluka = "*Invalid Taluk Name";
// }

// if (allNewContractDetails.lessorDistrict === "") {
//   errorInForm = true;
//   errObj.lessorDistrict = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lessorDistrict) &&
//   allNewContractDetails.lessorDistrict !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorDistrict = "*Invalid District Name";
// }

// if (allNewContractDetails.lessorState === "") {
//   errorInForm = true;
//   errObj.lessorState = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lessorState) &&
//   allNewContractDetails.lessorState !== ""
// ) {
//   errorInForm = true;
//   errObj.lessorState = "*Invalid State";
// }

// if (allNewContractDetails.lesseeBranchName === "") {
//   errorInForm = true;
//   errObj.lesseeBranchName = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lesseeBranchName) &&
//   allNewContractDetails.lesseeBranchName !== ""
// ) {
//   errorInForm = true;
//   errObj.lesseeBranchName = "*Invalid Branch name";
// }

// if (allNewContractDetails.lesseeAreaName === "") {
//   errorInForm = true;
//   errObj.lesseeAreaName = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lesseeAreaName) &&
//   allNewContractDetails.lesseeAreaName !== ""
// ) {
//   errorInForm = true;
//   errObj.lesseeAreaName = "*Invalid Area name";
// }

// if (allNewContractDetails.lesseeDivision === "") {
//   errorInForm = true;
//   errObj.lesseeDivision = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lesseeDivision) &&
//   allNewContractDetails.lesseeDivision !== ""
// ) {
//   errorInForm = true;
//   errObj.lesseeDivision = "*Invalid Region name";
// }

// if (allNewContractDetails.lesseeZone === "") {
//   errorInForm = true;
//   errObj.lesseeZone = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lesseeZone) &&
//   allNewContractDetails.lesseeZone !== ""
// ) {
//   errorInForm = true;
//   errObj.lesseeZone = "*Invalid Zone name";
// }

// if (allNewContractDetails.lesseeState === "") {
//   errorInForm = true;
//   errObj.lesseeState = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lesseeState) &&
//   allNewContractDetails.lesseeState !== ""
// ) {
//   errorInForm = true;
//   errObj.lesseeState = "*Invalid State name";
// }

// if (allNewContractDetails.premesisLocation === "") {
//   errorInForm = true;
//   errObj.premesisLocation = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.premesisLocation) &&
//   allNewContractDetails.premesisLocation !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisLocation = "*Invalid Location";
// }

// if (allNewContractDetails?.premesisDoorNumber === "") {
//   errorInForm = true;
//   errObj.premesisDoorNumber = "*This field is required";
// } else if (
//   !numberNameWithSpecialCharacters.test(
//     allNewContractDetails.premesisDoorNumber
//   ) &&
//   allNewContractDetails.premesisDoorNumber !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisDoorNumber = "*Invalid Door Number";
// }

// if (allNewContractDetails.premesisDoorNumber === "") {
//   errObj.premesisDoorNumber = "*This field is required";
//   errorInForm = true;
// } else if (!numberNameWithSpecialCharacters.test(allNewContractDetails.premesisDoorNumber)) {
//   // Check if the name contains only valid characters (spaces included)
//   errorInForm = true;
//   errObj.premesisDoorNumber = "*Invalid Name";
// } else {
//   // Reset the error message if the field is valid
//   errObj.premesisDoorNumber = "";
// }

// if (allNewContractDetails?.premesisFloorNumber === "") {
//   errorInForm = true;
//   errObj.premesisFloorNumber = "*This field is required";
// } else if (
//   !nameWithSpacesAndNumbers.test(
//     allNewContractDetails?.premesisFloorNumber
//   ) &&
//   allNewContractDetails.premesisFloorNumber !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisFloorNumber = "*Invalid Floor Number";
// }

// if (allNewContractDetails.premesisWardNo === "") {
//   errorInForm = true;
//   errObj.premesisWardNo = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.premesisWardNo) &&
//   allNewContractDetails.premesisWardNo !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisWardNo = "*Invalid Ward No";
// }

// if (allNewContractDetails.premesisLandMark === "") {
//   errorInForm = true;
//   errObj.premesisLandMark = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.premesisLandMark === "") &&
//   allNewContractDetails.premesisLandMark !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisLandMark = "*Invalid LandMark Data";
// }

// if (allNewContractDetails.premesisStreet === "") {
//   errorInForm = true;
//   errObj.premesisStreet = "*This field is required";
// } else if (
//   !nameWithSpacesAndNumbers.test(allNewContractDetails?.premesisStreet) &&
//   allNewContractDetails.premesisStreet !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisStreet = "*Invalid Street Name";
// }

// if (allNewContractDetails.premesisCity === "") {
//   errorInForm = true;
//   errObj.premesisCity = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.premesisCity) &&
//   allNewContractDetails.premesisCity !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisCity = "*Invalid City Name";
// }

// if (allNewContractDetails.premesisPinCode === "") {
//   errorInForm = true;
//   errObj.premesisPinCode = "*This field is required";
// } else if (
//   !pincodeRegex.test(allNewContractDetails?.premesisPinCode) &&
//   allNewContractDetails.premesisPinCode !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisPinCode = "*Invalid pincode";
// }

// if (allNewContractDetails.premesisTaluka === "") {
//   errorInForm = true;
//   errObj.premesisTaluka = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.premesisTaluka) &&
//   allNewContractDetails.premesisTaluka !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisTaluka = "*Invalid Taluk Data";
// }

// if (allNewContractDetails.premesisDistrict === "") {
//   errorInForm = true;
//   errObj.premesisDistrict = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.premesisDistrict) &&
//   allNewContractDetails.premesisDistrict !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisDistrict = "*Invalid District Name";
// }

// if (allNewContractDetails.premesisState === "") {
//   errorInForm = true;
//   errObj.premesisState = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.premesisState) &&
//   allNewContractDetails.premesisState !== ""
// ) {
//   errorInForm = true;
//   errObj.premesisState = "*Invalid State Name";
// }

// if (allNewContractDetails.lesseeBranchName === "") {
//   errorInForm = true;
//   errObj.lesseeBranchName = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lesseeBranchName) &&
//   allNewContractDetails.lesseeBranchName !== ""
// ) {
//   errorInForm = true;
//   errObj.lesseeBranchName = "*Invalid Branch Name";
// }

// if (allNewContractDetails.lesseeAreaName === "") {
//   errorInForm = true;
//   errObj.lesseeAreaName = "*This field is required";
// } else if (
//   !nameWithSpaces.test(allNewContractDetails?.lesseeAreaName) &&
//   allNewContractDetails.lesseeAreaName !== ""
// ) {
//   errorInForm = true;
//   errObj.lesseeAreaName = "*Invalid Area Name";
// }

// if (allNewContractDetails.lesseeDivision === "") {
//   errorInForm = true;
//   errObj.lesseeDivision = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.lesseeDivision) &&
//   allNewContractDetails.lesseeDivision !== ""
// ) {
//   errorInForm = true;
//   errObj.lesseeDivision = "*Invalid Division";
// }

// if (allNewContractDetails.lesseeZone === "") {
//   errorInForm = true;
//   errObj.lesseeZone = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.lesseeZone) &&
//   allNewContractDetails.lesseeZone !== ""
// ) {
//   errorInForm = true;
//   errObj.lesseeZone = "*Invalid Zone";
// }

// if (allNewContractDetails.lesseeState === "") {
//   errorInForm = true;
//   errObj.lesseeState = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.lesseeState) &&
//   allNewContractDetails.lesseeState !== ""
// ) {
//   errorInForm = true;
//   errObj.lesseeState = "*Invalid Zone";
// }

// if (allNewContractDetails.premesisState === "") {
//   errorInForm = true;
//   errObj.premesisState = "*This field is required";
// } else if (
//   !numbersRegex.test(allNewContractDetails?.premesisState) &&
//   allNewContractDetails.premesisState !== ""
// ) {
//   errorInForm = true;
//   errObj.renewalTenure = "*Invalid State";
// }

// if (allNewContractDetails.lattitude === "") {
//   errorInForm = true;
//   errObj.lattitude = "*This field is required";
// } else if (
//   !numbersWithSpecialChatracters.test(allNewContractDetails?.lattitude) &&
//   allNewContractDetails.lattitude !== ""
// ) {
//   errorInForm = true;
//   errObj.lattitude = "*Invalid value";
// }

// if (allNewContractDetails.longitude === "") {
//   errorInForm = true;
//   errObj.longitude = "*This field is required";
// } else if (
//   !numbersWithSpecialChatracters.test(allNewContractDetails?.longitude) &&
//   allNewContractDetails.longitude !== ""
// ) {
//   errorInForm = true;
//   errObj.longitude = "*Invalid value";
// }

// if (allNewContractDetails.gpsCoordinates === "") {
//   errorInForm = true;
//   errObj.gpsCoordinates = "*This field is required";
// } else if (
//   !numbersWithSpecialChatractersAndSeparated.test(
//     allNewContractDetails?.gpsCoordinates
//   ) &&
//   allNewContractDetails.gpsCoordinates !== ""
// ) {
//   errorInForm = true;
//   errObj.gpsCoordinates = "*Invalid value";
// }n
