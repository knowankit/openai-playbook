import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";

const EmailEditor = dynamic(() => import("@/components"), {
  ssr: false,
});

const EmailEditorPage = () => {
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
      <EmailEditor />
    </Box>
  );
};

export default EmailEditorPage;
