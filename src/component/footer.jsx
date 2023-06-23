import React from "react";
import { Box } from "@material-ui/core";

function Footer() {
  return (
    <div className="Footer">
      <Box
        sx={{
          textAlign: "center",
          py: 1,
          border: "3px solid orange",
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#fff",
          zIndex:"-1",
        }}>
        <p>
          <span style={{ color: "#fc7500" }}>Privacy Policy</span>
          <span> | &copy; HighRadius Corporation. All rights reserved.</span>
        </p>
      </Box>
    </div>
  );
}

export default Footer;
