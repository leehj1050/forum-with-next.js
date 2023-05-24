"use client";

import { useEffect, useState } from "react";

export default function Comment({ _id }) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/comment/commentList?id=${_id}`).then((res) =>
      res.json().then((result) => setData(result))
    );
  }, []);

  return (
    <div style={{ borderTop: "1px solid black", marginTop: "2.5em" }}>
      <div style={{ fontSize: "1.5em", marginTop: "0.5em" }}>댓글</div>
      {data.length > 0 ? (
        data.map((i) => {
          return (
            <div
              style={{ marginBottom: "1.5em", borderBottom: "1px solid black" }}
              key={i._id}
            >
              <p>작성자 ID : {i.author}</p>
              <p>{i.content}</p>
            </div>
          );
        })
      ) : (
        <p style={{ fontWeight: "bold" }}>댓글없음...</p>
      )}
      <input
        value={comment}
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
          }).then((res) =>
            res.json().then((result) => {
              setData(result), setComment("");
            })
          );
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
