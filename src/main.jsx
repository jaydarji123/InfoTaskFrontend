import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles/app.scss";
import { createContext } from 'react';

export const server = "https://taskinfo.onrender.com/api/v1";

export const Context = createContext({ isAuthenticated: false});

const AppWrapper = () => {

  const [isAuthenticated,setisAuthenticated] = useState(false);
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState({});

  return (
    <Context.Provider value={{isAuthenticated,setisAuthenticated,loading,setloading,user,setuser}}>
      <App/>
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
