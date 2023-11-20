import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";

const Home = dynamic(() => import("@/components/home"), {
  ssr: false
});

const HomePage = () => {
  return (
    <Box
      sx={{
        height: "100vh"
      }}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <Home />
    </Box>
  );
};

export default HomePage;
