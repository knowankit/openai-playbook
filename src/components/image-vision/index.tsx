import React from "react";
import { Button, Box, Typography } from "@mui/material";
import "@tldraw/tldraw/tldraw.css";
import Image from "next/image";
import { useRouter } from "next/router";

const ImageVision = () => {
  const router = useRouter();

  const defaultButtonStyle = {
    textTransform: "none",
    height: "200px",
    width: "200px",
    fontSize: "1rem"
  };

  const loadUI = () => {
    return (
      <>
        <Box height="30vh">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src="/assets/image/open-ai-2.png"
              height={150}
              width={150}
              alt="Open ai icon"
            />
            &nbsp;
            <Typography variant="h5" ml={1}>
              Vision
            </Typography>
          </Box>
        </Box>

        <Box height="70vh" width="100vw" bgcolor="black">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pt={4}
          >
            <Button
              variant="contained"
              sx={defaultButtonStyle}
              onClick={() => router.push("/image-vision/upload")}
            >
              Do you have the Image?
            </Button>
            <Button
              variant="contained"
              sx={{ ...defaultButtonStyle, ml: 2 }}
              onClick={() => router.push("/image-vision/draw")}
            >
              Draw and download the Image
            </Button>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
      width="100vw"
    >
      {loadUI()}
    </Box>
  );
};

export default ImageVision;
