import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Homepage = () => {

  const naviagate = useNavigate()

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"))

    if(user){
      naviagate("/chats")
    }
  },[naviagate])

  return (
    <Container>
      <Box
        d="flex"
        justifyContent={"center"}
        p={3}
        bg="orange.100"
      
        w="100%"
        m={"40px 0 15px 0"}
        borderRadius="lg"
        borderWidth={"1px"}
      >
        <Text fontWeight={900} color="orange.500" fontSize={"4xl"} fontFamily="Work sans" align={"center"}>
          Chat-App
        </Text>
      </Box>

      <Box bg={"white"} w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="orange">
          <TabList mb={"0em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>

            <Login/>

            </TabPanel>
            <TabPanel>

              <Signup/>

            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
