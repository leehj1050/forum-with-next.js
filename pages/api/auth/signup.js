import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("user_cred")
    .findOne({ email: req.body.email });

  if (req.method === "POST") {
    //회원가입할때 빈 창이면 fail
    if (req.body.name === "") {
      res.status(500).json("name을 써주세요");
    } else if (req.body.email === "") {
      res.status(500).json("email을 써주세요");
    } else if (req.body.password === "") {
      res.status(500).json("password를 써주세요");
    } else {
      if (result) {
        //email중복확인
        if (req.body.email === result.email) {
          res.status(500).json("중복된 email입니다.");
        }
      } else {
        //password암호화
        let hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;

        //db에 가입정보 저장
        let db = (await connectDB).db("forum");
        await db.collection("user_cred").insertOne(req.body);

        res.status(200).json(req.body);
      }
    }
  }
}
