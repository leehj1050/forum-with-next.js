"use client";

import { useEffect, useState } from "react";

export default function Like({ post_id, session }) {
  const user_id = session ? session.user.email : false;
  const [getLike, setGetLike] = useState([]);

  //   const filterLike = getLike.map((i) => i);

  //클릭이벤트
  const handleClick = () => {
    fetch("/api/like/new", {
      method: "POST",
      body: JSON.stringify({ postId: post_id, userId: user_id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res === "로그인을 해주세요.") {
          alert(res);
        } else {
          setGetLike(res);
        }
      });
  };

  useEffect(() => {
    fetch(`/api/like/list?id=${post_id}`)
      .then((res) => res.json())
      .then((res) => setGetLike(res));
  }, []);

  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={() => handleClick()}>
        ❤
      </div>
      <p>{getLike.length}</p>
    </>
  );
}
