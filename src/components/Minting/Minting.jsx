import { ethers } from "ethers";
import { useState, useEffect, useMemo } from "react";
import { useMoralis, useChain } from "react-moralis";
import { collection } from "../../abi/Rinkeby-NFT";
import { RinkebyCollectionAddress } from "../../Contract/NFTContract";
import { useSpeedyProvider } from "../../hooks/useSpeedyProvider";
import {
  Flex,
  IconButton,
  Center,
  Text,
  HStack,
  useColorModeValue,
  Heading,
  Stack,
  Button,  
  Spinner,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import { FiMinus, FiPlus } from 'react-icons/fi'
import { Floral, Stacks } from '../Designs/Designs';
import { errorToast, infoToast } from "../Toast/Toast";
import SuccessModal from "../SuccessModal/SuccessModal";

export default function Minting(){
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { web3 } = useMoralis();
  const { chainId, account } = useChain();
  const { provider } = useSpeedyProvider();
  const [signer, setSigner] = useState(null);

  const readInstance = useMemo(() => new ethers.Contract(RinkebyCollectionAddress, collection.abi, provider), [provider]);
  const writeInstance = useMemo(() => new ethers.Contract(RinkebyCollectionAddress, collection.abi, signer), [signer]);

  const [amountMinted, setAmountMinted] = useState(null);//make this a loader
  const [amountToMint, setAmountToMint] = useState(1);
  const [maxAmountToMint, setMaxAmountToMint] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [priceToMint, setPriceToMint] = useState(null);
  const [txHash, setTxHash] = useState('');
  
  const handleDecrement = () => setAmountToMint(amountToMint === 1 ? amountToMint : amountToMint - 1)
  const handleIncrement = () => setAmountToMint(amountToMint === maxAmountToMint ? amountToMint : amountToMint + 1)

  const handleSigner = async () =>{
    try {
      const signAccount = web3.getSigner();
      setSigner(signAccount);
    } catch (error) {
      errorToast('Error', error.message);
    }
  }

  useEffect(() => {
    if(signer === null && account) handleSigner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, account]);

  const getMaxAmountToMint = async () =>{
    try {
      const amount = await readInstance.maxMintAmount();
      setMaxAmountToMint(amount.toString());
    } catch (error) {
      errorToast('Error', error.message);
    }
  }

  useEffect(() => {
    if(provider !== null && maxAmountToMint === null) getMaxAmountToMint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, maxAmountToMint]);
  
  const getAmountMinted = async () =>{
    try {
      const amount = await readInstance.totalSupply();
      setAmountMinted(amount.toString());
    } catch (error) {
      errorToast('Error', error.message);
    }
  }

  useEffect(() => {
    if(provider !== null && amountMinted === null) getAmountMinted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, amountMinted]);

  const getPriceToMint = async () =>{
    try {
      const price = await readInstance.cost();
      const priceInEther = ethers.utils.formatEther(price);
      setPriceToMint(priceInEther);
    } catch (error) {
      console.log(error.message);
      errorToast('Error', error.message);
    }
  }

  useEffect(() => {
    if(provider !== null && priceToMint === null) getPriceToMint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, amountMinted]);

  const mintItems = async () => {
    if(chainId !== "0x4"){
      errorToast('Error', "Please connect wallet to Rinkeby to mint.");
      return null;
    }
    try {
      setIsMinting(true);
      const priceInEther = (amountToMint * priceToMint).toString();
      const priceInWei = ethers.utils.parseEther(priceInEther);
      const valueToSend = priceInWei.toString();
      const mint = await writeInstance.mint(amountToMint, {from: account, value: valueToSend });
      infoToast("Pending Tx", "Item being minted.");
      const result = await mint.wait();
      if(result.status === 1){
        setTxHash(result.transactionHash);
        onOpen();
        setIsMinting(false);
      }
    } catch (error) {
      errorToast('Minting Error', error.message);
      setIsMinting(false);
    }
  }

  return(
    <>
      <Flex
        flexDirection="row"
        h={'fit-content'}
        align={'center'}
        justify={'center'}
        justifyContent={isDesktop ? 'space-around' : 'center'}
        px={{
          base: '6',
          md: '8',
        }}
      >
        {isDesktop ? <Stacks width='250px' /> : null}
        <Stack
          spacing={4}
          w={'full'}
          maxW={'sm'}
          rounded={'xl'}
          h='fit-content'
          p={6}
          my={10}
          textAlign='center'
          bgGradient={useColorModeValue('linear(to-t, white, gray.300)','linear(to-t, gray.800, gray.700)')}
        >
          <Heading>
            {amountMinted === null ? <Spinner thickness='4px' color='green.500' /> : amountMinted}/10000
          </Heading>
          <Heading color={useColorModeValue('gray.600', 'gray.400')} size="md">
            Price:{' '}
            {priceToMint === null ? 
              <Spinner thickness='4px' color='green.500' /> 
              : 
              Math.floor((priceToMint * amountToMint) * 100 )/ 100
            } ETH
          </Heading>
          <HStack
            px="2"
            py="0.4375rem"
            justifyContent='center'
          >
            <IconButton
              size="md"
              fontSize="2xl"
              variant="outline"
              colorScheme='green'
              _focus={{
                boxShadow: 'none',
              }}
              _focusVisible={{
                boxShadow: 'outline',
              }}
              onClick={handleDecrement}
              icon={<FiMinus />}
              isDisabled={amountToMint === 1}
              aria-label="Decrement"
            />
            <Center minW="8">
              <Text as="span" fontWeight="semibold" userSelect="none">
                {amountToMint}
              </Text>
            </Center>
            <IconButton
              size="md"
              fontSize="2xl"
              variant="outline"
              colorScheme='green'
              _focus={{
                boxShadow: 'none',
              }}
              _focusVisible={{
                boxShadow: 'outline',
              }}
              onClick={handleIncrement}
              icon={<FiPlus />}
              isDisabled={amountToMint === 20}
              aria-label="Increment"
            />
          </HStack>
          <Button
            isLoading={isMinting}
            loadingText='Minting'
            colorScheme='green'
            variant="outline"
            size='lg'
            rounded='2xl'
            onClick={mintItems}
          >
            Mint
          </Button>
        </Stack>
        {isDesktop ? <Floral width='250px' /> : null}
      </Flex>
      {isDesktop ? 
        null 
        : 
        <Flex justifyContent="center">
          <Floral width='150px' />
        </Flex>
      }
      <SuccessModal onClose={onClose} isOpen={isOpen} amount={amountToMint} txHash={txHash} />
    </>
  );
}
