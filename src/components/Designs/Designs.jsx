import { 
  Image,
} from "@chakra-ui/react";
import floral from '../../FigmaDesigns/floral.png'
import stacks from '../../FigmaDesigns/stacks.png'

export const Floral = ({...props}) => {
  return(
    <Image {...props} src={floral} alt="floral design" />
  )
}

export const Stacks = ({...props}) => {
  return(
    <Image {...props} src={stacks} alt="stacked design" />
  )
}