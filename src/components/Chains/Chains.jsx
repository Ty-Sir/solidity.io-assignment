import { useChain } from "react-moralis";
import { ETHLogo, UnsupportedLogo } from "./Logos";

export function Chains() {
  const { chainId } = useChain();
  if(!chainId){
    return null;
  } else if(chainId === "0x4") {
    return <ETHLogo />;
  } else {
    return <UnsupportedLogo />;
  }
}
