import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import ImageSkeleton from "@/components/image-generation/image-skeleton";
import ImageIcon from "@mui/icons-material/Image";
import Image from "next/image";
import ModelRadioGroup from "@/components/image-generation/ai-model-radio-buttons";
import ResolutionRadioGroup from "@/components/image-generation/resolution-radio-buttons";
import { ResolutionType } from "@/types/image-generation";

const ImageGeneration = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [resolution, setResolution] = useState<ResolutionType>("256x256");
  const [model, setModel] = useState("dall-e-2");

  const [imageData, setImageData] = useState<any>({});

  const handleSearch = async () => {
    // Add your logic here for generating images based on the search text
    setLoading(true);
    setImageData({});

    const response = await fetch("http://localhost:3000/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ searchText, resolution, model })
    });

    const result = await response.json();

    if (result["error"]) {
      setLoading(false);

      if (result["error"]["code"] === "invalid_size") {
        alert("Size is not supported with this model");
      }

      return;
    }

    if (Array.isArray(result)) {
      setImageData(result[0]);
    }

    setLoading(false);
  };

  const getImageOrPlaceHolder = () => {
    if (isLoading) {
      return (
        <Box
          pt={4}
          height="inherit"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ImageSkeleton />
        </Box>
      );
    }

    if (imageData.url) {
      return (
        <>
          <Box
            pt={4}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              component="img"
              src={imageData.url}
              width={500}
              height={500}
              alt="generated image"
            />
            <Box width="36rem" textAlign="center">
              <Typography>{imageData.revised_prompt}</Typography>
            </Box>
          </Box>
        </>
      );
    }

    return (
      <Box display="flex" justifyContent="center">
        <ImageIcon sx={{ fontSize: "32rem" }} />
      </Box>
    );
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        height="28rem"
        width="100vw"
      >
        <Box display="flex" alignItems="center">
          <Image
            src="/assets/image/open-ai-2.png"
            height={150}
            width={150}
            alt="Open ai icon"
          />
          &nbsp;
          <Typography variant="h5" ml={1}>
            Image generation
          </Typography>
        </Box>
        <Box>
          <TextField
            label="Search"
            autoComplete="off"
            size="small"
            variant="outlined"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            sx={{ marginRight: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={searchText.length < 3}
            sx={{ textTransform: "none" }}
          >
            Generate Image
          </Button>
        </Box>
        <Box display="flex" flexDirection="column">
          <ModelRadioGroup value={model} onChange={setModel} />
          <ResolutionRadioGroup value={resolution} onChange={setResolution} />
        </Box>
      </Box>
      <Box minHeight="28rem" color="white" bgcolor="black">
        {getImageOrPlaceHolder()}
      </Box>
    </>
  );
};

export default ImageGeneration;
