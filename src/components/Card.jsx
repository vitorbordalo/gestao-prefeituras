import React from "react";
import { BRAND } from "../data/constants";
import cx from "../lib/cx";

export default function Card({ title, subtitle, children, footer, className = "" }) {
  return (
    <section className={cx("rounded-3xl border bg-white shadow-sm", className)} style={{ borderColor: BRAND.border }}>
      {(title || subtitle) && (
        <header className="flex items-center justify-between p-4">
          <div>
            {title && <h3 className="text-sm font-semibold text-slate-800">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          {footer}
        </header>
      )}
      <div className={cx("px-4", title ? "pb-4" : "p-4")}>{children}</div>
    </section>
  );
}