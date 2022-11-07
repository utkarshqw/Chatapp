import React from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'
import { ChatContext, ChatState } from '../components/Authentication/chatprovider'
import { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/miscellaneous/MyChats'
import ChatBox from '../components/miscellaneous/ChatBox'

const Chatpage = () => {

  
 const {user} =  useContext(ChatContext)
 const [fetchAgain,setFetchAgain] = useState(false)
 

  return (
    <div style={{width:"100%"}}>
      
      {user && <SideDrawer/>} 
      <Box
       display={"flex"}
       justifyContent="space-between"
       w={"100%"}
       h="91.5vh"
       p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain}/>} 
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>} 
      </Box>


    </div>
  )
}

export default Chatpage