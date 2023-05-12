import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { sendError } from "next/dist/server/api-utils";

export default async function Home() {
  let session = await getServerSession(authOptions);

  return (
    <>
      {session ? (
        <h1>
          반갑습니다.&nbsp;
          <img src={`${session.user.image}`} className="userImage" />
          &nbsp;{session.user.name}님!
        </h1>
      ) : (
        <h1>Home입니다~!</h1>
      )}
    </>
  );
}
