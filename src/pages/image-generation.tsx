import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import ImageSkeleton from "@/components/image-generation/image-skeleton";
import ImageIcon from "@mui/icons-material/Image";

const ImageGeneration = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);

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
      body: JSON.stringify({ searchText })
    });

    const result = await response.json();

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
          <Box pt={4} display="flex" justifyContent="center">
            <Box
              component="img"
              src={imageData.url}
              width={500}
              height={500}
              alt="generated image"
            />
          </Box>
          <Box width="36rem">
            <Typography>{imageData.revised_prompt}</Typography>
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
        height="30vh"
        width="100vw"
      >
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
      <Box height="70vh" color="white" bgcolor="black">
        {getImageOrPlaceHolder()}
      </Box>
    </>
  );
};

export default ImageGeneration;
