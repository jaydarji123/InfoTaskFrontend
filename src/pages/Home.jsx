import React, { useContext, useEffect, useState } from 'react'
import {  Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';

const Home = () => {

  const [title,settitle] = useState("");
  const [description,setdescription] = useState("");
  const [loading,setloading] = useState(false);
  const [tasks,settasks] = useState([]);
  const [refresh,setrefresh] = useState(false);

  const {isAuthenticated} = useContext(Context);

  const updateHandler = async (id) => {

    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},
        {
          withCredentials:true,
        }
      )
      toast.success(data.message);
      setrefresh(p=>!p);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const deleteHandler = async (id) => {
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,
      {
        withCredentials:true,
      })
      toast.success(data.message);
      setrefresh(p=>!p);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const {data} = await axios.post(`${server}/task/new`,{
        title,description,
      },
      {
        withCredentials:true,
        headers: {
          "Content-Type":"application/json",
        },
      });
      settitle("");
      setdescription("");
      toast.success(data.message);
      setrefresh(p=>!p);
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  };

  useEffect(() => {
    axios.get(`${server}/task/my`,{
      withCredentials:true,
    }).then( res=> {
      settasks(res.data.tasks);
    }).catch(e=>{
      toast.error(e.response.data.message);
    })
  }, [refresh]);
  
  if(!isAuthenticated) return <Navigate to={"/login"}/>
  
  return (

    <div className='container'>
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input value={title} onChange={(e) => settitle(e.target.value)} type='text' placeholder='title' required/>
            <input value={description} onChange={(e) => setdescription(e.target.value)} type='text' placeholder='description' required/>
            <button disabled={loading} type='submit'>Add Task</button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {
          tasks.map((i)=> (
            <TodoItem 
              title={i.title} 
              description={i.description} 
              iscompleted={i.isCompleted} 
              deleteHandler={deleteHandler} 
              updateHandler={updateHandler}
              id={i._id}
              key={i._id}
              />
          ))
        }
      </section>
    </div>
  );
}

export default Home