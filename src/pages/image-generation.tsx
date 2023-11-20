import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Image from "next/image";

const ImageGeneration = () => {
  const [searchText, setSearchText] = useState("");
  const [imageData, setImageData] = useState<any>({});

  const handleSearch = async () => {
    // Add your logic here for generating images based on the search text
    console.log(`Generating images for: ${searchText}`);

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

      {imageData.url && (
        <>
          <Box mt={4}>
            <Box
              component="img"
              src={imageData.url}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </Box>
          <Box width="36rem">
            <Typography>{imageData.revised_prompt}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ImageGeneration;
