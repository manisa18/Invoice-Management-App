import { Button, TextField, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  sectionfield: {
    padding: theme.spacing(2), // Add padding to the Paper component
    display: "flex",
    gap: theme.spacing(2), // Add gap between input fields
  },
  filled: {
    backgroundColor: "white", // Add gap between input fields
  },
}));
function AddData() {
  const classes = useStyles();

  const [data, setData] = useState({
    slNo: "",
    customerOrderId: "",
    salesOrg: "",
    distributionChannel: "",
    customerNumber: "",
    companyCode: "",
    orderCurrency: "",
    orderAmount: "",
    orderCreationDate: "",
  });

  const handleInputs = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddClick = async (e) => {
    e.preventDefault();
    console.log("Added Data");
    const response = await axios.get(
      "http://localhost:8080/h2h_milestone_3/DataLoadingServlet"
    );
    const dataLength = response.data.length;
    const lastSlNo = response.data[dataLength - 1].SlNo;
    console.log("API Data Length:", lastSlNo + 1);

    try {
      setData((prevData) => ({ ...prevData, slNo: lastSlNo + 1 }));

      console.log(data.slNo);
      const response = await axios.post(
        "http://localhost:8080/h2h_milestone_3/AddServlet",
        {
          slNo: data.slNo.toString(),
          customerOrderId: data.customerOrderId,
          salesOrg: data.salesOrg,
          distributionChannel: data.distributionChannel,
          customerNumber: data.customerNumber,
          companyCode: data.companyCode,
          orderCurrency: data.orderCurrency,
          orderAmount: data.orderAmount,
          orderCreationDate: data.orderCreationDate.toString(),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        console.log("Data Added Registration");
        handleClearDataClick();
      } else {
        console.log("Invalid Data");
      }
    } catch (err) {
      // Handle error response
      if (err.response) {
        const errorMessage = err.response.data.message;
        console.log(errorMessage);
        // Display error message to the user or handle it as needed
      } else {
        console.log(err.message);
      }
    }
  };
  const handleClearDataClick = () => {
    setData({
      slNo: "",
      customerOrderId: "",
      salesOrg: "",
      distributionChannel: "",
      customerNumber: "",
      companyCode: "",
      orderCurrency: "",
      orderAmount: "",
      orderCreationDate: "",
    });
    console.log(data);
  };
  return (
    <div>
      <form>
        <div className={classes.sectionfield}>
          <TextField
            id="filled-basic"
            variant="filled"
            name="customerOrderId"
            placeholder="CUSTOMER ORDER ID"
            value={data.customerOrderId}
            onChange={handleInputs}
            style={{ width: "25%" }}
            className={classes.filled}
          />

          <TextField
            id="filled-basic"
            variant="filled"
            name="salesOrg"
            placeholder="SALES ORG"
            value={data.salesOrg}
            onChange={handleInputs}
            style={{ width: "25%" }}
            className={classes.filled}
          />
          <TextField
            id="filled-basic"
            variant="filled"
            name="distributionChannel"
            style={{ width: "50%" }}
            placeholder="DISTRIBUTION CHANNEL"
            value={data.distributionChannel}
            onChange={handleInputs}
            className={classes.filled}
          />
        </div>
        <div className={classes.sectionfield}>
          <TextField
            id="filled-basic"
            variant="filled"
            name="customerNumber"
            placeholder="CUSTOMER NUMBER"
            value={data.customerNumber}
            onChange={handleInputs}
            style={{ width: "25%" }}
            className={classes.filled}
          />
          <TextField
            id="filled-basic"
            variant="filled"
            name="companyCode"
            placeholder="COMPANY CODE"
            value={data.companyCode}
            onChange={handleInputs}
            style={{ width: "25%" }}
            className={classes.filled}
          />
          <TextField
            id="filled-basic"
            variant="filled"
            name="orderCurrency"
            placeholder="ORDER CURRENCY"
            value={data.orderCurrency}
            onChange={handleInputs}
            style={{ width: "16%" }}
            className={classes.filled}
          />
          <TextField
            id="filled-basic"
            variant="filled"
            name="orderAmount"
            placeholder="ORDER AMOUNT"
            value={data.orderAmount}
            onChange={handleInputs}
            style={{ width: "16%" }}
            className={classes.filled}
          />
          <TextField
            id="filled-basic"
            variant="filled"
            name="orderCreationDate"
            placeholder="ORDER CREATION DATE"
            value={data.orderCreationDate}
            onChange={handleInputs}
            style={{ width: "16%" }}
            className={classes.filled}
            type="date"
          />
        </div>
        <div className={classes.sectionfield}>
          <Button
            style={{ backgroundColor: "#fc7500", width: "50%" }}
            variant="contained"
            onClick={handleAddClick}>
            Add
          </Button>
          <Button
            style={{ backgroundColor: "#db4437", width: "50%" }}
            variant="contained"
            onClick={handleClearDataClick}>
            Clear Data
          </Button>
        </div>
      </form>
      <div></div>
    </div>
  );
}

export default AddData;
