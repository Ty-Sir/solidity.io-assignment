
import { getEllipsisTxt } from "../../utils/formatters";
import { getExplorer } from "../../utils/networks";
import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Stack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useMoralis } from "react-moralis";
import NativeBalance from "../NativeBalance/NativeBalance";
import { Chains } from "../Chains/Chains";
import { Tooltip } from "@chakra-ui/tooltip";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { VscDebugDisconnect } from 'react-icons/vsc';
import { BiCopy } from 'react-icons/bi';
import { CheckIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
import { networkConfigs } from "../../utils/networks";
import { useClipboard } from "@chakra-ui/hooks";

export default function Account() {
  const { chainId, logout, user, account } = useMoralis();
  const { hasCopied, onCopy } = useClipboard(account);
  const toast = useToast();

  const chainMessage = networkConfigs[chainId] ? null : "Unsupported Chain.";

  return (
    <>
      <Menu>
      <Tooltip label={chainMessage} fontSize='md'>
        <MenuButton
          bg={useColorModeValue('white', 'gray.700')}
          as={Button}
          rounded="2xl"
          boxShadow="base"
          cursor={'pointer'}
        >
          <Flex alignItems={'center'}>
            <Stack direction='row'>
              <Box>{getEllipsisTxt(user.get('ethAddress'), 4)}</Box>
              <Box className="ifSmall"><Divider orientation='vertical' /></Box>
              <NativeBalance />
            </Stack>
            <Box ml={1} className="ifSmall"><Chains /></Box>
          </Flex>
        </MenuButton>
      </Tooltip>
        <MenuList rounded="lg" alignItems={'center'}>
          <MenuItem
            icon={hasCopied ? <CheckIcon color="green" /> : <BiCopy />}
            rounded="lg"
            fontWeight="600"
            onClick={() => {
              onCopy();
              toast({
                status: 'success',
                title: 'Address Copied',
                position: 'top',
                isClosable: true,
                duration: 2000
              })
            }} 
          >
            Copy Address
          </MenuItem>
          <MenuItem
            as="a"
            icon={<ExternalLinkIcon />}
            rounded="lg"
            fontWeight="600"
            href={`${getExplorer(chainId)}/address/${user.get('ethAddress')}`}
            target="_blank" 
            rel="noreferrer"
          >
            <Box>
              View on Explorer 
            </Box>
          </MenuItem>
          <MenuItem
            icon={<VscDebugDisconnect />}
            rounded="lg"
            fontWeight="600"
            onClick={async () => {
              await logout();
              window.localStorage.removeItem("connectorId");
            }}>
              Disconnect Wallet
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
