import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const Chat = (props) => {
  let messageRef;
  useEffect(() => {
    if (messageRef) {
      messageRef.scrollIntoView({smooth:"scroll-behavior"});
    }
  })

  const [value, setValue] = useState();
  const {auth, firestore} = useContext(Context)
  const [user] = useAuthState(auth);
  const [messages] = useCollectionData(
    firestore.collection('messages')
  )
  const chatRef = React.createRef()
  const sendMessage = async () => {
    if (value === "" || value === undefined) {return}
    firestore.collection('messages').add({
      uid: user.uid,
      userName: user.displayName,
      messageText: value,
      messageId: Date.now()
    })
    setValue("")
  }
  const sendMessageEnter = async (event) => {
    if (event.code !== "Enter") {return}
    event.preventDefault()
    if (value === "" || value === undefined) {return}
    firestore.collection('messages').add({
      uid: user.uid,
      userName: user.displayName,
      messageText: value,
      messageId: Date.now()
    })
    setValue("")
  }
  return (
    <div className="chat" ref={chatRef}>
      <h1>Welcome to chat!</h1>
      <div className="chat-box">
        {
          messages ? 
          messages.sort((a, b) => a.messageId - b.messageId).map((message, index) => {
            let messageStyle;
            if (user.uid === message.uid) {
              messageStyle = {
                backgroundColor: "rgb(138, 138, 240)",
                color: "white"
              }
            } else {
              messageStyle = {
                backgroundColor: "rgb(230, 228, 228)"
              }
            }
            return (
              <>
              <div className="chat-message" key={index}
              ref={(el) => { messageRef = el }}>
                <div
                  className="chat-message-name"
                  style={messageStyle}>
                  {message.userName}
                </div>
                <div className="chat-message-text">
                  {message.messageText}
                </div>
              </div>
              <div ref={chatRef} />
              </>
            );
          })
          :
          <></>
        }
      </div>
      <TextField 
      onKeyDown={sendMessageEnter}
      onChange={(event) => setValue(event.target.value)}
      value={value}
      id="outlined-basic"
      className="chat-area"
      label="Message" 
      variant="outlined"
      multiline 
      maxRows={4}
      style={{
        marginBottom: 10
      }}
      inputProps={{style: {fontSize: 18, fontWeight: 900,
      fontFamily: 'Roboto'}}}
      InputLabelProps={{style: {fontSize: 15, fontWeight: 900}}} // font size of input label
      />
    <Button 
    onClick={sendMessage}
    variant="contained"
    style={{
      marginRight: 10,
      fontSize: 15, 
      fontWeight: 900,
      fontFamily: 'Roboto'
    }}>SEND</Button>
    <Button 
    onClick={() => auth.signOut()}
    style={{
      marginRight: 10,
      fontSize: 15, 
      fontWeight: 900,
      fontFamily: 'Roboto'
    }}
    color="error"
    variant="outlined">LEAVE</Button>
    </div>
  )
}

export default Chat