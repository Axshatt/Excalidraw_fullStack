import express from "express";
import JWT_PASS from "@repo/backend-common/config";
import jwt  from "jsonwebtoken";
import {CreateUserSchema,SignInSchema,CreateRoomSchema} from "@repo/common/types"


const app = express();

app.post("/signup", (req, res) => {

    const { username, password } = req.body;
    const data =CreateUserSchema.safeParse(req.body);

    if(!data.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    return res.json({
        userId:"123"
    })




})

app.post("/signin", (req, res) => {
    const { username, password } = req.body;
      const data =SignInSchema.safeParse(req.body);

    if(!data.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }


    if (username && password) {
        try {
            const token = jwt.sign({
                username
            }, JWT_PASS);

            res.json({
                token
            })
        } catch (err) {
            console.log(err);

        }
    }
})

app.get("/room",(req,res)=>{
      const data =CreateRoomSchema.safeParse(req.body);

    if(!data.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }


})
app.listen(3001)