import Metamask from "./WalletIcons/metamaskWallet.png";
import WalletConnect from "./WalletIcons/wallet-connect.svg";

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
    chains: [
      'ETH (Rinkeby)',
    ],
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
    chains: [
      'ETH (Rinkeby)',
    ],
  }
];