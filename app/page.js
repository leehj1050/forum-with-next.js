import { connectDB } from "@/util/database";

export default async function Home() {
  //DB
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  console.log(result);

  return <div>홈입니다</div>;
}
