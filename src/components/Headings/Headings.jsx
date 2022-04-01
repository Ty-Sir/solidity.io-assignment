import { 
  Heading, 
  Stack,
} from "@chakra-ui/react";

export default function Headings(){
  return(
    <Stack alignItems='center' height='fit-content'>
      <Heading 
        fontSize={{
          base: "4xl",
          sm: '6xl'
        }}>
        SOLIDITY.IO COLLECTION
      </Heading>
      <Heading 
        bgClip='text'
        bgGradient='radial-gradient(53.61% 9276799.71% at 50% -2450.49%, #95BD79 0.97%, #214129 76.96%)'
        fontSize={{
          base: "4xl",
          sm: '6xl'
        }}>
        META KEY
      </Heading>
      <Heading 
      w='full' 
      maxW="2xl"         
      fontSize={{
          base: "sm",
          sm: 'lg'
        }} color="gray.500">
        This company is dedicated to helping solve the climate crisis through the regenerative cultivation of the hemp plant.
      </Heading>
    </Stack>
  )
}