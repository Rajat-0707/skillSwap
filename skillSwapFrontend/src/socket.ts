import {io,Socket} from "socket.io-client";
const URL="https://skillswap-8w8w.onrender.com";

export const socket:Socket=io(URL,{
    autoConnect:false,
    auth:{
        token:localStorage.getItem("token")

    }
})
