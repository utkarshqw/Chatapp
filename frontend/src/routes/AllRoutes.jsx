import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chatpage from '../pages/Chatpage'
import Homepage from '../pages/Homepage'

const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/chats" element={<Chatpage/>}/>
    </Routes>
    </>
  )
}

export default AllRoutes