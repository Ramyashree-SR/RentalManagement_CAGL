import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { columns } from "../../../../constants/masterTable";
import SearchBarComponent from "../../../atoms/SearchBarComponent";
import ButtonComponent from "../../../atoms/ButtonComponent";
import MasterDetails from "../../MasterDetails";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PaymentReport from "./PaymentReport";
import RentActual from "./RentActual";
import RentDue from "./RentDue";
import Provisions from "./Provisions";
import Variance from "./Variance";
// import { getAllRentContractDetails } from "../../../services/RentContractsApi";
import TableComponent from "../../TableComponent";
import TuneIcon from "@mui/icons-material/Tune";
import NavComponent from "../../../organisms/NavComponent";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getAllRentContractDetails,
  getAllRentContractDetailsByBranchID,
  getBranchID,
  getRentContractDetailsOnBranchID,
} from "../../../services/RentContractsApi";
import {
  getDistrictByStateFilter,
  getStatesByFilter,
} from "../../../services/FilterApis";

const RentalDetails = (props) => {
  // let navigate = useNavigate();
  const [openLessorModal, setOpenLessorModal] = useState(false);
  const [openEditLessorModal, setOpenEditLessorModal] = useState(false);
  const [EditLessorData, setEditLessorData] = useState({});
  // console.log(EditLessorData, "EditLessorData ");
  const [modalType, setModalType] = useState("");
  // console.log("modalType", modalType);
  const [searchText, setSearchText] = useState("");
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openRentActualModal, setOpenRentActualModal] = useState(false);
  const [openVarianceModal, setOpenVarianceModal] = useState(false);
  const [openRentDueModal, setOpenRentDueModal] = useState(false);
  const [openProvisionsMoadal, setOpenProvisionsMoadal] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [uniqueID, setUniqueID] = useState(null);
  const [rentContractDetails, setRentContractDetails] = useState([]);

  // const [stateFilter, setStateFilter] = useState(
  //   ...new Set(rentContractDetails?.map((item) => item.lesseeState))
  // );
  const [stateFilter, setStateFilter] = useState([]);
  // console.log(stateFilter, "stateFilter");
  // const [districtFilter, setDistrictFilter] = useState([
  //   ...new Set(rentContractDetails?.map((item) => item.premesisDistrict)),
  // ]);
  const [districtFilter, setDistrictFilter] = useState([]);
  const [filterState, setFilterState] = useState({});
  const [filterDistrict, setFilterDistrict] = useState({});
  const [filterBranch, setFilterBranch] = useState([]);
  const [branchTypeFilter, setBranchTypeFilter] = useState("All"); // Specify the filter for 'Name'
  const [activationStatusFilter, setActivationStatusFilter] = useState("All");

  const handleStateChange = (value) => {
    // console.log(value.target.outerText, "newValue");
    setFilterState({
      ...filterState,
      lesseeState: value.target.outerText,
    });
    getBranchDistrictByState(value.target.outerText);
    // getContractDetails(value.target.outerText);
  };

  useEffect(() => {
    getBranchStates();
  }, []);

  const getBranchStates = async () => {
    const { data } = await getStatesByFilter();
    // console.log(data?.data, "RentContractdata");
    if (data) {
      if (data) {
        let stateData = [];
        data?.data.map((val) => {
          stateData?.push([val]);
        });
        setStateFilter(stateData);
      } else {
        setStateFilter([]);
      }
    }
  };

  const getBranchDistrictByState = async (state) => {
    const { data } = await getDistrictByStateFilter(state);
    // console.log(data, "Districtdata");
    if (data) {
      // if (data) {
      let districtData = [];
      data?.data.map((val) => {
        districtData?.push([val]);
      });
      setDistrictFilter(districtData);
    } else {
      setDistrictFilter([]);
    }
    // }
  };
  const handleDistrictChange = (value) => {
    // console.log(value.target.outerText, "value");
    setFilterDistrict({
      ...filterDistrict,
      premesisDistrict: value.target.outerText,
    });
    getContractDetails(value.target.outerText);
  };

  useEffect(() => {
    if (filterState?.stateFilter && filterDistrict?.districtFilter) {
      const filteredData = () => {
        let stateFilteredData = rentContractDetails.filter((item) => {
          if (item.lesseeState) {
            return item?.lesseeState
              .toLowerCase()
              .includes(filterState?.stateFilter.toLowerCase());
          }
        });

        let districtFilteredData = stateFilteredData.filter((item) => {
          if (item.premesisDistrict) {
            return item?.premesisDistrict
              .toLowerCase()
              .includes(filterState?.districtFilter.toLowerCase());
          }
        });
        return districtFilteredData;
      };
      if (filteredData) {
        setRentContractDetails(filteredData);
      } else {
        setRentContractDetails([]);
      }
    } else {
      setRentContractDetails([...rentContractDetails]);
    }
  }, [filterState.stateFilter, filterDistrict?.districtFilter]);

  const [showClearIcon, setShowClearIcon] = useState("none");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAnchorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePaymentModal = () => {
    setOpenPaymentModal(true);
  };

  // useEffect(() => {
  //   getContractDetails();
  // }, []);

  const getContractDetails = async (district) => {
    const { data } = await getAllRentContractDetails(district);
    // console.log(data?.data.data, "RentContractdata");
    if (data?.data) {
      let getData = data?.data;
      setRentContractDetails(getData);
    }
  };

  const [branchFilter, setBranchFilter] = useState("");

  const filteredData =
    branchFilter === ""
      ? rentContractDetails
      : rentContractDetails?.filter(
          (item) => branchFilter === "" || item.branchID === branchFilter
        );

  useEffect(() => {
    getBranchId();
  }, []);

  const handleBranchID = (value) => {
    // console.log(value.target.outerText, "value.target.outerText");
    setFilterBranch({
      ...filterBranch,
      branchID: value.target.outerText,
    });
    getAllContractDetails(value.target.outerText);
  };

  const getBranchId = async () => {
    const { data } = await getBranchID();
    // console.log(data, "branchiddtaa");
    if (data) {
      if (data) {
        let branchIDData = [];
        data?.data?.map((val) => {
          branchIDData.push({ id: val, label: val });
        });

        setBranchFilter(branchIDData);
      } else {
        setBranchFilter([]);
      }
    }
  };

  const getAllContractDetails = async (branchID) => {
    const { data } = await getAllRentContractDetailsByBranchID(branchID);
    // console.log(data?.data.data, "RentContractdata");
    if (data?.data) {
      let getData = data?.data;
      setRentContractDetails(getData);
    }
  };

  const handleBranchTypeFilterChange = (value) => {
    console.log(value.target.outerText, "value.target.outerText");
    setBranchTypeFilter(value.target.outerText);
  };

  const handleActivationStatusFilterChange = (e) => {
    setActivationStatusFilter(e.target.value);
  };

  // console.log(branchTypeFilter, "branchTypeFilter");
  // console.log(activationStatusFilter, "activationStatusFilter");

  return (
    <Box>
      <Box
        sx={{
          flexBasis: "30%",
          background: "#fff",
        }}
      >
        <NavComponent />
      </Box>

      <Box
        className="d-flex align-items-center justify-content-start"
        sx={{
          margin: "1% 1% 0% 10%",
          position: "fixed",
          marginTop: "-50px",
          ml: 2,
        }}
      >
        <Box
          className="d-flex align-items-center justify-content-between py-4"
          sx={{ width: 300 }}
        >
          <Typography
            sx={{ fontSize: 17, fontWeight: 900, fontFamily: "sans-serif" }}
          >
            Rent Contract
          </Typography>
        </Box>
        <Box
          className="d-flex align-items-center justify-content-around"
          sx={{ width: 670, ml: 75, mt: -2, position: "fixed" }}
        >
          <Grid className="d-flex flex-row align-items-center justify-content-around">
            <TextField
              id="outlined-size-small"
              placeholder="Search"
              InputProps={{
                "aria-label": "Without label",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}
                    onClick={(event) => {
                      setShowClearIcon(event.target.value);
                    }}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              value={searchText}
              onChange={(e, value) => {
                setSearchText(e.target.value);
              }}
              sx={{
                // backgroundColor: "#FAFAFA",
                borderRadius: "100px",
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "#A6A6A6",
                  },
                },
                "& .MuiOutlinedInput-root:focus": {
                  "& > fieldset": {
                    outline: "none",
                    borderColor: "#ECECEC",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#c4c4c4",
                    borderRadius: "100px",
                  },
                  width: 350,
                  ml: 3,
                },
              }}
            />
          </Grid>

          <Box
            sx={{ marginTop: "10% auto 10% 10%" }}
            className="d-flex flex-row align-items-center justify-content-center py-1 px-2"
          >
            <ButtonComponent
              label=" + New Contract Details"
              variant="contained"
              onBtnClick={() => {
                setOpenLessorModal(true);
                setModalType("add");
                setOpenEditLessorModal(false);
                setEditLessorData(null);
              }}
              sx={{ width: 200 }}
            />

            <MasterDetails
              show={openLessorModal}
              close={() => setOpenLessorModal(false)}
              openLessorModal={openLessorModal}
              getContractDetails={getContractDetails}
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              type={openEditLessorModal && modalType ? "edit" : "add"}
              disabled={openEditLessorModal ? "edit" : "add"}
              uniqueID={uniqueID}
              EditLessorData={openEditLessorModal && EditLessorData}
              // setEditLessorData={setEditLessorData}
            />

            <Box>
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleAnchorClick}
                sx={[
                  () => ({
                    "&:hover": {
                      backgroundColor: "#E2F6FF",
                    },
                    display: "flex",
                    flexDirection: "column",
                    // mr: 9,
                  }),
                ]}
              >
                <WidgetsIcon
                  onClick={handleAnchorClick}
                  sx={{ color: "#238520" }}
                  fontSize="lg"
                />
                <Typography sx={{ color: "#238520", fontSize: 14 }}>
                  Menu
                </Typography>
              </IconButton>
              <PaymentReport
                show={openPaymentModal}
                close={() => setOpenPaymentModal(false)}
                fullscreen={fullscreen}
              />

              <RentActual
                show={openRentActualModal}
                close={() => setOpenRentActualModal(false)}
                fullscreen={fullscreen}
              />
              <RentDue
                show={openRentDueModal}
                close={() => setOpenRentDueModal(false)}
                fullscreen={fullscreen}
              />
              <Provisions
                show={openProvisionsMoadal}
                close={() => setOpenProvisionsMoadal(false)}
                fullscreen={fullscreen}
              />
              <Variance
                show={openVarianceModal}
                close={() => setOpenVarianceModal(false)}
                fullscreen={fullscreen}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        className="d-flex align-items-center justify-content-between"
        sx={{ width: 670, ml: 1, mt: 1, position: "fixed", borderRadius: 22 }}
      >
        <Grid className="d-flex flex-column m-1">
          <TuneIcon size="large" />
          <Typography sx={{ fontSize: 6, fontWeight: 800 }}>
            Filter By
          </Typography>
        </Grid>

        <Grid className="d-flex flex-row align-items-center justify-content-between ">
          <Autocomplete
            size="small"
            sx={{
              background: "#E4E7EB",
              borderRadius: "100px",
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: "#A6A6A6",
                },
              },
              "& .MuiOutlinedInput-root:focus": {
                "& > fieldset": {
                  outline: "none",
                  borderColor: "#ECECEC",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderColor: "#E4E7EB",
                  borderRadius: "100px",
                },
                width: 200,
              },
            }}
            options={stateFilter}
            renderInput={(params) => (
              <TextField {...params} label="State" variant="outlined" />
            )}
            value={filterState?.lesseeState}
            onChange={handleStateChange}
          />
        </Grid>
        <Grid className="d-flex flex-row align-items-center justify-content-between ">
          <Autocomplete
            size="small"
            // sx={{ width: 200, background: "#E4E7EB" }}
            sx={{
              // backgroundColor: "#FAFAFA",
              borderRadius: "100px",
              background: "#E4E7EB",
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: "#A6A6A6",
                },
              },
              "& .MuiOutlinedInput-root:focus": {
                "& > fieldset": {
                  outline: "none",
                  borderColor: "#ECECEC",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderColor: "#E4E7EB",
                  borderRadius: "100px",
                },
                width: 200,
              },
            }}
            // defaultValue={null}
            options={districtFilter}
            value={filterDistrict?.premesisDistrict}
            onChange={handleDistrictChange}
            renderInput={(params) => (
              <TextField {...params} label="District" variant="outlined" />
            )}
          />
        </Grid>
        <Grid className="d-flex flex-row align-items-center justify-content-between ">
          <Autocomplete
            size="small"
            // sx={{ width: 200, background: "#E4E7EB" }}
            sx={{
              // backgroundColor: "#FAFAFA",
              background: "#E4E7EB",
              borderRadius: "100px",
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: "#E4E7EB",
                },
              },
              "& .MuiOutlinedInput-root:focus": {
                "& > fieldset": {
                  outline: "none",
                  borderColor: "#E4E7EB",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderColor: "#E4E7EB",
                  borderRadius: "100px",
                },
                width: 200,
              },
            }}
            // defaultValue={null}
            // options={[
            //   ...new Set(rentContractDetails?.map((item) => item.branchID)),
            // ]}
            options={branchFilter}
            value={filterBranch?.branchID}
            onChange={handleBranchID}
            renderInput={(params) => (
              <TextField {...params} label="Branch ID" variant="outlined" />
            )}
          />
        </Grid>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ background: "" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setOpenRentDueModal(true);
          }}
        >
          Rent Due
        </MenuItem>

        <MenuItem
          onClick={() => {
            handlePaymentModal();
            handleClose();
          }}
        >
          Payment Report
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            setOpenRentActualModal(true);
          }}
        >
          Rent Actual
        </MenuItem>

        <MenuItem
          onClick={() => {
            setOpenProvisionsMoadal(true);
            handleClose();
          }}
        >
          Provisions
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            setOpenVarianceModal(true);
          }}
        >
          Variance
        </MenuItem>
      </Menu>

      {/* {searchText ? ( */}
      <Box
        sm={12}
        xs={12}
        sx={{
          margin: "4% auto auto 0%",
          flexBasis: "80%",
          background: "#fff",
          height: "100%",
          width: "100%",
          position: "fixed",
        }}
      >
        <TableComponent
          data={rentContractDetails}
          // data={branchFilter || rentContractDetails}
          columns={columns}
          // getContractDetails={getContractDetails}
          setEditLessorData={setEditLessorData}
          setOpenEditLessorModal={setOpenEditLessorModal}
          setOpenLessorModal={setOpenLessorModal}
          modalType={modalType}
          setUniqueID={setUniqueID}
          setModalType={setModalType}
          EditLessorData={EditLessorData}
          searchText={searchText}
          setSearchText={setSearchText}
          branchTypeFilter={branchTypeFilter}
          activationStatusFilter={activationStatusFilter}
          handleBranchTypeFilterChange={handleBranchTypeFilterChange}
          handleActivationStatusFilterChange={
            handleActivationStatusFilterChange
          }
        />
      </Box>
      {/* ) : null} */}
    </Box>
  );
};
export default RentalDetails;
// const categories = [
//   ...new Set(rentContractDetails?.map((item) => item?.branchID)),
// ];

