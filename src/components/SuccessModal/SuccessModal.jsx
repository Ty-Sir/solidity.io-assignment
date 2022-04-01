import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Link,
  Box
} from '@chakra-ui/react';
import { networkConfigs } from '../../utils/networks';
import { ExternalLinkIcon } from '@chakra-ui/icons';
export default function SuccessModal({...props}){
  return(
    <>
      <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={2}>
              Successfully minted {props.amount} {props.amount > 1 ? "items" : "item"}!
            </Box>
            <Box>
              <Link color='green.500' href={`${networkConfigs["0x4"].blockExplorerUrl}/tx/${props.txHash}`} isExternal>
                View transaction on block explorer here <ExternalLinkIcon mb={1} />
              </Link>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}