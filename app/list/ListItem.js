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
          if (r === "삭제가 완료되었습니다.") {
            alert(r);
            e.target.parentElement.style.opacity = 0;
            setTimeout(() => {
              e.target.parentElement.style.display = "none";
            }, 1000);
          } else {
            alert(r);
          }
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
              className="del_btn"
              //삭제 로직
              onClick={(e) => {
                handleDelClick(e, result[idx]._id);
              }}
            >
              🗑️
            </span>
            <p>작성자 ID : {result[idx].author}</p>
            <p>작성자 닉네임 : {result[idx].name}</p>
          </div>
        );
      })}
    </div>
  );
}
