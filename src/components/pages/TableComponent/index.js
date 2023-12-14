import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Button,
  styled,
  Box,
  TablePagination,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { blue, deepOrange, green, pink, yellow } from "@mui/material/colors";
import CustomModal from "../../pages/RentalProcessDetails/RentalDetails/CustomModal";
import ViewDetailsModal from "../../pages/RentalProcessDetails/RentalDetails/ViewDetailsModal";
import EditIcon from "@mui/icons-material/Edit";
import HandshakeIcon from "@mui/icons-material/Handshake";
import BranchDetailsModal from "../../pages/RentalProcessDetails/RentalDetails/BranchDetailsModal";
import ViewRentDocumentModal from "../RentalProcessDetails/RentalDetails/ViewRentDocumentModal";
import GavelIcon from "@mui/icons-material/Gavel";
import DropDownComponent from "../../atoms/DropDownComponent";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "5px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette?.success.dark,
    color: theme.palette?.common?.white,
    fontSize: 12,
    fontWeight: 650,
    padding: "3px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    fontWeight: 700,
    backgroundColor: "#D5F7DC ", //#CFE8F7, #C5EBF6 ,
    fontFamily: "sans-serif",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette?.action?.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: deepOrange[500],
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: deepOrange[700],
  },
}));

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[300]),
  color: pink[900],
  // color:yellow[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));

const useStyles = makeStyles({
  tableHeader: {
    fontWeight: "600 !important",
    fontSize: "12px !important",
    borderBottom: "1px solid #70B3D1 !important",
    borderRight: "1px solid #70B3D1  !!!important",
  },
  tableRow: {
    border: "none !important",
    color: "#373737",
    fontWeight: "500",
    fontSize: "12px",
  },
});

