import React from "react";
// import Button from "react-bootstrap/Button";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button, Tooltip } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const ExcelExport = ({ excelData, fileName, sx }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (excelData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX?.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Tooltip title="Excel Export">
      <Button
        variant="contained"
        onClick={() => exportToCSV(excelData, fileName)}
        sx={{ ...sx }}
      >
        <DownloadRoundedIcon /> Export
      </Button>
    </Tooltip>
  );
};

export default ExcelExport;
//   const [csvData, setCsvData] = React.useState([
//     { Name: "Gowri" },
//     { Name: "Siva" },
//     { Name: "Teja" },
//     { Name: "USA" },
//   ]);
//   const [fileName, setFileName] = React.useState("Reports");
//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   const exportToCSV = (csvData, fileName) => {
//     const ws = XLSX.utils.json_to_sheet(csvData);
//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);
//   };
