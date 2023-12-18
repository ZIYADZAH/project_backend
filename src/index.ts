import express, { Request, Response } from 'express';
import {iuser} from './type/user';
import User, { Bolg, Useer } from '@prisma/client'
import { connectDB , prisma } from './config/db';

const app =express()
const PORT = 3002
app.use(express.json())
// --------------GET all users--------------
app.get('/api/get', async (req:Request, res:Response) =>{
    const users = await prisma.useer.findMany()
    return res.json(users);
});
// register 
app.post('/Register',async  (req: Request, res: Response) => {
    const newuser = req.body as Useer;
    await prisma.useer.create({
        data: newuser
    });
    return res.json('user added');
});
// login here

// create bolg

app.post('bolg/createbolg',async(req:Request, res:Response)=>{
    const Newbolg =req.body as Bolg
    await prisma.bolg.create({
        data:Newbolg
        
    })
    res.json("created bolg ")
})
// get allbolg 

app.get('/bolg/getallbolg',async (req:Request , res:Response)=>{
    const getallbolg = await prisma.bolg.findMany()
    return res.json(getallbolg)
})
// get  bolg with user  
app.get('/userblogs/:id',async(req:Request,res:Response)=>{
    const {id} = req.params
    const userId = await prisma.bolg.findMany({
        where: {
          user_id:id,
        },
        select: {
          title: true,
        //   createdate: true,
          id: true,
          user: {
            select: {
              username: true,
              email: true,
            },
          },
        },
      });
      res.json(userId);
})

// delete Bolg 
app.delete('/bolg/delete/:id' , async(req:Request , res:Response )=>{
    const {id} = req.params 
    await prisma.bolg.delete({
        where:{id:id}
    })
    
    res.json("bolg deleted")
})
 
// login 
app.post('/api/login' , async(req:Request , res:Response)=>{
    const {username , password} = req.body as Useer
    const userss = await prisma.useer.findMany({where:{username:username,password:password}});
    if (userss==null){
        return res.json("make sure your email is correct  pls (:")
        // if the email not correct res to the user make sure

    } 
    else{
        //  else its correct 
        return res.json("sgin in done ")
    }
})
  
 


// // --------------POST------------x`
// let user:iuser[] = []
connectDB()

app.listen(PORT,()=>{
      console.log(`Server Listing ${PORT}`)
});



    