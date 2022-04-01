import {
  Box,
  Container,
  Flex,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import Connect from '../Account/Connect';
import { useMoralis } from 'react-moralis';
import Account from "../Account/Account";

export const Navbar = () => {
  const { user, isAuthenticated } = useMoralis();

  return (
    <Box
      as="nav"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
    >
      <Container
        maxW="100%"
        py={{
          base: '3',
          lg: '4',
        }}
      >
        <Flex justify="flex-end">
          <HStack spacing="4">
            {user && isAuthenticated ? <Account /> : <Connect />}
            <ColorModeSwitcher rounded="2xl" justifySelf="flex-end" />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}