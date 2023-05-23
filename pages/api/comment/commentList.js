import { connectDB } from "@/util/database";

export default async function commentList(req, res) {
  const db = (await connectDB).db("forum");
  const result = await db.collection("comment").find().toArray();

  return res.status(200).json(result);
}
