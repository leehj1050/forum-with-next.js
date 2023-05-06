import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export default async function List() {
  //DB
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  return (
    <>
      <ListItem result={result} />
    </>
  );
}
