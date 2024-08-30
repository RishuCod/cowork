import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import { actions } from './src/action.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()

const usersocketmap={}

const server=http.createServer(app)
const io=new Server(server)
app.use(express.static('dist'))

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'dist','index.html'));
})

const getAllConnectedClients=(roomId)=>{
    return Array.from(io.sockets.adapter.rooms.get(roomId)|| []).map((socketid)=>{
        return {
            socketid,
            username:usersocketmap[socketid],
        }
    });

}


io.on('connection', (socket)=>{
    console.log("server connected")


    socket.on(actions.JOIN,({roomId,username})=>{
       
usersocketmap[socket.id]=username;
socket.join(roomId); 


const clients= getAllConnectedClients(roomId)

clients.forEach(({socketid})=>{

    io.to(socketid).emit(actions.JOINED,{
        clients,
        username,
        socketid:socket.id,
    })
})
    })

    socket.on(actions.CODE_CHANGE,({roomId,code})=>{
        socket.to(roomId).emit(actions.CODE_CHANGE,{code})
    })

    socket.on(actions.SYNC_CODE,({socketid,code})=>{
        console.log(code)
        io.to(socketid).emit(actions.CODE_CHANGE,{code})
    })


    socket.on("disconnecting",()=>{
        const rooms=Array.from(socket.rooms)
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit(actions.DISCONNECTED,{
                socketid:socket.id,
                username:usersocketmap[socket.id],
            });
        });
        delete usersocketmap[socket.id]
        socket.leave()
    })
})
server.listen(5000,()=>console.log('listening'))
