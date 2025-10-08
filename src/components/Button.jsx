import React from "react";
import cx from "../lib/cx";
import { BRAND } from "../data/constants";

export default function Button({ children, onClick, variant = "primary", className = "", type = "button", ...rest }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm";
  let style, classes;

  if (variant === "primary") {
    style = { background: `linear-gradient(90deg, ${BRAND.blue}, ${BRAND.blueDark})`, color: "#fff" };
    classes = "";
  } else if (variant === "ghost") {
    classes = "px-3 py-2 text-slate-700 hover:bg-gray-100";
  } else if (variant === "outline") {
    classes = "border hover:bg-gray-50";
  } else if (variant === "soft") {
    style = { background: BRAND.blueSoft, color: BRAND.blue };
  }

  return (
    <button type={type} onClick={onClick} className={cx(base, classes, className)} style={style} {...rest}>
      {children}
    </button>
  );
}