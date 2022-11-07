import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Search2Icon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { ChatContext } from "../Authentication/chatprovider";
import Profilemodal from "./Profilemodal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import NotificationBadge,{Effect} from "react-notification-badge"


const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const navigate = useNavigate();
  const { user ,setSelectedChat, chats, setChats,notification,setNotification } = useContext(ChatContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "please write something in the search",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `https://chat-app-two.onrender.com/api/user/allusers?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      toast({
        title: "Error occured!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const accessChat = async (userId) => {
    
    
    
    
    try {


      const config = {
        headers:{

            Authorization:`Bearer ${user.token}`
        }
       }

      console.log(userId)
       setLoadingChat(true)
       
       
        
      

      const {data} = await   axios.post(`https://chat-app-two.onrender.com/api/chat`,{userId},config)
       console.log(data)
      if(!chats.find(elem=>elem._id === data._id)) 
      {
          setChats([data,...chats])
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onClose()


    } catch (err) {
        
        toast({
            title: "Error occured!!!!",
            description:err.message,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        bg="white"
        w={"100%"}
        p="5px 10px 5px 10px"
        borderWidth={"5px"}
      >
        <Tooltip
          placement="bottom-end"
          hasArrow="true"
          label="Search User to chat"
        >
          <Button onClick={onOpen} variant={"ghost"}>
            <Search2Icon />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          Chat-App
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
              />
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <Profilemodal user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profilemodal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((elem,i) => (
                <UserListItem
                
                  key={i}
                  user={elem}
                  handleFunction={() => accessChat(elem._id)}
                />
              //   <Box
              //   onClick={()=>accessChat(elem._id.toString())}
              //   cursor="pointer"
              //   bg="#E8E8E8"
              //   _hover={{
              //     background: "#38B2AC",
              //     color: "white",
              //   }}
              //   w="100%"
              //   display="flex"
              //   alignItems="center"
              //   color={"black"}
              //   px={3}
              //   py={2}
              //   mb={2}
              //   borderRadius="lg"
              //   key={i}
              // >
              //   <Avatar
              //     mr={2}
              //     cursor="pointer"
              //     name={elem.name}
              //     src={elem.pic}
              //     size="sm"
              //   />
          
              //   <Box>
              //     <Text>{elem.name}</Text>
              //     <Text fontSize="xs">
              //       <b>Email : </b>
              //       {elem.email}
              //     </Text>
              //   </Box>
              // </Box>
              ))
            )}
            {loadingChat && <Spinner ml="auto" display={"flex"}/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
