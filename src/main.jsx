import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root';
import { AuthContextProvider } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    </ChatContextProvider>
  </AuthContextProvider>
)
