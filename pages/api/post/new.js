import { connectDB } from "@/util/database";

export default async function WritePostNew(req, res) {
  // 1번째 파라미터 요청은 유저들의 요청
  // 2번째 파라미터 응답은 유저에게 보내줄 응답
  if (req.method === "POST") {
    if (req.body.title === "") {
      return res.status(500).json("제목을 써 주세요");
    }
    if (req.body.content === "") {
      return res.status(500).json("글내용을 써 주세요");
    }
    //DB
    const db = (await connectDB).db("forum");
    await db.collection("post").insertOne(req.body);

    return res.status(200).redirect(302, "/list");
  }
}
