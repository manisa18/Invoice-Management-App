import React, { useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Button, TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  filled: {
    margin: theme.spacing(1),
    backgroundColor: "white",
  },
  button: {
    margin: theme.spacing(1),
    color: "#ffff",
    "&:hover": {
      backgroundColor: "#fc7500",
    },
  },
}));

const AnalyticsView = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [distributionChannel, setDistributionChannel] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  const getDistributionChannelData = () => {
    const totals = {};
    data.forEach((item) => {
      const orderAmount = parseFloat(item.OrderAmount);
      if (totals[item.DistributionChannel]) {
        totals[item.DistributionChannel] += orderAmount;
      } else {
        totals[item.DistributionChannel] = orderAmount;
      }
    });

    const filteredTotals = Object.entries(totals).reduce(
      (acc, [channel, amount]) => {
        if (amount > 0) {
          acc[channel] = amount;
        }
        return acc;
      },
      {}
    );
    console.log(filteredTotals);

    // Prepare data for the chart
    const categories = Object.keys(filteredTotals);
    const seriesData = Object.values(filteredTotals);

    return {
      chart: {
        type: "column",
      },
      title: {
        text: "Distribution Channel",
      },
      xAxis: {
        categories: categories,
        title: {
          text: "Distribution Channel",
        },
      },
      yAxis: {
        title: {
          text: "Total Amount",
        },
      },
      series: [
        {
          name: "Total Amount",
          data: seriesData,
        },
      ],
    };
  };

  const getInvoiceStatusData = () => {
    const totals = {};
    data.forEach((item) => {
      const orderAmount = parseFloat(item.OrderAmount);
      if (totals[item.DistributionChannel]) {
        totals[item.DistributionChannel] += orderAmount;
      } else {
        totals[item.DistributionChannel] = orderAmount;
      }
    });

    const filteredTotals = Object.entries(totals).reduce(
      (acc, [channel, amount]) => {
        if (amount > 0) {
          acc[channel] = amount;
        }
        return acc;
      },
      {}
    );
    console.log(filteredTotals);

    return {
      chart: {
        type: "pie",
      },
      title: {
        text: "Invoice Status",
      },
      series: [
        {
          name: "Invoice Status",
          data: Object.entries(filteredTotals).map(([channel, amount]) => ({
            name: channel,
            y: amount,
          })),
        },
      ],
    };
  };

  const handleFilter = async () => {
    console.log(distributionChannel);
    try {
      const response = await axios.get(
        `http://localhost:8080/h2h_milestone_3/AnalyticView?distributionChannel=${distributionChannel}&customerNumber=${customerNumber}`
      );
      const tempData = response.data; // Get the data property from the response
      console.log(tempData);
      if (Array.isArray(tempData)) {
        setData(tempData);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    getDistributionChannelData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <div style={{ border: "2px solid #ffff" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}>
            <TextField
              className={classes.filled}
              id="search-bar"
              label="Distribution Channel"
              value={distributionChannel}
              onChange={(e) => setDistributionChannel(e.target.value)}
            />
            <TextField
              className={classes.filled}
              id="search-bar"
              label="Customer Number"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
            />
            <Button
              className={classes.button}
              variant="outlined"
              onClick={handleFilter}>
              View
            </Button>
          </div>
        </div>
      </div>
      {data.length > 0 ? (
        <div>
          <div id="chartContainer">
            <h2 style={{ textAlign: "center", color: "#ffff" }}>
              Total Amount per Distribution Channel
            </h2>
            <HighchartsReact
              highcharts={Highcharts}
              options={getDistributionChannelData()}
            />
          </div>
          <div>
            <h2 style={{ textAlign: "center", color: "#ffff" }}>
              Invoices Status
            </h2>
            <HighchartsReact
              highcharts={Highcharts}
              options={getInvoiceStatusData()}
            />
          </div>
        </div>
      ) : (
        <p style={{ color: "#ffff" }}>Loading data...</p>
      )}
    </div>
  );
};

export default AnalyticsView;
