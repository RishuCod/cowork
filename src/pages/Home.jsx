import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import toast from 'react-hot-toast'


export default function Home() {
const [roomId,setRoomId]=useState("")
const [username,setusername]=useState("")
const navigate =useNavigate()



    const createnewroom=(e)=>{
e.preventDefault();
const id=uuidv4();
setRoomId(id)
toast.success('New room created')
    }
const joinroom=(e)=>{
    if(!roomId || !username)
        toast.error('RoomId and Username is required')
else{
navigate(`/editor/${roomId}`,{
        state:{
            username,
        }
    })

}
}

const handleinput=(e)=>{
    if(e.code==='Enter'){
        joinroom()
    }
}
  return (
    <div className="homepagewrapper">
      {/* <Homenew/> */}
        <div className="formwrapper">
            <img className="homepagelogo" src="/logo.png" />
    <h4 className="mainlabel">Enter Invitation Id</h4>
  
  
    <div className="inputGroup">


<input type="text" className="inputbox" placeholder="ROOM ID" value={roomId} onChange={(e)=>setRoomId(e.target.value)} onKeyUp={handleinput}/>
<input type="text" className="inputbox" placeholder="USERNAME" value={username} onChange={(e)=>setusername(e.target.value)} onKeyUp={handleinput}/>


<button className="btn joinbtn" onClick={joinroom}>Join</button>
<span className="createinfo">
    Dont have an invite then create one &nbsp;
    <a href="" className="createnewbtn" onClick={createnewroom}>New Room</a>
</span>
    </div>
            </div>
   <footer>
    <h4>Build with 💙 &nbsp;by <a href="">Rishabh</a></h4>
   </footer>
    </div>
  )
}
