import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import "src/styles/globals.css";
import theme from "../styles/theme";
import NextNProgress from "nextjs-progressbar";
import ErrorBoundary from "@/pages/error-boundary";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <NextNProgress color="#00AB55" />
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </SessionProvider>
  );
}
