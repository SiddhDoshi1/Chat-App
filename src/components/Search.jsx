import React, { useState, useContext } from 'react'
import { doc, collection, query, where, getDocs, serverTimestamp,getDoc,setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username,setUsername] = useState("")
  const [user,setUser] = useState(null)
  const [err,setErr] = useState(false)
  const [searched,setSearched] = useState(false)

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async ()=>{
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try{
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setUser(null)  
      }
      else{
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    }catch(err){
      setErr(true);
    }
    setSearched(true);
  };

  const handleKey = e =>{
    if(username===""){
      setSearched(false);
      setUser(null);
    }
    else{
      e.code==="Enter" && handleSearch();
    }
  };

  const handleSelect = async () =>{
    const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(db,"chats",combinedID));

      if(!res.exists()){
        //create chat
        await setDoc(doc(db,"chats",combinedID),{messages:[]});

        await updateDoc(doc(db,"userChats", currentUser.uid),{
          [combinedID+".userInfo"]:{
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedID+".date"]:serverTimestamp()
        });

        await updateDoc(doc(db,"userChats", user.uid),{
          [combinedID+".userInfo"]:{
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedID+".date"]:serverTimestamp()
        });
      }

    }catch(err){
      setErr(true);
    }

    setUser(null);
    setUsername("");
    setSearched(false);
  }

  let searchActivity;
  if(user)
  {
    searchActivity = (<div className="userChat" onClick={handleSelect}>
      <img src={user.photoURL} alt=""></img>
      <div className="userChatInfo">
          <span>{user.displayName}</span>
      </div>
  </div>)
  }
  else if(searched && !user)
  {
    searchActivity = (<span style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 15px', 
      backgroundColor: '#f8d7da', 
      color: '#721c24', 
      border: '1px solid #f5c6cb',
      borderRadius: '5px', 
      fontSize: '16px', 
      fontWeight: 'bold', 
      textAlign: 'center',
      margin: '10px auto', 
      width: '100%', 
      maxWidth: '200px'
    }}>
      User Not Found
    </span>
    )
  }

  return (
    <div className='search'>
        <div className='searchForm'>
              <input type='text' placeholder='Find a user' onChange={(e)=>{e.target.value==="" ? (setUsername(e.target.value),setSearched(false)) : setUsername(e.target.value)}} onKeyDown={handleKey} value={username}></input>
        </div>
        {err && <span>Something went wrong</span>}
        {searchActivity}
    </div>
  )
}

export default Search