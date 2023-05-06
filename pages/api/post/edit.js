import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function PostEditApi(req, res) {
  if (req.method === "POST") {
    const resultEdit = { title: req.body.title, content: req.body.content };

    //updateOne 수정 메서드
    const db = (await connectDB).db("forum");
    await db
      .collection("post")
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: resultEdit });
  }
  return res.status(200).redirect(302, "/list");
}
