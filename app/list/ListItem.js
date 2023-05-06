"use client";
import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div className="list-bg">
      {result.map((item, idx) => {
        return (
          <div className="list-item " key={idx}>
            <Link href={`/detail/${result[idx]._id}`}>
              <h4>{result[idx].title}</h4>
            </Link>
            <Link href={`/edit/${result[idx]._id}`}> ✏️ </Link>
            <span
              //삭제 로직
              onClick={(e) => {
                fetch("/api/post/delete", {
                  method: "POST",
                  body: result[idx]._id,
                })
                  .then((r) => {
                    return r.json();
                  })
                  .then((r) => {
                    console.log(r);
                  })
                  .then(() => {
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = "none";
                    }, 1000);
                  });
                // fetch(`/api/test?id=${result[idx]._id}`);
                // fetch(`/api/abcd/${result[idx]._id}`);
              }}
            >
              🗑️
            </span>
            <p>1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
