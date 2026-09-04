import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat';

const Home = () => {
  const {initializeSocketConnection} = useChat();
  const {user} = useSelector((state) => state.auth);

  console.log("User from Home.jsx:", user);

  useEffect(() => {
    initializeSocketConnection;
  }, []);

  return (
    <div>
      <h1 className='text-5xl'>Welcome to the Home Page</h1>
    </div>
  )
}

export default Home
