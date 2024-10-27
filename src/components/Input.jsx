import React, { useContext, useState } from 'react'
import img from '../img/img.png'
import Attach from '../img/attach.png'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db,storage } from '../firebase'
import { v4 as uuid } from 'uuid'
import { getDownloadURL,ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {
  const [text,setText] = useState("")
  const [file,setFile] = useState(null)

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleSend = async () =>{
    if(file){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          // setErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                file: downloadURL,
              })
            });
          });
        }
      );
    }
    else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      });
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"] : serverTimestamp(),
    })

    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"] : serverTimestamp(),
    })

    setText("");
    setFile(null);
  }

  return (
    <div className='input'>
        <input type="text" placeholder='Type Something...' onChange={e=>setText(e.target.value)} value={text}></input>
        <div className="send">
            <img src={Attach} alt=""></img>
            <input type="file" style={{display:'none'}} id="file" onChange={e=>setFile(e.target.files[0])}></input>
            <label htmlFor='file'>
                <img src={img} alt=""></img>
            </label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input