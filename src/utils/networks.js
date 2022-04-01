export const networkConfigs = {
  "0x4": {
    chainId: 4,
    chainName: "Rinkeby Test Network",
    currencyName: "ETH",
    currencySymbol: "ETH",
    rpcUrl: "https://rinkeby.infura.io/v3/",
    blockExplorerUrl: "https://rinkeby.etherscan.io",
  },
}

export const getExplorer = (chain) => networkConfigs[chain]?.blockExplorerUrl;
