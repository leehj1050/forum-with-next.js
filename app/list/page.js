import { connectDB } from "@/util/database";
import ListItem from "./ListItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

//npm run build했을때 다이나믹 렌더링을 보여줌
export const dynamic = "force-dynamic";
// static렌더링
// export const dynamic = "force-static";

//캐싱
// export const revalidate = 20;

export default async function List() {
  //DB
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  //session
  const session = await getServerSession(authOptions);

  return (
    <>
      <ListItem result={result} session={session} />
    </>
  );
}
