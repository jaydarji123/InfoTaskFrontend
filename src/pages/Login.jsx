import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';


const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {isAuthenticated,setisAuthenticated,loading,setloading} = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();  /*used for page not loading */
    setloading(true);
    try {
      const {data} = await axios.post(`
      ${server}/users/login`,
      {
        email,password,
      },
      { 
        headers: { 
          "Content-Type": "application/json",
        },
        withCredentials:true,
      });
      toast.success(data.message);
      setisAuthenticated(true);
      setloading(false);
    
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(false);
      setloading(false);
    }
  };


  if(isAuthenticated) return <Navigate to={"/"}/>;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required/>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' required/>
          <button disabled={loading} type='sibmit'>Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login