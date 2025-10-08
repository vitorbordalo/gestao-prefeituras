import React from "react";
import cx from "../lib/cx";

export default function Badge({ children, tone = "default" }) {
  const map = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warn: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", map[tone])}>
      {children}
    </span>
  );
}