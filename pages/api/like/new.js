import { connectDB } from "@/util/database";

export default async function LikeNew(req, res) {
  const db = (await connectDB).db("forum");

  req.body = JSON.parse(req.body);

  if (req.method === "POST") {
    if (req.body.userId) {
      const likeInfo = {
        postId: req.body.postId,
        userId: req.body.userId,
      };
      const db = (await connectDB).db("forum");
      await db.collection("like").insertOne(likeInfo);
    } else {
      res.status(500).json("로그인을 해주세요.");
    }
  }
  //좋아요 클릭후 새로고침없이 실시간
  //   res.status(200).json(result);
  const result = await db
    .collection("like")
    .find({ postId: req.body.postId })
    .toArray();
  return res.status(200).json(result);
}
