import { createStandaloneToast } from '@chakra-ui/react'

export function errorToast(title, message){
const toast = createStandaloneToast()
  
  toast({
    title: title,
    description: message,
    status: 'error',
    duration: 2500,
    isClosable: true,
    position: 'top-left'
  })
}

export function infoToast(title, message){
  const toast = createStandaloneToast()
    
    toast({
      title: title,
      description: message,
      status: 'info',
      duration: 2500,
      isClosable: true,
      position: 'top-left'
    })
  }
