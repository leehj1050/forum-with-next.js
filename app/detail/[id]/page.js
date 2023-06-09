import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export default async function Detail(props) {
  //DB
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div style={{ padding: "1em", width: "50%" }}>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      {result.imageFile ? (
        <img style={{ width: "100%" }} src={`${result.imageFile}`} />
      ) : (
        <></>
      )}
      <Comment _id={result._id.toString()} />
    </div>
  );
}
