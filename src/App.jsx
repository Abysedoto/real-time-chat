import React from 'react';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Loading from './components/Loading';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import { Context } from './index';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const {firebase ,auth, firestore} = useContext(Context)
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
    <div className="container">
      <Loading />
    </div>
    )
  }
  return (
    <BrowserRouter>
      <div className="container">
        {
          user ? 
          <>
        <Routes>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='' element={<Chat/>}/>
        </Routes>
        </>
        :
        <>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='' element={<Login />}/>
        </Routes>
        </>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;