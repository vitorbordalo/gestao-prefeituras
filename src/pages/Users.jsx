import React, { useMemo, useState, useEffect } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Badge from "../components/Badge.jsx";
import Icon from "../components/Icons.jsx";
import { BRAND, PREFEITURAS, TIPOLOGIAS } from "../data/constants.js";

const AREAS = ["Financeiro","Licitação","Patrimônio","Educação","Saúde","RH"];
const ALL_TYPS = TIPOLOGIAS.filter(t => !t.restricted).map(t => t.key);

/** --------- Mock inicial (sem curinga "*", tudo explícito para permitir edição) --------- */
const INITIAL = [
  { id: "U-1", name: "Admin Geral",     email: "admin@ms.com",      role: "admin",      prefeitura: "",          ativo: true,  canHidden: true,  areas: [...AREAS], typs: [...ALL_TYPS] },
  { id: "U-2", name: "Analista PATRUS", email: "analista@ms.com",   role: "patrus",     prefeitura: "",          ativo: true,  canHidden: true,  areas: [...AREAS], typs: [...ALL_TYPS] },
  { id: "U-3", name: "Pref. São Luís",  email: "slz@slz.gov.br",    role: "prefeitura", prefeitura: "São Luís",  ativo: true,  canHidden: false, areas: ["Financeiro","RH","Educação"], typs: ["financeiro","folha","educacao"] },
  { id: "U-4", name: "Pref. Imperatriz",email: "imp@imp.gov.br",    role: "prefeitura", prefeitura: "Imperatriz", ativo: false, canHidden: false, areas: ["Licitação"], typs: ["licitacoes"] },
];

function RoleBadge({ role }) {
  const map = { admin: "Admin", patrus: "PATRUS", prefeitura: "Prefeitura" };
  const tone = role === "admin" ? "info" : role === "patrus" ? "success" : "default";
  return <Badge tone={tone}>{map[role] || role}</Badge>;
}

