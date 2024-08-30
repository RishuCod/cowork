import {io} from 'socket.io-client'
export const initscoket =async()=>{
    const options={
       'force new connection': true,
        reconnectionAttempts: Infinity, 
        timeout: 10000, 
        transports: ['websocket'],
    };
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
    const protocol = backendUrl.startsWith('https') ? 'wss' : 'ws';
    const socketUrl = backendUrl.replace(/^http/, protocol);

    return io(socketUrl, options);
    
}
