import { useMoralis, useNativeBalance } from "react-moralis";
import { Box, useBreakpointValue, Skeleton } from "@chakra-ui/react";

export default function NativeBalance() {
  const { data: balance } = useNativeBalance();
  const { user } = useMoralis();
  const isPhone = useBreakpointValue({ base: true, sm: false })

  return(
    <>
    {!user || isPhone ?
      null
      :
        <Box>
          {balance.formatted === null ? <Skeleton height='1.25rem' width="5rem" /> : balance.formatted}
        </Box>
     }
    </>
  );
}