import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../Authentication/chatprovider'
import axios from "axios"
import { useEffect } from 'react'
import {AddIcon} from "@chakra-ui/icons"
import ChatLoading from '../ChatLoading'
import { getSender } from '../../config/ChatLogics'             
import GroupChatModal from './GroupChatModal'


const MyChats = ({fetchAgain}) => {
    const [loggedUser, setLoggedUser] = useState("")
    const {user,setUser,selectedChat, setSelectedChat,chats, setChats} =  useContext(ChatContext)
     const toast = useToast()


       


     const fetchChats = async () => {
        try{
        const config = {
            headers:{
                Authorization:`Bearer ${user.token}`,
            },
        };
        const {data} = await axios.get("https://chat-app-two.onrender.com/api/chat",config);
        console.log(data)

      
        setChats(data)

        }catch(err){
           toast({
            title:"Error occured",
            description:err.message,
            status:"error",
            duration:3000,
            isClosable:true,
             
           })
        }
     }

     useEffect(()=>{
     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
     fetchChats();
     },[fetchAgain])
  return (
   <Box
   d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
   flexDir="column"
   alignItems="center"
   p={3}
   bg="white"
   w={{ base: "100%", md: "31%" }}
   borderRadius="lg"
   borderWidth="1px"
   >
   
   <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

        <Box
        display={"flex"}
        flexDir={"columnj"}
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY={"hidden"}
        >
       {chats?(

        <Stack  overflowY="scroll">
            {
                chats.map((elem,i)=>(
                    <Box
                    
                     onClick={()=>{
                        console.log(elem)
                        setSelectedChat(elem)}}
                     cursor="pointer"
                     bg={selectedChat===elem? "#38B2AC" : "#E8E8E8"}
                     color={selectedChat === elem? "white": "black"}
                  
                     px={3}
                     py={2}
                     
                     borderRadius="lg"
                     key={i}
                     >
                        <Text>{!elem.isGroupChat? getSender(loggedUser, elem.users):(elem.chatName)}</Text>
                 
                             {/* <Text>{elem.name}</Text> */}
                    </Box>
                ))
            }
        </Stack>
        


       ):(<ChatLoading/>)
    }
        </Box>


   </Box>
  )
}

export default MyChats