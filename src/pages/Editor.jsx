import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Client from '../components/client'
import Editors from '../components/editors'
import { useLocation } from 'react-router-dom'
import { initscoket } from '../socket'
import {actions} from '../action'
import toast from 'react-hot-toast'

export default function Editor() {
  const location=useLocation()
  const coderef=useRef(null)
  const {roomId} = useParams()
  const reactnavigator=useNavigate()
const socketref=useRef(null)

const handleErrors= (e)=>{
  console.log("socket error",e)
  toast.error('Socket connection failed')
//  reactnavigator("/",{replace:true})
}

const [clientslist,setclients]=useState([])




useEffect(()=>{
const init=async ()=>{
socketref.current=await initscoket();
socketref.current.on('connect_error',(err)=>handleErrors(err))
socketref.current.on('connect_failed',(err)=>handleErrors(err))
socketref.current.emit(actions.JOIN,{
  roomId,
  username:location.state?.username

})
socketref.current.on(actions.JOINED,({clients,username,socketid})=>{
  if(username!== location.state?.username){
    toast.success(`${username} joined the room`)

 
  }
  setclients(clients)
  socketref.current.emit(actions.SYNC_CODE,{code:coderef.current,socketid})
}
);


socketref.current.on(actions.DISCONNECTED,({socketid,username})=>{
  
  toast.success(`${username} left the room`)
  setclients((prev)=>{
     return prev.filter((client)=>client.socketid !== socketid)
  })
})

};
init();

return ()=> {
  socketref.current.disconnect()
  socketref.current.off(actions.JOIN)
  socketref.current.off(actions.DISCONNECTED)
  
}
},[])

async function copy(e){
  try{
    await navigator.clipboard.writeText(roomId)
    toast.success("RoomID copied")
  }catch(error){
    toast.error("Could not copy the RoomID")
  }
}

function leave(){
reactnavigator("/",{replace:true})
}
   
      
 
  return (
    
    <div className="mainwrap">

   <div className="aside">
    <div className="asideinner">

        <div className="logo">
            <img className="logoimage" src='/logo.png'/>
            </div> <h3>Connected</h3>
       <div className='clientslist'>
{clientslist.map(client=>(
  <Client username={client.username} key={client.socketid}/>
))}

       </div>
      
    </div>
    <button className="btn copybtn" onClick={copy}>Copy Room id</button>
    <button className="btn leavebtn" onClick={leave}>Leave</button>
   </div>
   <div className="editorwrap">
    <Editors socketref={socketref} roomId={roomId} oncodechange={(code)=>coderef.current=code}/>
     </div>
    </div>
  )
}
