import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {
  //DB
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((item, idx) => 
          <div className="list-item"  >
            <Link href={`/detail/${result[idx]._id}`}>
              <h3>{result[idx].title}</h3>
            </Link>
            <p>1월 1일</p>
          </div>
      )}
    </div>
  );
}
