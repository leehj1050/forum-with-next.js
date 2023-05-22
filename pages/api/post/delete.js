import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function DeleteApi(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const db = (await connectDB).db("forum");
  const findDoc = await db
    .collection("post")
    .findOne({ _id: new ObjectId(req.body) });

  if (req.method === "POST") {
    //JSON.stringify()로 넘어온 데이터 JSON.parse로 풀기
    // const selectId = JSON.parse(req.body)._id;
    // const userId = JSON.parse(req.body).userId;

    //로그인이 되어있으면
    if (session) {
      const adminEmail = await db
        .collection("user_cred")
        .findOne({ email: session.user.email });

      // 로그인한 유저가 같은지 확인후 본인글만 삭제가능하게 로직
      if (
        findDoc.author === session.user.email ||
        adminEmail.role === "admin"
      ) {
        //deleteOne
        await db.collection("post").deleteOne({ _id: new ObjectId(req.body) });
      } else {
        return res.status(500).json("아이디가 일치하지않음");
      }
    } else {
      //로그인이 안되어있으면ㄴ
      return res.status(500).json("로그인이 필요합니다.");
    }
  }
  return res.status(200).json("삭제가 완료되었습니다.");
}
