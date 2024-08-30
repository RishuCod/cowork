import {io} from 'socket.io-client'
export const initscoket =async()=>{
    const options={
        'force new connetion':true,
        reconnectionAttempt:'Infinity',
        timeout:10000,
        transports:['websocket']
    };
    return io(import.meta.env.VITE_APP_BACKEND_URL,options)
}
