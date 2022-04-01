import { useState, useEffect } from "react";
import { ethers } from "ethers";

const RINKEBY_NODE_URL = "https://speedy-nodes-nyc.moralis.io/cba5efa373bf0791c57253cb/eth/rinkeby";

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