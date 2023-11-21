import React, { useState, ChangeEvent } from "react";
import { Button, Box, Typography } from "@mui/material";

const defaultButtonStyle = {
  textTransform: "none",
  height: "200px",
  width: "200px",
  fontSize: "1rem"
};

interface IButtonControls {
  setView: (value: any) => void;
}

const ButtonControls = ({ setView }: IButtonControls) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
      width="100vw"
    >
      <Typography variant="h3">AI Vision</Typography>
      <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          sx={defaultButtonStyle}
          onClick={() => setView("upload")}
        >
          Do you have the Image?
        </Button>
        <Button
          variant="contained"
          sx={{ ...defaultButtonStyle, ml: 2 }}
          onClick={() => setView("draw")}
        >
          Draw and download the Image
        </Button>
      </Box>
    </Box>
  );
};

export default ButtonControls;
