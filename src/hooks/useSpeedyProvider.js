import { useState, useEffect } from "react";
import { ethers } from "ethers";

const RINKEBY_NODE_URL = process.env.REACT_APP_RINKEBY_NODE_URL;

export function useSpeedyProvider() {
  const [provider, setProvider] = useState(null);

  const handleSetProvider = () => {
    const speedyNodeProvider = new ethers.providers.JsonRpcProvider(RINKEBY_NODE_URL);
    setProvider(speedyNodeProvider);
  }

  useEffect(() => {
    if(provider === null) handleSetProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  return { provider };
}