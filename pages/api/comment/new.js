import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function CommentNew(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    req.body = JSON.parse(req.body);
    if (req.body.comment === "") {
      return res.status(500).json("댓글을 작성해 주세요");
    } else {
      if (session) {
        //로그인했을때만 댓글가능
        let saveComment = {
          content: req.body.comment,
          parent: new ObjectId(req.body._id),
          author: session.user.email,
        };
        const db = (await connectDB).db("forum");
        await db.collection("comment").insertOne(saveComment);
      } else {
        res.status(500).json("로그인을 해주세요");
      }
    }
  }

  res.status(200).json("저장완료");
}
