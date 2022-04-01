import { connectors } from "./config";
import { useDisclosure } from "@chakra-ui/hooks";
import { Text, SimpleGrid, Box, Center} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { useState} from "react";
import { Button } from "@chakra-ui/button";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from "@chakra-ui/modal";
import { HStack } from "@chakra-ui/react";
import { networkConfigs } from "../../utils/networks";
import { useMoralis, useChain } from "react-moralis";
import { AiOutlineWallet } from 'react-icons/ai'

const ethereum = window.ethereum;

export default function Connect(){
  const OverlayOne = () => (
    <ModalOverlay
     bg='blackAlpha.300'
      backdropFilter='blur(10px)'
    />
  )
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />)
  const { authenticate } = useMoralis();
  const { chainId } = useChain();

  const switchNetworkOrAddToMetamask = async (chainCon) => {
    const chainHex = chainCon;
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainHex }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainHex,
                chainName: networkConfigs[chainHex].chainName,
                nativeCurrency: {
                  name: networkConfigs[chainHex].currencyName,
                  symbol: networkConfigs[chainHex].currencySymbol,
                  decimals: 18
                },
                rpcUrls: [networkConfigs[chainHex].rpcUrl],
                blockExplorerUrls: [networkConfigs[chainHex].blockExplorerUrl],
              },
            ],
          });
        } catch (addError) {
          console.log(addError)
        }
      }
      console.log(switchError)
    }
  }

  const connect = async (connectorId) => {
    try {
      onClose();
      const chainToConnect = 4;
      await authenticate({ provider: connectorId, chainId: chainToConnect, signingMessage: "Welcome!" });
      if(connectorId === 'injected' && chainId !== chainToConnect) switchNetworkOrAddToMetamask("0x" + chainToConnect.toString(16));
      window.localStorage.setItem("connectorId", connectorId);
    } catch (e) {
      console.error(e);
    }
  }

  return(
    <>
    <Button
      colorScheme="green"
      variant='outline'
      rounded='2xl'
      mr={2}
      onClick={() => {
        setOverlay(<OverlayOne />)
        onOpen()
      }}
    >
      <Box mr={1}>Connect</Box> 
      <AiOutlineWallet />
    </Button>
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent>
        <ModalHeader>
          <Center>
            Connect Wallet
          </Center>
        </ModalHeader>
        <ModalBody>
        <SimpleGrid
          columns={1}
          spacing={15}
          padding={30}
        >
          {connectors.map(({ title, icon, connectorId, chains }, key) => (
            <Box
              padding="2"
              borderRadius="5"
              key={key}
            >
              <Center>
                <Image boxSize='36px' src={icon} alt={title} />
              </Center>
              <Center>
                <Text fontSize='sm' textAlign="center">{title}</Text>
              </Center>
              <Center>
              <HStack>
                {chains.map((chain, idx) => (
                  <Button
                    my={5}
                    size="sm" 
                    onClick={async () => connect(connectorId)} 
                    key={idx}
                    >
                      {chain}
                  </Button>
                ))}
              </HStack>
              </Center>
            </Box>
          ))}
        </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
  );
}