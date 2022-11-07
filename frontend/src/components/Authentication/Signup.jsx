import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast, VStack } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";



const url = "upload:https://api.cloudinary.com/v1_1/dknaigwrs/image/upload"

const Signup = () => {

const [name, setName] = useState("")
const [email,setEmail] = useState("")
const [confirmpassword, setConfirmpassword] = useState("")
const [password, setPassword] = useState("")
const [pic, setPic] = useState()
const [show, setShow] = useState(false)
const [loading, setLoading] = useState(false)
const navigate = useNavigate()

const [data,setData] = useState()

const toast = useToast()

// function

const handleshowhide = () => {
    setShow(!show)
}

const postDetails = (pics) => {
   setLoading(true)
   if(pics==undefined)
   {
    toast({
      title: 'Pic undefined',
      status: 'warning',
      duration: 1000,
      isClosable: true,
      position:"bottom"
    })
    return
   }

   if(pics.type === "image/jpeg" || pics.type === "image/png")
   {
     const data = new FormData();
     data.append("file",pics);
     data.append("upload_preset","chat-app");
     data.append("cloud_name","dknaigwrs")

     fetch("https://api.cloudinary.com/v1_1/dknaigwrs/image/upload",{
      method: "POST",
      body: data
     }).then(res=>res.json())
     .then(data=>{
      setPic(data.url.toString());
      console.log(data.url.toString())
      setLoading(false)
     })
     .catch((err)=>{
      console.log(err);
      setLoading(false)
     })
   }
   else{
    toast({
      title: 'Pic Select an image',
      status: 'warning',
      duration: 1000,
      isClosable: true,
      position:"bottom"
    })
    setLoading(false)
    return;
   }
}

const submitHandler = async () => {

  setLoading(true);
  if(!name || !email || !password || !confirmpassword){
    toast({
      title: 'Please fill all the fields',
      status: 'warning',
      duration: 1000,
      isClosable: true,
      position:"bottom"
    })
    setLoading(false);
    return;
  }

  if(password !== confirmpassword)
  {
    toast({
      title: 'Please fill all the fields',
      status: 'warning',
      duration: 1000,
      isClosable: true,
      position:"bottom"
    })
    return;
  }

  try{
    const config = {
      headers:{
        "Content-type":"application/json",
      },
    };

    // const {data} = await axios.post("http://localhost:5000/api/user",{name,email,password,pic})
     await axios.post("https://chat-app-two.onrender.com/api/user",{name,email,password,pic}).then(res=>{
      setData(res.data)
      console.log(res)
    })
     
    toast({
      title: 'signup success',
      status: 'success',
      duration: 4000,
      isClosable: true,
      position:"bottom"
    })

    localStorage.setItem("userInfo",JSON.stringify(data))

    setLoading(false)
    // navigate("/chats")

       
  }catch(err){
     // user toast here
     console.log(err)
     toast({
      title: 'error',
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
      
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
        bg={"orange.100"}
         placeholder="Enter you name"
         onChange={(e)=>setName(e.target.value)}

         />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
        bg={"orange.100"}
         placeholder="Enter you email"
         onChange={(e)=>setEmail(e.target.value)}

         />
      </FormControl>


      <FormControl id="password" isRequired>
        <FormLabel>Set Password</FormLabel>


        <InputGroup>
        <Input
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

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>


        <InputGroup >
        <Input
        bg={"orange.100"}
        type={show?"text":"password"}
         placeholder="Confirm password"
         onChange={(e)=>setConfirmpassword(e.target.value)}

         />
         <InputRightElement w="4.5rem">
         <Button colorScheme={"orange"} onClick={handleshowhide} h="1.75rem" size={"sm"} >{show?"Hide":"Show"}</Button>
         </InputRightElement>
         </InputGroup>
      </FormControl>

      <FormControl id="pic">
       <FormLabel>Upload you picture</FormLabel>
       <Input
       
       variant="filled"
        bg={"orange.100"}
       type={"file"}
       p={1.5}
       accept="image/*"
       onChange={(e)=>postDetails(e.target.files[0])}
       />
      </FormControl>

      <Button
      colorScheme={"orange"}
      width="100%"
      style={{marginTop:15}}
      onClick={submitHandler}
      isLoading={loading}
      >
        Signup
        
      </Button>
    </VStack>
  );
};

export default Signup;
