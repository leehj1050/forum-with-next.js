import { connectDB } from "@/util/database";

export default async function likeList(req, res) {
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("like")
    .find({ postId: req.query.id })
    .toArray();
  return res.status(200).json(result);
}
