import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main';
import Loader from '../components/Loader';

const Profile = () => {

  
  const {isAuthenticated,loading,user} = useContext(Context);

  if(isAuthenticated) return <Navigate to={"/login"}/>;
  
  return 
    loading ? ( <Loader/> ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}

export default Profile