// const [selectedFilter, setSelectedFilter] = useState("");
// const [filterTable, setFilterTable] = useState({});

//   // Filter the data based on the selected filter
//   if (filterValue === "") {
//     setRentContractDetails(rentContractDetails); // Show all data
//   } else {
//     const filtered = rentContractDetails?.filter(
//       (item) => item.branchID === filterValue
//     );
//     setRentContractDetails(filtered);
//   }

//   setFilterTable({
//     ...filterTable,
//     branchID: value,
//   });
// };

// useEffect(() => {
//   if (filterTable?.branchID) {
//     const getFilterData = () => {
//       let branchIdData = rentContractDetailsCopy.filter((item) => {
//         if (item.branchID) {
//           return item?.branchID
//             .toString()
//             .includes(filterTable?.branchID.toString());
//         }
//       });
//       return branchIdData;
//     };
//     if (getFilterData) {
//       setRentContractDetails(getFilterData);
//     } else {
//       setRentContractDetails([]);
//     }
//   } else {
//     setRentContractDetails([...rentContractDetailsCopy]);
//   }
// }, [filterTable?.branchID]);

// let array = [];
// data?.data.map((val) => {
//   array.push({
//     col1: val.uniqueID ?? "",
//     col2: val.lesseeBranchType,
//     col3: val.branchID ?? "",
//     col4: val.lesseeBranchName ?? "",
//     col5: val.lessorArea ?? "",
//     col6: val.lessorDistrict ?? "",
//     col7: val.lessorState ?? "",
//     col8: val.lessorState ?? "",
//     col9: val.lessorName ?? "",
//     col10: val.lessorContactNumber ?? "",
//     col11: val.lessorRecipiantsName ?? "",
//     col12: val.lessorBankName ?? "",
//     col13: val.lessorAccountNumber ?? "",
//     col14: val.agreementSignDate ?? "",
//     col15: val.agreementSignDate ?? "",
//     col16: val.agreementTenure ?? "",
//     col17: val.agreementStartDate ?? "",
//     col18: val.agreementEndDate ?? "",
//     col19: val.rentStartDate ?? "",
//     col20: val.rentEndDate ?? "",
//     col21: val.securityDepositAmount,
//     col22: val.rentAmount ?? "",
//     col23: val.tds ?? "",
//     col24: val.firstMonthvalue ?? "",
//     col25: val.lastMonthvalue ?? "",
//     col26: val.agreementEndDate ?? "",
//     col27: val.agreementEndDate ?? "",
//     col28: val.standardDeducition ?? "",
//     col29: val.agreementEndDate ?? "",
//     col30: val.renewalTenure ?? "",
//     col31: val.agreementEndDate ?? "",
//     col32: "769",
//     col33: val.rentContractStatus ?? "",
//     col34: "",
//     col35: "",
//     col36: "",
//     col37: "",
//   });
// });
// setRentContractDetailsCopy(array);
// const filteredData = rentContractDetails?.filter(
//   (item) =>
//     (branchFilter === "" || item.branchID === branchFilter) &&
//     (stateFilter === "" || item.lesseeState === stateFilter)
// );

// const filteredData =
//   filter === ""
//     ? rentContractDetails
//     : rentContractDetails?.filter((item) => item.branchID === filter);

// console.log(rentContractDetails, "rentcontractDdetails");
