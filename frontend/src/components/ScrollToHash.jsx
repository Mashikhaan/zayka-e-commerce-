import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
  if (!hash) return;

  requestAnimationFrame(() => {
    const el = document.getElementById(hash.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  });
}, [hash]);
  return null;
}