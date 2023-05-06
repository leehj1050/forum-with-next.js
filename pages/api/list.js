import { connectDB } from "@/util/database";

export default async function apiList(요청, 응답){
   //DB
   const db = (await connectDB).db("forum");
   const result = await db.collection("post").find().toArray();
   
   return 응답.status(200).json(result)
}