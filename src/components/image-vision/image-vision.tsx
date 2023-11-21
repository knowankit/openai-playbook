import React, { useState } from "react";
import { Box } from "@mui/material";
import "@tldraw/tldraw/tldraw.css";
import { Tldraw } from "@tldraw/tldraw";
import ButtonControls from "@/components/image-vision/button-controls";
import ImageControls from "@/components/image-vision/image-controls";

const ImageVision = () => {
  const [view, setView] = useState<"draw" | "upload" | "">("");

  if (!view) {
    return <ButtonControls setView={setView} />;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
      width="100vw"
    >
      {view === "upload" && <ImageControls />}
      {view === "draw" && <Tldraw />}
    </Box>
  );
};

export default ImageVision;
