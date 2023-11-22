import React from "react";
import { Box } from "@mui/material";
import "@tldraw/tldraw/tldraw.css";
import dynamic from "next/dynamic";

const Tldraw = dynamic(async () => (await import("@tldraw/tldraw")).Tldraw, {
  ssr: false
});

const ImageDraw = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
      width="100vw"
    >
      <Tldraw />;
    </Box>
  );
};

export default ImageDraw;
