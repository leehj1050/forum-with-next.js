"use client";

import { useState } from "react";

export default function Write() {
  //글제목,글내용 저장
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //e.target.file[0] 초기저장
  const [saveFiles, setSaveFiles] = useState("");
  //미리보기 할 url
  const [fileImage, setFileImage] = useState("");
  //이미지 버킷에 저장된 후 url 추출
  const [src, setSrc] = useState("");

  // 사진 미리보기 위한 저장
  const saveFileImage = async (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    setSaveFiles(e.target.files[0]);
  };

  // 미리보기 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  //onchange실행
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  //등록
  const handleClick = async () => {
    //이미지가 있으면(선택되어있으면..)
    if (fileImage) {
      //서버야 Presigned URL 줘
      const file = saveFiles;
      let filename = encodeURIComponent(file.name);
      let res = await fetch("/api/post/image?file=" + filename);
      res = await res.json();

      //S3 업로드
      const formData = new FormData();
      Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await fetch(res.url, {
        method: "POST",
        body: formData,
      });

      if (result.ok) {
        let s3URL = result.url + "/" + filename;
        fetch("/api/post/new", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            content: content,
            imageFile: s3URL,
          }),
        });
      } else {
        console.log("실패");
      }
    } else {
      fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
    }

    setTitle("");
    setContent("");
  };

  return (
    <div className="p-20">
      <h4>게시글 작성</h4>
      <input
        name="title"
        placeholder="글제목.."
        onChange={handleChange}
        value={title}
      />
      <input
        name="content"
        placeholder="글내용.."
        onChange={handleChange}
        value={content}
      />
      {fileImage && (
        <img alt="미리보기 이미지" src={fileImage} style={{ margin: "auto" }} />
      )}

      <input type="file" accept="image/*" onChange={saveFileImage} />
      <button style={{ marginRight: "1em" }} onClick={() => deleteFileImage()}>
        이미지 삭제
      </button>
      <button onClick={handleClick}>등록</button>
    </div>
  );
}
