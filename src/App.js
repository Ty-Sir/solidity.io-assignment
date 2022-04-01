import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
} from '@chakra-ui/react';
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import { Navbar } from './components/Navbar/NavBar';
import Minting from "./components/Minting/Minting";
import Headings from "./components/Headings/Headings";
import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

function App() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
  const theme = extendTheme({ config });

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading]);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Box fontSize="xl">
        <Grid textAlign="center" p={10} minH="90vh">
          <Headings />
          <Minting />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
