import React, { useState, createContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState('light')
    const [refresh, setRefresh] = useState(false)
  
    return (
      <UserContext.Provider value={{ user, setUser, refresh, setRefresh }}>
        {children}
      </UserContext.Provider>
    )
  }