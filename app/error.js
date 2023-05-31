"use client";
//error 페이지는 무조건 client 컴포넌트여야 한다

export default function Error({ error, reset }) {
  return (
    <>
      <h4>에러남..</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        새로고침
      </button>
    </>
  );
}