const TableComponent = ({
  data,
  columns,
  setOpenEditLessorModal,
  setOpenLessorModal,
  setEditLessorData,
  getContractDetails,
  modalType,
  setModalType,
  setUniqueID,
  searchText,
  filterDatas,
  activationStatusFilter,
  handleActivationStatusFilterChange,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [branchModal, setBranchModal] = useState(false);
  const [agreementModal, setAgreementModal] = useState(false);
  const [customInputModalOpen, setCustomInputModalOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditRow = (event, rowData) => {
    // console.log(rowData, "rowData");
    setModalType("edit");
    // if (modalType === "edit") {
    setOpenLessorModal(true);
    setEditLessorData(rowData);
    setOpenEditLessorModal(true);
    // }
  };

  const handleModalOpen = (rowData) => {
    // console.log("rowdata", rowData);
    setSelectedItem(rowData);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const handleCustomInputModalOpen = (rowData) => {
    // console.log("rowdata", rowData);
    setSelectedItem(rowData);
    setCustomInputModalOpen(true);
  };

  const handleCustomInputModalClose = () => {
    setCustomInputModalOpen(false);
  };

  const handleBranchModalOpen = (rowData) => {
    // console.log("rowdata", rowData);
    setSelectedItem(rowData);
    setBranchModal(true);
  };

  const handleDocumentModalOpen = () => {
    setAgreementModal(true);
  };

  // Apply the filter
  const filteredData = data?.filter((item) => {
    if (activationStatusFilter === "All") {
      return true; // Show all rows if 'all' is selected
    }
    return item["agreementActivationStatus"] === activationStatusFilter; // Customize the filtering condition based on your data structure
  });

  const filterOptions = data?.reduce((options, item) => {
    if (!options.includes(item["agreementActivationStatus"])) {
      options?.push(item["agreementActivationStatus"]);
    }
    return options;
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      
        <TableContainer
          sx={{
            height: "365px",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <TableCell
                  sx={{
                    border: "none !important",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontSize: "12px",
                    borderRight: "1px solid #000000 !important",
                    // backgroundColor: "#01579b",
                    backgroundColor: green[900],
                  }}
                >
                  Sl No.
                </TableCell>
                {columns &&
                  columns?.map((column) => (
                    // console.log(column,"column");
                    <StyledTableCell key={column.id}>
                      {column.label}
                      {column &&
                        column.label === "Activation Status" && (
                          <select
                            value={activationStatusFilter || "All"}
                            onChange={handleActivationStatusFilterChange}
                          >
                            {/* <option value=""></option> */}
                            <option value="All">All</option>
                            {filterOptions?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}

                      {column.icon && (
                        <IconButton size="small">{column.icon}</IconButton>
                      )}
                    </StyledTableCell>
                  ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredData) &&
                filteredData
                  ?.filter((value) => {
                    if (searchText === "") {
                      return value;
                    } else if (
                      Object.values(value)
                        .join("")
                        .toLowerCase()
                        .includes(searchText.toLowerCase().toString())
                    ) {
                      return value;
                    }
                  })

                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        sx={{
                          borderBottom: "1px solid #70B3D1 !important",
                          borderRight: "1px solid #70B3D1 !important",
                        }}
                      >
                        {index + 1}
                      </StyledTableCell>
                      {columns &&
                        columns?.map((column, columnIndex) => {
                          const value = row[column.id] || "";
                          return (
                            <StyledTableCell
                              key={columnIndex}
                              classes={{ root: classes.tableHeader }}
                            >
                              {column?.format && typeof value === "number"
                                ? column?.format(value)
                                : value}
                              {/* Add icons to the data cells */}
                              {column?.actions && (
                                <Box sx={{ display: "flex" }}>
                                  {column?.actions.includes("edit") && (
                                    <ColorIcon
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <EditIcon
                                        size="small"
                                        onClick={(e) => {
                                          handleEditRow(e, row);
                                          setUniqueID(row.uniqueID);
                                        }}
                                      />

                                      <Typography
                                        sx={{ fontSize: 8, fontWeight: 800 }}
                                      >
                                        Edit Details
                                      </Typography>
                                    </ColorIcon>
                                  )}

                                  {column?.actions.includes("viewBank") && (
                                    <ColorIcon
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <AccountBalanceWalletIcon
                                        onClick={() => {
                                          handleModalOpen(row);
                                        }}
                                      />
                                      <Typography
                                        sx={{ fontSize: 8, fontWeight: 800 }}
                                      >
                                        Bank Details
                                      </Typography>
                                    </ColorIcon>
                                  )}

                                  <ViewDetailsModal
                                    show={modalOpen}
                                    close={handleModalClose}
                                    selectedItem={selectedItem}
                                  />

                                  {column?.actions.includes("viewBranch") && (
                                    <ColorIcon
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <ApartmentIcon
                                        size="small"
                                        onClick={() =>
                                          handleBranchModalOpen(row)
                                        }
                                      />

                                      <Typography
                                        sx={{ fontSize: 8, fontWeight: 800 }}
                                      >
                                        Branch Details
                                      </Typography>
                                    </ColorIcon>
                                  )}

                                  <BranchDetailsModal
                                    show={branchModal}
                                    close={() => setBranchModal(false)}
                                    selectedItem={selectedItem}
                                  />

                                  {column?.actions.includes(
                                    "viewAgreement"
                                  ) && (
                                    <ColorIcon
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <HandshakeIcon
                                        size="small"
                                        onClick={() =>
                                          handleCustomInputModalOpen(row)
                                        }
                                      />

                                      <Typography
                                        sx={{ fontSize: 8, fontWeight: 800 }}
                                      >
                                        Agreement Details
                                      </Typography>
                                    </ColorIcon>
                                  )}
                                </Box>
                              )}

                              <CustomModal
                                show={customInputModalOpen}
                                close={handleCustomInputModalClose}
                                selectedItem={selectedItem}
                              />
                              {/* 
                            {column?.actions?.includes(
                              "viewUploadedAgreement"
                            ) && (
                              <ColorIcon
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <GavelIcon
                                  size="small"
                                  onClick={() => handleDocumentModalOpen(row)}
                                />

                                <Typography
                                  sx={{ fontSize: 9, fontWeight: 800 }}
                                >
                                  Rent Agreement
                                </Typography>
                              </ColorIcon>
                            )}

                            <ViewRentDocumentModal
                              show={agreementModal}
                              close={() => setAgreementModal(false)}
                            /> */}
                            </StyledTableCell>
                          );
                        })}
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
    

      <TablePagination
        rowsPerPageOptions={[10, 15, 100]}
        component="div"
        count={filteredData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
