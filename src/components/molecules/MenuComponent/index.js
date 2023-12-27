import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/styles";
import { Button, Icon, TextField } from "@mui/material";
import { blue, deepOrange, green, pink, red } from "@mui/material/colors";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PanToolIcon from "@mui/icons-material/PanTool";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useState } from "react";
import { useEffect } from "react";
import { getRentDueDetails } from "../../services/RentDueApi";
import RentDueDetails from "../../pages/RentalProcessDetails/RentalDetails/RentDueDetails";
import Provisions from "../../pages/RentalProcessDetails/RentalDetails/Provisions";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LockClockIcon from "@mui/icons-material/LockClock";
import LockIcon from "@mui/icons-material/Lock";
import { AddRentProvisionDetails } from "../../services/ProvisionsApi";

const ColorIcon = styled(Icon)(({ theme }) => ({
  //   color: theme.palette?.getContrastText(pink[900]),
  color: pink[900],
  "&:hover": {
    color: deepOrange[700],
  },
}));
export default function MenuComponent({
  handleEdit = () => {},
  handleEditProvisions = () => {},
  handleRentDue = () => {},
  openRentDueModal,
  setOpenRentDueModal,
  uniqueID,
  branchIDforDue,
  rentContractDetails,
  rentStartDate,
  rentEndDate,
  agreementTenure,
  openProvisionsModal,
  setOpenProvisionsModal,
  setMonthlyRent,
  monthlyRent,
}) {
  const [fullscreen, setFullscreen] = useState(true);
  const [rentDueDetails, setRentDueDetails] = useState([]);
  const [addProvisions, setAddProvisions] = useState({
    provisionID: "",
    contractID: "",
    year: "",
    month: "",
    provisionAmount: "",
    remark: "",
    dateTime: "",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getAllRentDueDetailsByBranchID();
  }, [uniqueID]);

  const getAllRentDueDetailsByBranchID = async () => {
    const { data } = await getRentDueDetails(uniqueID);
    // console.log(data.data,"data");
    if (data) {
      if (data) {
        let getData = data?.data;
        setRentDueDetails(getData);
      } else {
        setRentDueDetails([]);
      }
    }
  };

  const AddProvisionFortheMonth = async () => {
    let payload = {
      provisionID: addProvisions.provisionID,
      contractID: uniqueID,
      year: addProvisions.year.label,
      month: addProvisions.month.label,
      provisionAmount: monthlyRent,
      remark: addProvisions.remark,
      dateTime: addProvisions.dateTime,
    };
    const { data } = await AddRentProvisionDetails(payload);
    console.log(data?.data, "data");
    if (data) {
      setAddProvisions({
        provisionID: "",
        contractID: "",
        year: "",
        month: "",
        provisionAmount: "",
        remark: "",
        dateTime: "",
      });
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Rent Contract Details">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0, display: "flex", flexDirection: "column" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ColorIcon
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <EditIcon size="small" />
            </ColorIcon>
            <Typography sx={{ fontSize: 9, fontWeight: 800, color: pink[900] }}>
              Edit <br />
              Details
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            background: "#CFE8F7",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              //   ml: -0.1,
              mr: 2,
              background: "#CFE8F7",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 1,
              left: 10,
              width: 10,
              height: 11,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              background: "#CFE8F7",
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
        >
          <EditNoteIcon size="small" sx={{ color: blue[900] }} />
          &nbsp;Edit Contract
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleRentDue();
            getAllRentDueDetailsByBranchID();
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
        >
          {/* <ListItemIcon> */}
          <PendingActionsIcon fontSize="small" sx={{ color: blue[900] }} />
          {/* </ListItemIcon> */}
          &nbsp; Rent Due
        </MenuItem>
        {/* <MenuItem onClick={handleClose} sx={{ fontSize: 13, fontWeight: 600 }}>
          <Settings fontSize="small" sx={{ color: blue[900] }} />
          &nbsp;Rent Actual
        </MenuItem> */}
        <MenuItem
          onClick={handleEditProvisions}
          sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
        >
          <LockIcon fontSize="small" sx={{ color: blue[900] }} />
          &nbsp; Provisions
        </MenuItem>
      </Menu>
      <RentDueDetails
        show={openRentDueModal}
        close={() => setOpenRentDueModal(false)}
        fullscreen={fullscreen}
        branchIDforDue={branchIDforDue}
        rentDueDetails={rentDueDetails}
        rentContractDetails={rentContractDetails}
        rentStartDate={rentStartDate}
        rentEndDate={rentEndDate}
        uniqueID={uniqueID}
        agreementTenure={agreementTenure}
      />

      <Provisions
        show={openProvisionsModal}
        close={() => setOpenProvisionsModal(false)}
        fullscreen={fullscreen}
        branchIDforDue={branchIDforDue}
        rentEndDate={rentEndDate}
        rentStartDate={rentStartDate}
        agreementTenure={agreementTenure}
        addProvisions={addProvisions}
        setAddProvisions={setAddProvisions}
        AddProvisionFortheMonth={AddProvisionFortheMonth}
        monthlyRent={monthlyRent}
        uniqueID={uniqueID}
      />
    </React.Fragment>
  );
}
