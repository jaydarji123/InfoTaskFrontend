import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import { Context, server } from './main';
import axios from 'axios';


function App() {

  const { setuser, setisAuthenticated, setloading} = useContext(Context);

  useEffect(() => {
    setloading(true);
    axios.get(`${server}/users/me`,{
      withCredentials:true,
    })
    .then((res) => {
      setuser(res.data.user);
      setisAuthenticated(true);
      setloading(false);
    })
    .catch((error) => {
      setuser({});
      setisAuthenticated(false);
      setloading(false);
    });
  }, []);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App
