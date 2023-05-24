import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

//수정페이지
export default async function Edit(props) {
  //DB findOne
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  let session = await getServerSession(authOptions);

  if (session.user.email === result.author) {
    return (
      <div className="p-20">
        <h4>글 수정페이지</h4>
        <form action="/api/post/edit" method="POST">
          <input name="title" defaultValue={result.title} />
          <input name="content" defaultValue={result.content} />
          <input
            style={{ display: "none" }}
            name="_id"
            value={result._id.toString()}
          />
          <button type="submit">수정완료</button>
        </form>
      </div>
    );
  }
  return (
    <div className="p-20">
      <h1>알림</h1>
      <p>작성자가 일치하지 않습니다.</p>
      <p>수정이 불가능 합니다.</p>
    </div>
  );
}
