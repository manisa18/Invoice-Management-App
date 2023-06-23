import React, { useState, useEffect } from "react";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import styles from "./table.css";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#fc7500",
    margin: "2px",
    color: "#ffffff",
    "&:focus": {
      backgroundColor: "#636262", // Change this to the desired color on hover
    },
  },
}));

function Table({ searchResults }) {
  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editDataField, setEditDataField] = useState([
    {
      distributionChannel: "",
      companyCode: "",
      orderCurrency: "",
    },
  ]);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    getInvoices();
  }, []);

  useEffect(() => {
    setIsDisabled(selectedRows.length !== 1);
  }, [selectedRows]);

  // console.log(searchResults);
  const getInvoices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/h2h_milestone_3/DataLoadingServlet"
      );
      const data = response.data; // Get the data property from the response
      console.log(data);
      if (Array.isArray(data)) {
        setInvoices(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const columns = [
    { field: "SLNo", headerName: "Sl No", width: 110 },
    {
      field: "customerOrderID",
      headerName: "CUSTOMER ORDER ID",
      width: 240,
    },
    { field: "salesOrg", headerName: "SALES ORG", width: 240 },
    {
      field: "distributionChannel",
      headerName: "DISTRIBUTION CHANNEL",
      width: 240,
    },
    { field: "companyCode", headerName: "COMPANY CODE", width: 240 },
    {
      field: "orderCreationDate",
      headerName: "ORDER CREATION DATE",
      width: 240,
    },
    { field: "orderAmount", headerName: "ORDER AMOUNT", width: 240 },
    { field: "orderCurrency", headerName: "ORDER CURRENCY", width: 240 },
    { field: "customerNumber", headerName: "CUSTOMER NUMBER", width: 240 },
  ];

  const search = searchResults.map((item, index) => ({
    id: index + 1, // Use "id" as the unique identifier for each row
    SLNo: item.SlNo,
    customerOrderID: item.CustomerOrderId,
    salesOrg: item.SalesOrg,
    distributionChannel: item.DistributionChannel,
    companyCode: item.CompanyCode,
    orderCreationDate: item.OrderCreationDate,
    orderAmount: item.OrderAmount,
    orderCurrency: item.OrderCurrency,
    customerNumber: item.CustomerNumber,
  }));
  const rows =
    searchResults.length > 0
      ? search
      : invoices.map((item, index) => ({
          id: index + 1, // Use "id" as the unique identifier for each row
          SLNo: item.SlNo,
          customerOrderID: item.CustomerOrderId,
          salesOrg: item.SalesOrg,
          distributionChannel: item.DistributionChannel,
          companyCode: item.CompanyCode,
          orderCreationDate: item.OrderCreationDate,
          orderAmount: item.OrderAmount,
          orderCurrency: item.OrderCurrency,
          customerNumber: item.CustomerNumber,
        }));

  const handleRefreshDataClick = () => {
    console.log("You Refreshed the data");
    setOpenDeleteDialog(false);
    setSelectedRows([]);
    getInvoices();
    getInvoices();
  };

  const handlePredictButtonClick = () => {
    console.log("Predict button clicked");
  };

  const handleDeleteButtonClick = () => {
    if (selectedRows.length === 0) {
      console.log("No rows selected");
      return;
    }

    setOpenDeleteDialog(true);
  };

  const deleteData = async () => {
    try {
      const selectedSLNos = selectedRows.map((selectedRowIndex) => {
        const row = rows[selectedRowIndex - 1];
        return row.SLNo;
      });

      console.log("Selected SLNos:", selectedSLNos);
      const deletePromises = selectedSLNos.map((id) =>
        axios.delete(
          `http://localhost:8080/h2h_milestone_3/DeleteServlet?slNo=${id}`
        )
      );

      const responseArray = await Promise.all(deletePromises);

      console.log(responseArray);
      console.log("Data deleted successfully");
      getInvoices();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setOpenDeleteDialog(false);
    setSelectedRows([]);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditInputs = (e) => {
    const { name, value } = e.target;
    setEditDataField((prevEditDataField) => ({
      ...prevEditDataField,
      [name]: value,
    }));
  };
  const handleEditButtonClick = () => {
    if (selectedRows.length === 0) {
      console.log("No rows selected");
      return;
    } else if (selectedRows.length === 1) {
      setOpenEditDialog(true);
    } else {
      console.log("Choose one row to edit");
      return;
    }
  };

  const editData = async () => {
    try {
      const selectedSLNos = selectedRows.map((selectedRowIndex) => {
        const row = rows[selectedRowIndex - 1];
        return row.SLNo;
      });
      const updatedData = {
        distributionChannel:
          editDataField.distributionChannel ||
          rows[selectedSLNos].distributionChannel,
        companyCode:
          editDataField.companyCode || rows[selectedSLNos].companyCode,
        orderCurrency:
          editDataField.orderCurrency || rows[selectedSLNos].orderCurrency,
      };

      const isDataEmpty = Object.values(updatedData).some(
        (value) => value === ""
      );

      if (isDataEmpty) {
        // Select the row data if any of the fields are empty
        console.log("Please fill in all the fields");
        return;
      }

      console.log("Selected SLNos:", selectedSLNos);
      const editPromises = selectedSLNos.map((id) =>
        axios.put(
          `http://localhost:8080/h2h_milestone_3/EditServlet?slNo=${id}&distributionChannel=${updatedData.distributionChannel}&companyCode=${updatedData.companyCode}&orderCurrency=${updatedData.orderCurrency}`
        )
      );

      const responseArray = await Promise.all(editPromises);
      console.log(responseArray);
      console.log("Data Edited successfully");
      getInvoices();
    } catch (error) {
      console.error("Error editing data:", error);
    }
    setOpenEditDialog(false);
    setSelectedRows([]);
  };
  const cancelEdit = () => {
    setOpenEditDialog(false);
    setEditDataField({
      distributionChannel: "",
      companyCode: "",
      orderCurrency: "",
    });
  };
  const CustomPagination = (props) => {
    return (
      <>
        <Dialog open={openDeleteDialog} onClose={cancelDelete}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete these records?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteData} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={cancelEdit} disableBackdropClick>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <div style={{ display: "flex", paddingBottom: "6px" }}>
              <TextField
                id="outlined-basic"
                label="ORDER CURRENCY"
                variant="outlined"
                name="orderCurrency"
                value={editDataField.orderCurrency}
                onChange={handleEditInputs}
                style={{ padding: "2px" }}
              />
              <TextField
                id="outlined-basic"
                label="COMPANY CODE"
                variant="outlined"
                name="companyCode"
                value={editDataField.companyCode}
                onChange={handleEditInputs}
                style={{ padding: "2px" }}
              />
            </div>
            <TextField
              id="outlined-basic"
              label="DISTRIBUTION CHANNEL"
              variant="outlined"
              name="distributionChannel"
              value={editDataField.distributionChannel}
              onChange={handleEditInputs}
              style={{ padding: "2px", width: "100%" }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={editData}
              color="primary"
              style={{ width: "50%" }}
              disabled={isDisabled}>
              Edit
            </Button>
            <Button
              onClick={cancelEdit}
              color="primary"
              style={{ width: "50%" }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Button className={classes.button} onClick={handleRefreshDataClick}>
              Refresh data
            </Button>
            <Button className={classes.button} onClick={handleEditButtonClick}>
              Edit
            </Button>
            <Button
              className={classes.button}
              onClick={handleDeleteButtonClick}>
              Delete
            </Button>
            <Button
              className={classes.button}
              onClick={handlePredictButtonClick}>
              Predict
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <GridPagination {...props} />
          </Box>
        </Box>
      </>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      {invoices.length > 0 ? (
        <DataGrid
          className={styles}
          components={{
            Pagination: CustomPagination,
          }}
          rows={rows}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick={true}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSelectionModelChange={(newSelection) =>
            setSelectedRows(newSelection)
          }
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          pagination
          autoHeight
          disableMultipleSelection
        />
      ) : (
        <p style={{ color: "#ffff" }}>Loading data...</p>
      )}
    </div>
  );
}

export default Table;
