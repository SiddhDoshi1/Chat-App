import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import NoChat from '../components/NoChat'
import { ChatContext } from '../context/ChatContext'

const Home = () => {
  const { data } = useContext(ChatContext)

  return (
    <div className="home">
      <div className="container">
        <Sidebar></Sidebar>
        {data.user && data.user.displayName ? <Chat></Chat>: <NoChat></NoChat>}
      </div>
    </div>
  )
}

export default Home