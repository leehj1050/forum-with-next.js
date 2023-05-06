import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function currentTime(요청, 응답) {
  const db = (await connectDB).db("forum");
  return await db
    .collection("post")
    .deleteOne({ _id: new ObjectId(요청.query) });
}
