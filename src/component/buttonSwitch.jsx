import React, { useState, useEffect } from "react";
import {
  Button,
  InputBase,
  Paper,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import AnalyticView from "./analyticView";
import AddData from "./addData";
import Table from "./table";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 6px",
    display: "flex",
    alignItems: "center",
    width: 200,
  },
  input: {
    margin: "2px",
    padding: "0px",
    flex: 1,
  },
  button: {
    backgroundColor: "transparent",
    color: "#ffff",
    "&:hover": {
      backgroundColor: "#fc7500", // Change this to the desired color on hover
    },
    "&:focus": {
      backgroundColor: "#fc7500", // Change this to the desired color on hover
    },
  },
}));
function ButtonSwitch() {
  const classes = useStyles();
  const [activeButton, setActiveButton] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [searchDataField, setSearchDataField] = useState([
    {
      customerOrderId: "",
      customerNumber: "",
      salesOrg: "",
    },
  ]);
  useEffect(() => {
    search();
  }, [searchQuery]);
  const search = async () => {
    try {
      if (searchQuery) {
        const response = await axios.get(
          `http://localhost:8080/h2h_milestone_3/DataLoadingServlet?customerOrderId=${searchQuery}`
        );
        const data = response.data; // Get the data property from the response
        // console.log(data);
        if (Array.isArray(data)) {
          setSearchResults(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  let content;
  switch (activeButton) {
    case 1:
      content = <Table searchResults={searchResults} />;
      break;
    case 2:
      content = <AddData />;
      break;
    case 3:
      content = <AnalyticView />;
      break;
    default:
      content = null;
  }

  const handleSearchInputs = (e) => {
    const { name, value } = e.target;
    setSearchDataField((prevSearchDataField) => ({
      ...prevSearchDataField,
      [name]: value,
    }));
  };

  const handleAdvanceSearch = () => {
    setOpenSearchDialog(true);
  };

  const SearchData = async () => {
    try {
      console.log(
        `http://localhost:8080/h2h_milestone_3/DataLoadingServlet?customerOrderId=${searchDataField.customerOrderId}&&salesOrg=${searchDataField.salesOrg}&customerNumber=${searchDataField.customerNumber}`
      );
      const response = await axios.get(
        `http://localhost:8080/h2h_milestone_3/DataLoadingServlet?customerOrderId=${searchDataField.customerOrderId}&&salesOrg=${searchDataField.salesOrg}&customerNumber=${searchDataField.customerNumber}`
      );
      const data = response.data; // Get the data property from the response
      console.log(data);
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
    setOpenSearchDialog(false);
  };
  const cancelSearch = () => {
    setOpenSearchDialog(false);
  };
  return (
    <div style={{ padding: "10px 0", backgroundColor: "#636262" }}>
      <Dialog open={openSearchDialog} onClose={cancelSearch}>
        <DialogTitle>Search</DialogTitle>
        <DialogContent
          style={{
            padding: "40px",
          }}>
          <div>
            <TextField
              id="outlined-basic"
              label="Customer Order Id"
              variant="outlined"
              name="customerOrderId"
              value={searchDataField.customerOrderId}
              onChange={handleSearchInputs}
              style={{ padding: "2px", margin: "4px" }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Customer Number"
              variant="outlined"
              name="customerNumber"
              value={searchDataField.customerNumber}
              onChange={handleSearchInputs}
              style={{ padding: "2px", margin: "4px" }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Sales Org"
              variant="outlined"
              name="salesOrg"
              value={searchDataField.dsalesOrg}
              onChange={handleSearchInputs}
              style={{ padding: "2px", margin: "4px" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={SearchData} color="primary" style={{ width: "50%" }}>
            Search
          </Button>
          <Button
            onClick={cancelSearch}
            color="primary"
            style={{ width: "50%" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <div>
          <Button
            className={classes.button}
            variant={activeButton === 1 ? "contained" : ""}
            onClick={() => handleButtonClick(1)}>
            HOME PAGE
          </Button>
          <Button
            className={classes.button}
            variant={activeButton === 2 ? "contained" : ""}
            onClick={() => handleButtonClick(2)}>
            ADD DATA
          </Button>
          <Button
            className={classes.button}
            variant={activeButton === 3 ? "contained" : ""}
            onClick={() => handleButtonClick(3)}>
            ANALYTIC VIEW
          </Button>
        </div>
        <div>
          <div style={{ display: "flex", gap: 2 }}>
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search Customer Order ID"
                inputProps={{ "aria-label": "Search Customer Order ID" }}
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Paper>

            <Button
              style={{ backgroundColor: "#8fd163" }}
              variant="contained"
              onClick={handleAdvanceSearch}>
              Advanced Search
            </Button>
          </div>
        </div>
      </div>
      <div style={{ padding: "10px 0" }}>{content}</div>
    </div>
  );
}

export default ButtonSwitch;
