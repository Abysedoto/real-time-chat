import React from 'react';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { Context } from '../index';

const Login = (props) => {
  const {firebase, auth} = useContext(Context)
  const login = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const {user} = await auth.signInWithPopup(provider);
    } catch {
      return
    }
  }
  return (
    <div className="login">
      <Button 
      onClick={login}
      variant="contained"
      style={{
        marginRight: 10,
        fontSize: 20, 
        fontWeight: 900,
        fontFamily: 'Roboto'
      }}
      >Log in with google</Button>
    </div>
  )
}

export default Login;
// log in with google