import { Button, Box, Typography } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import ImageSkeleton from "@/components/image-generation/image-skeleton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import "@tldraw/tldraw/tldraw.css";
import Image from "next/image";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import CodeHighlight from "@/components/code-highlight";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

const Upload = () => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState("");
  const [codes, setCodes] = useState<any>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setLoading(true);
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert the uploaded image to base64
        setBase64Image(reader.result as string);
      };

      reader.readAsDataURL(file);
    }

    setLoading(false);
  };

  const askAi = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/api/generate-vision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        base64Image
      })
    });

    const result = await response.json();

    if (
      result &&
      result[0] &&
      result[0]["message"] &&
      result[0]["message"]["content"]
    ) {
      setCodes(result[0]["message"]["content"]);
    }
    setLoading(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ImageControls = (
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
        <Box display="flex" alignItems="center" justifyContent="center" pt={4}>
          <Button
            component="label"
            variant="contained"
            sx={{ textTransform: "none" }}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              accept="image/*"
              type="file"
              onChange={handleFileUpload}
            />
          </Button>
          {base64Image && (
            <Button
              sx={{ textTransform: "none", ml: 2 }}
              variant="contained"
              disabled={!base64Image}
              color="secondary"
              onClick={askAi}
            >
              Get HTML
            </Button>
          )}
          {codes && (
            <Button
              sx={{ textTransform: "none", ml: 2 }}
              variant="contained"
              disabled={!base64Image}
              color="secondary"
              onClick={() => setOpen(true)}
            >
              Show codes
            </Button>
          )}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          {isLoading && (
            <Box mt={4}>
              <ImageSkeleton />
            </Box>
          )}

          {base64Image && !isLoading && (
            <Box mt={2}>
              <img
                src={base64Image}
                alt="Uploaded"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
      width="100vw"
    >
      {ImageControls}
      {open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Optional sizes</DialogTitle>
          <DialogContent>
            <CodeHighlight code={codes} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Upload;
