"use client";
import Link from "next/link";

export default function ListItem({ result }) {
  // 삭제버튼 클릭시~!!!
  const handleDelClick = (e, selectId) => {
    if (confirm("삭제하시겠습니까?")) {
      fetch("/api/post/delete", {
        method: "POST",
        body: selectId,
      })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          alert(r);
        })
        .then(() => {
          e.target.parentElement.style.opacity = 0;
          setTimeout(() => {
            e.target.parentElement.style.display = "none";
          }, 1000);
        });
      // fetch(`/api/test?id=${selectId}`);
      // fetch(`/api/abcd/${selectId}`);
    } else alert("취소되었습니다.");
  };

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
                handleDelClick(e, result[idx]._id);
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
