import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import { toast } from 'react-hot-toast';
import axios from 'axios';
const Header = () => {

  const {isAuthenticated,setisAuthenticated, loading, setloading} = useContext(Context);

  const logoutHandler = async () => {
    setloading(true);
    try {
      await axios.get(`${server}/users/logout`,
      {
        withCredentials:true,
      });
    toast.success("Logged out Successfully");
    setisAuthenticated(false);
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(true);
      setloading(false);
    }
  };

  return (
    <nav className='header'>
        <div>
            <h2>InfoTask</h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            {
              isAuthenticated ?  <Link to={"/profile"}>Profile</Link> : <Navigate to={"/login"}/> 
            }
            
            {
                isAuthenticated ? <button disabled={loading} className="btn" onClick={logoutHandler}>Logout</button> : <Link to="/login">Login</Link> 
            }
        </article>
    </nav>
  )
}

export default Header
