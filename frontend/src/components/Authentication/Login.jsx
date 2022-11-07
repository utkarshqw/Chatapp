import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Login = () => {


    
const [email,setEmail] = useState("")
const [password, setPassword] = useState("")
const [show, setShow] = useState(false)
const [loading , setLoading] = useState(false)
const toast = useToast()
const navigate = useNavigate()


// function

const handleshowhide = () => {
    setShow(!show)
}



const submitHandler = () => {

  setLoading(true);
  if(!email || !password)
  {
    toast({
      title: 'Please fill all the fields',
      status: 'warning',
      duration: 2000,
      isClosable: true,
      position:"bottom"
    })
    setLoading(false)
    return;
  }

  try{

    axios.post("https://chat-app-two.onrender.com/api/user/login",{email,password})
    .then(res=>{
      toast({
        title: 'signin success',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position:"bottom"
      })
      localStorage.setItem("userInfo",JSON.stringify(res.data))
      setLoading(false)
      navigate("/chats")
    })

  }catch(err){
    toast({
      title: 'error occured!',
      status: 'error',
      duration: 4000,
      isClosable: true,
      position:"bottom"
    })
    setLoading(false)
  }
}


  return (
    <VStack spacing={"5x"}>
    
    
    <FormControl id="email" isRequired>
      <FormLabel>Email</FormLabel>
      <Input
      value={email}
      bg={"orange.100"}
       placeholder="Enter you email"
       onChange={(e)=>setEmail(e.target.value)}

       />
    </FormControl>


    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>


      <InputGroup>
      <Input
      value={password}
      bg={"orange.100"}
      type={show?"text":"password"}
       placeholder="Enter password"
       onChange={(e)=>setPassword(e.target.value)}

       />
       <InputRightElement w="4.5rem">
       <Button colorScheme={"orange"} onClick={handleshowhide} h="1.75rem" size={"sm"} >{show?"Hide":"Show"}</Button>
       </InputRightElement>
       </InputGroup>
    </FormControl>

   

   

    <Button
    colorScheme="orange"
    width="100%"
    style={{marginTop:15}}
    onClick={submitHandler}
    isLoading={loading}
    >
      Login
      
    </Button>

    <Button
    
    colorScheme={"orange"}
    color="white"
    mt="10px"
    
    width="100%"
    onClick={()=>{
        setEmail("guest@example.com");
        setPassword("123456")
    }}
    >
        Get Guest User Credentials
    </Button>
  </VStack>
  )
}

export default Login