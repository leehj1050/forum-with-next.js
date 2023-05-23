"use client";

import { useEffect, useState } from "react";

export default function Comment({ _id }) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/comment/commentList", { method: "GET" }).then((res) =>
      res.json().then((data) => setData(data))
    );
  }, []);

  const resultComment = data.map((i) =>
    i.parent === _id ? (
      <div key={i._id}>{i.content}</div>
    ) : (
      <div key={i._id}></div>
    )
  );

  console.log(resultComment);

  return (
    <div>
      {resultComment}
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({
              comment: comment,
              _id: _id,
            }),
          });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
