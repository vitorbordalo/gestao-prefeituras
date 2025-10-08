import React from "react";

export const Icon = {
  Logo: (p) => (
    <svg viewBox="0 0 48 48" aria-hidden className={"shrink-0 " + (p.className || "")}>
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#0B5CFF" />
          <stop offset="100%" stopColor="#0A3DCB" />
        </linearGradient>
      </defs>
      <rect rx="10" width="48" height="48" fill="url(#g)" />
      <path d="M8 31 L14 16 L18 31 L22 16 L26 31 L34 16 L40 31" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23A6.5 6.5 0 1 0 9.5 15c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.505 4.505 0 0 1 9.5 14Z"/>
    </svg>
  ),
  Upload: (p) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path fill="currentColor" d="M5 20h14v-2H5v2Zm7-18-5.5 5.5 1.41 1.41L11 6.83V16h2V6.83l3.09 3.08L17.5 7.5 12 2Z" />
    </svg>
  ),
  File: (p) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm1 7H8V7h7v2Zm-7 3h10v2H8v-2Zm0 4h10v2H8v-2Z"/>
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path fill="currentColor" d="M12 2 4 5v6c0 5 3.8 9.7 8 11 4.2-1.3 8-6 8-11V5l-8-3Z"/>
    </svg>
  ),
  Cloud: (p) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path fill="currentColor" d="M19 18H6a4 4 0 1 1 .7-7.95A5 5 0 0 1 20 9a4 4 0 0 1-1 9Z"/>
    </svg>
  ),
  Users: (p) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path fill="currentColor" d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4ZM6 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm10 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4Zm-10 1c-2.67 0-8 1.34-8 4v3h8v-3c0-1.3.66-2.31 1.66-3.1A12.7 12.7 0 0 0 6 16Z"/>
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/>
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path fill="currentColor" d="m18.3 5.71-1.41-1.41L12 9.17 7.11 4.3 5.7 5.71 10.59 10.6 5.7 15.49l1.41 1.41L12 12l4.89 4.9 1.41-1.41-4.89-4.9 4.89-4.87Z"/>
    </svg>
  ),
};

export default Icon;