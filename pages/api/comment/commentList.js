import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function commentList(req, res) {
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("comment")
    .find({ parent: new ObjectId(req.query.id) })
    .toArray();

  return res.status(200).json(result);
}