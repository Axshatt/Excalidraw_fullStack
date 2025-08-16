import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import JWT_PASS from "./config"
const wss = new WebSocketServer({port:8080});
wss.on("connection", function connection(ws,request){

    const url = request.url;
    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get('token');
    const decode = jwt.verify(token , JWT_PASS)

    
    wss.on("message", function message(data){
        ws.send("pong")
        
    })
})

