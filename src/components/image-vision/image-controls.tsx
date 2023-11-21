import React, { useState, ChangeEvent } from "react";
import { Button, Box } from "@mui/material";
import ImageSkeleton from "@/components/image-generation/image-skeleton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import "@tldraw/tldraw/tldraw.css";

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

const ImageControls = () => {
  const [isLoading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState("");

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

  const generateHtml = async () => {
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
    console.log("response", result);
  };

  return (
    <>
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
          sx={{ textTransform: "none" }}
          variant="contained"
          disabled={!base64Image}
          color="secondary"
          onClick={generateHtml}
        >
          Generate HTML
        </Button>
      )}

      {isLoading && (
        <Box mt={4}>
          <ImageSkeleton />
        </Box>
      )}

      {base64Image && (
        <Box mt={2}>
          <img
            src={base64Image}
            alt="Uploaded"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </Box>
      )}
    </>
  );
};

export default ImageControls;
