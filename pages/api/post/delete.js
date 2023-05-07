import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function DeleteApi(req, res) {
  if (req.method === "POST") {
    //JSON.stringify()로 넘어온 데이터 JSON.parse로 풀기
    // const selectId = JSON.parse(req.body)._id;
    //deleteOne
    const db = (await connectDB).db("forum");
    await db.collection("post").deleteOne({ _id: new ObjectId(req.body) });

    console.log("delete >>> ", req.body);
  }
  return res.status(200).json("삭제가 완료되었습니다.");
}
