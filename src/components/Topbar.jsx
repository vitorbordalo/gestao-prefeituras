import React from "react";
import { BRAND } from "../data/constants.js";
import Icon from "./Icons.jsx";
import Button from "./Button.jsx";

export default function Topbar({ role, setRole, onUploadClick, onSearch, query, setQuery, setRoute }) {
  const nav = [
    ["Dashboard", "home"],
    ["Documentos", "docs"],
    ["Digitalização", "digitalizacao"],   // <- nova aba
    ["Usuários & Acesso", "usuarios"],
    ["Integrações (ETCM)", "integracoes"],
    ["Relatórios", "relatorios"],
    ["Suporte", "suporte"],
  ];

  return (
    <div className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60" style={{ borderColor: BRAND.border }}>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon.Logo className="h-9 w-9" />
          <div className="hidden sm:block">
            <div className="text-sm font-bold tracking-tight" style={{ color: BRAND.text }}>MS Consultoria</div>
            <div className="text-[11px] text-slate-500 -mt-0.5">Gestão Documental</div>
          </div>
        </div>

        <nav className="ml-2 hidden items-center gap-1 sm:flex">
          {nav.map(([label, route]) => (
            <button
              key={route}
              onClick={() => setRoute(route)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-gray-100 hover:text-slate-900"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Icon.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              aria-label="Buscar documentos"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
              placeholder="Buscar por título, área, prefeitura…"
              className="w-72 rounded-2xl border bg-white py-2 pl-9 pr-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
              style={{ borderColor: BRAND.border }}
            />
          </div>
          <Button onClick={onUploadClick} className="hidden sm:inline-flex">
            <Icon.Upload className="h-4 w-4" /> Upload
          </Button>
          <select
            aria-label="Papel do usuário"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-2xl border px-3 py-2 text-sm"
            style={{ borderColor: BRAND.border }}
            title="Alternar papel (simulação)"
          >
            <option value="admin">Admin</option>
            <option value="patrus">PATRUS</option>
            <option value="prefeitura">Prefeitura</option>
          </select>
        </div>
      </div>
    </div>
  );
}