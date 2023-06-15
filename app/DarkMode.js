"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DarkMode({ resMode }) {
  const [icons, setIcons] = useState("");
  const router = useRouter();
  useEffect(() => {
    // let 쿠키값 = ("; " + document.cookie).split(`; mode=`).pop().split(";")[0];
    if (resMode === undefined) {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
      setIcons("🌙");
      router.refresh();
    } else if (resMode.value === "light") {
      setIcons("🌙");
    } else {
      setIcons("🌞");
    }
  }, []);

  return (
    <span
      onClick={() => {
        if (resMode.value === "light") {
          document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400;
          setIcons("🌞");
          router.refresh();
        } else {
          document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
          setIcons("🌙");
          router.refresh();
        }
      }}
      style={{ cursor: "pointer" }}
    >
      {icons}
    </span>
  );
}