/** -------------------------- Modal de Edição -------------------------- */
function EditUserModal({ open, onClose, user, onSave }) {
  const [form, setForm] = useState(user);

  useEffect(() => setForm(user), [user]);

  // ESC para fechar
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !form) return null;

  const toggleArray = (field, value) => {
    setForm((f) => {
      const set = new Set(f[field] || []);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...f, [field]: Array.from(set) };
    });
  };

  const setAll = (field, values) => setForm((f) => ({ ...f, [field]: [...values] }));
  const clearAll = (field) => setForm((f) => ({ ...f, [field]: [] }));

  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-50 flex">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      {/* drawer */}
      <div
        className="relative z-10 ml-auto flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-l-3xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4" style={{ borderColor: BRAND.border }}>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Editar usuário</h3>
            <p className="text-xs text-slate-500">{form.id} — tela de demonstração (front-end)</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100" aria-label="Fechar">
            <Icon.X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <div className="grid gap-4 overflow-y-auto p-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs text-slate-500">Nome</label>
            <input
              value={form.name}
              onChange={(e)=>setForm({...form, name: e.target.value})}
              className="w-full rounded-2xl border px-3 py-2 text-sm"
              style={{ borderColor: BRAND.border }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-slate-500">E-mail</label>
            <input
              value={form.email}
              onChange={(e)=>setForm({...form, email: e.target.value})}
              className="w-full rounded-2xl border px-3 py-2 text-sm"
              style={{ borderColor: BRAND.border }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-500">Papel</label>
            <select
              value={form.role}
              onChange={(e)=>{
                const role = e.target.value;
                // ao trocar para PATRUS/Admin, sugerimos acesso total
                const fullAreas = [...AREAS];
                const fullTyps = [...ALL_TYPS];
                setForm({
                  ...form,
                  role,
                  areas: role !== "prefeitura" ? fullAreas : form.areas,
                  typs: role !== "prefeitura" ? fullTyps : form.typs,
                });
              }}
              className="w-full rounded-2xl border px-3 py-2 text-sm"
              style={{ borderColor: BRAND.border }}
            >
              <option value="admin">Admin</option>
              <option value="patrus">PATRUS</option>
              <option value="prefeitura">Prefeitura</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-500">Prefeitura (se papel = Prefeitura)</label>
            <select
              value={form.prefeitura}
              onChange={(e)=>setForm({...form, prefeitura: e.target.value})}
              className="w-full rounded-2xl border px-3 py-2 text-sm"
              style={{ borderColor: BRAND.border }}
            >
              <option value="">—</option>
              {PREFEITURAS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* Permissões */}
          <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border p-4" style={{ borderColor: BRAND.border }}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Áreas habilitadas</div>
                <div className="flex gap-2">
                  <Button variant="soft" onClick={()=>setAll("areas", AREAS)}>Marcar tudo</Button>
                  <Button variant="outline" onClick={()=>clearAll("areas")}>Limpar</Button>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                {AREAS.map(a => (
                  <label key={a} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.areas?.includes(a)}
                      onChange={()=>toggleArray("areas", a)}
                    />
                    {a}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border p-4" style={{ borderColor: BRAND.border }}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Tipologias habilitadas</div>
                <div className="flex gap-2">
                  <Button variant="soft" onClick={()=>setAll("typs", ALL_TYPS)}>Marcar tudo</Button>
                  <Button variant="outline" onClick={()=>clearAll("typs")}>Limpar</Button>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                {ALL_TYPS.map(key => {
                  const t = TIPOLOGIAS.find(x => x.key === key);
                  return (
                    <label key={key} className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.typs?.includes(key)}
                        onChange={()=>toggleArray("typs", key)}
                      />
                      {t?.label || key}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="hidden"
              type="checkbox"
              checked={form.canHidden}
              onChange={(e)=>setForm({...form, canHidden: e.target.checked})}
            />
            <label htmlFor="hidden" className="text-sm">Pode ver <b>Documentos Ocultos</b></label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="active"
              type="checkbox"
              checked={form.ativo}
              onChange={(e)=>setForm({...form, ativo: e.target.checked})}
            />
            <label htmlFor="active" className="text-sm">Usuário ativo</label>
          </div>
        </div>

        <div className="border-t p-4" style={{ borderColor: BRAND.border }}>
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={()=>{ onSave(form); onClose(); }}>Salvar alterações</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** -------------------------- Página principal -------------------------- */
export default function Users() {
  const [users, setUsers] = useState(INITIAL);
  const [query, setQuery] = useState("");
  const [fRole, setFRole] = useState("");
  const [fPref, setFPref] = useState("");
  const [sel, setSel] = useState({});
  const [edit, setEdit] = useState({ open: false, user: null });

  const view = useMemo(() => {
    return users.filter(u => {
      if (fRole && u.role !== fRole) return false;
      if (fPref && u.prefeitura !== fPref) return false;
      if (query && !`${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [users, query, fRole, fPref]);

  const toggleAll = (checked) => {
    const next = {};
    if (checked) view.forEach(u => next[u.id] = true);
    setSel(next);
  };

  const bulkUpdate = (fn) => {
    const ids = new Set(Object.entries(sel).filter(([,v])=>v).map(([k])=>k));
    if (!ids.size) return;
    setUsers(prev => prev.map(u => ids.has(u.id) ? fn(u) : u));
    setSel({});
  };

  const saveUser = (u) => setUsers(prev => prev.map(x => x.id === u.id ? u : x));
  const patrusAccessAll = () => {
    setUsers(prev => prev.map(u =>
      u.role === "patrus" ? { ...u, canHidden: true, areas: [...AREAS], typs: [...ALL_TYPS] } : u
    ));
  };
  const selectedCount = Object.values(sel).filter(Boolean).length;

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4">

      <Card title="Usuários & Acesso" subtitle="Gerencie perfis, permissões e visibilidade de documentos ocultos.">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Icon.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Buscar por nome ou e-mail"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              className="w-full rounded-2xl border bg-white py-2 pl-9 pr-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
              style={{ borderColor: BRAND.border }}
            />
          </div>
          <select value={fRole} onChange={(e)=>setFRole(e.target.value)} className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }}>
            <option value="">Todos os papéis</option>
            <option value="admin">Admin</option>
            <option value="patrus">PATRUS</option>
            <option value="prefeitura">Prefeitura</option>
          </select>
          <select value={fPref} onChange={(e)=>setFPref(e.target.value)} className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }}>
            <option value="">Todas as prefeituras</option>
            {PREFEITURAS.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>

        {selectedCount > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border p-3 text-sm" style={{ borderColor: BRAND.border }}>
            <span className="text-slate-600">{selectedCount} selecionado(s)</span>
            <Button variant="soft" onClick={()=>bulkUpdate(u => ({ ...u, canHidden: true }))}>Liberar “Ocultos”</Button>
            <Button variant="outline" onClick={()=>bulkUpdate(u => ({ ...u, canHidden: false }))}>Revogar “Ocultos”</Button>
            <Button variant="soft" onClick={()=>bulkUpdate(u => ({ ...u, ativo: true }))}>Ativar</Button>
            <Button variant="outline" onClick={()=>bulkUpdate(u => ({ ...u, ativo: false }))}>Desativar</Button>
          </div>
        )}
      </Card>

      <Card title="Política PATRUS" subtitle="Admins PATRUS geralmente têm acesso total.">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Button variant="soft" onClick={patrusAccessAll}>Garantir acesso total para PATRUS</Button>
          <Badge tone="info">Aplica ocultos + todas as áreas/tipologias</Badge>
        </div>
      </Card>

      <Card>
        <div className="overflow-hidden rounded-3xl border" style={{ borderColor: BRAND.border }}>
          <table className="min-w-full divide-y" style={{ borderColor: BRAND.border }}>
            <thead className="bg-gray-50 text-left text-xs font-semibold text-slate-600">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    onChange={(e)=>toggleAll(e.target.checked)}
                    checked={view.length > 0 && view.every(u => sel[u.id])}
                    aria-label="Selecionar todos"
                  />
                </th>
                {["Usuário","E-mail","Papel","Prefeitura","Ocultos","Status","Ações"].map(h => (
                  <th key={h} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y bg-white text-sm" style={{ borderColor: BRAND.border }}>
              {view.map(u => (
                <tr key={u.id} className="hover:bg-blue-50/40">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={!!sel[u.id]}
                      onChange={(e)=>setSel(s => ({ ...s, [u.id]: e.target.checked }))}
                      aria-label={`Selecionar ${u.name}`}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3"><RoleBadge role={u.role} /></td>
                  <td className="px-4 py-3">{u.prefeitura || "—"}</td>
                  <td className="px-4 py-3">{u.canHidden ? <Badge tone="success">sim</Badge> : <Badge>não</Badge>}</td>
                  <td className="px-4 py-3">{u.ativo ? <Badge tone="success">ativo</Badge> : <Badge tone="danger">inativo</Badge>}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={()=>setEdit({ open: true, user: u })}>Editar</Button>
                      <Button variant="soft" onClick={()=>setUsers(prev=>prev.map(x=>x.id===u.id?{...x, ativo: !x.ativo}:x))}>
                        {u.ativo ? "Desativar" : "Ativar"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {view.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-500" colSpan={8}>Nenhum usuário com esses filtros.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <EditUserModal
        open={edit.open}
        user={edit.user}
        onClose={()=>setEdit({ open:false, user:null })}
        onSave={saveUser}
      />
    </div>
  );
}