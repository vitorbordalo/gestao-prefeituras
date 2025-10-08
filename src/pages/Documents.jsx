import React, { useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Badge from "../components/Badge.jsx";
import Icon from "../components/Icons.jsx";
import { BRAND, PREFEITURAS, TIPOLOGIAS } from "../data/constants.js";
import { MOCK_DOCS as SEED } from "../data/mockDocs.js";

export default function Documents() {
  const [docs, setDocs] = useState(SEED);
  const [query, setQuery] = useState("");
  const [fPref, setPref] = useState("");
  const [fTipo, setTipo] = useState("");
  const [fHidden, setHidden] = useState("todos");
  const [dateFrom, setFrom] = useState("");
  const [dateTo, setTo] = useState("");
  const [sel, setSel] = useState({});

  const filtered = useMemo(() => {
    return docs.filter(d => {
      if (query && !(`${d.titulo} ${d.autor}`.toLowerCase().includes(query.toLowerCase()))) return false;
      if (fPref && d.prefeitura !== fPref) return false;
      if (fTipo && d.tipologia !== fTipo) return false;
      if (fHidden === "apenas" && !d.oculto) return false;
      if (fHidden === "sem" && d.oculto) return false;
      if (dateFrom && d.data < dateFrom) return false;
      if (dateTo && d.data > dateTo) return false;
      return true;
    });
  }, [docs, query, fPref, fTipo, fHidden, dateFrom, dateTo]);

  const toggleAll = (checked) => {
    const next = {};
    if (checked) filtered.forEach(d => next[d.id] = true);
    setSel(next);
  };
  const selectedIds = Object.entries(sel).filter(([,v])=>v).map(([k])=>k);

  const marcarOculto = (v) => setDocs(prev => prev.map(d => selectedIds.includes(d.id) ? { ...d, oculto: v } : d));
  const remover = () => setDocs(prev => prev.filter(d => !selectedIds.includes(d.id)));
  const enviarETCM = () => setDocs(prev => prev.map(d => selectedIds.includes(d.id) ? { ...d, etcm: "enviado" } : d));
  const limparFiltros = () => { setQuery(""); setPref(""); setTipo(""); setHidden("todos"); setFrom(""); setTo(""); };

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4">
      <Card title="Documentos" subtitle="Busca, filtros e ações.">
        <div className="grid gap-3 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <Icon.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Buscar por título ou autor…"
              className="w-full rounded-2xl border bg-white py-2 pl-9 pr-3 text-sm"
              style={{ borderColor: BRAND.border }}
            />
          </div>
          <select value={fPref} onChange={(e)=>setPref(e.target.value)} className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }}>
            <option value="">Prefeitura (todas)</option>
            {PREFEITURAS.map(p => <option key={p}>{p}</option>)}
          </select>
          <select value={fTipo} onChange={(e)=>setTipo(e.target.value)} className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }}>
            <option value="">Tipologia (todas)</option>
            {TIPOLOGIAS.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
          </select>
          <select value={fHidden} onChange={(e)=>setHidden(e.target.value)} className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }}>
            <option value="todos">Visibilidade (todos)</option>
            <option value="sem">Somente visíveis</option>
            <option value="apenas">Somente ocultos</option>
          </select>
          <div className="grid grid-cols-2 gap-2 md:col-span-2">
            <input type="date" value={dateFrom} onChange={(e)=>setFrom(e.target.value)} className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }}/>
            <input type="date" value={dateTo} onChange={(e)=>setTo(e.target.value)} className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }}/>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={limparFiltros}>Limpar</Button>
            <Badge tone="info">{filtered.length} resultados</Badge>
          </div>
        </div>

        {selectedIds.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border p-3 text-sm" style={{ borderColor: BRAND.border }}>
            <span className="text-slate-600">{selectedIds.length} selecionado(s)</span>
            <Button variant="soft" onClick={()=>marcarOculto(true)}>Marcar como oculto</Button>
            <Button variant="outline" onClick={()=>marcarOculto(false)}>Tornar visível</Button>
            <Button onClick={enviarETCM}>Enviar ao ETCM</Button>
            <Button variant="outline" onClick={remover}>Excluir</Button>
          </div>
        )}
      </Card>

      <Card>
        <div className="overflow-hidden rounded-3xl border" style={{ borderColor: BRAND.border }}>
          <table className="min-w-full divide-y" style={{ borderColor: BRAND.border }}>
            <thead className="bg-gray-50 text-left text-xs font-semibold text-slate-600">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox"
                    onChange={(e)=>toggleAll(e.target.checked)}
                    checked={filtered.length>0 && filtered.every(d=>sel[d.id])}
                    aria-label="Selecionar todos" />
                </th>
                {["Título","Prefeitura","Área","Tipologia","Autor","Data","ETCM","Oculto","Ações"].map(h=>(
                  <th key={h} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y bg-white text-sm" style={{ borderColor: BRAND.border }}>
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-blue-50/40">
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={!!sel[d.id]} onChange={(e)=>setSel(s=>({ ...s, [d.id]: e.target.checked }))}/>
                  </td>
                  <td className="px-4 py-3 font-medium">{d.titulo}</td>
                  <td className="px-4 py-3">{d.prefeitura}</td>
                  <td className="px-4 py-3">{d.area}</td>
                  <td className="px-4 py-3">{TIPOLOGIAS.find(t=>t.key===d.tipologia)?.label}</td>
                  <td className="px-4 py-3">{d.autor}</td>
                  <td className="px-4 py-3">{d.data}</td>
                  <td className="px-4 py-3">
                    {d.etcm === "enviado" ? <Badge tone="success">enviado</Badge>
                      : d.etcm === "pendente" ? <Badge tone="amber">pendente</Badge>
                      : <Badge>n/a</Badge>}
                  </td>
                  <td className="px-4 py-3">{d.oculto ? <Badge tone="danger">oculto</Badge> : <Badge tone="success">visível</Badge>}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={()=>alert(`Pré-visualização de ${d.id}`)}>Ver</Button>
                      <Button variant="soft" onClick={()=>setDocs(prev=>prev.map(x=>x.id===d.id?{...x, oculto: !x.oculto}:x))}>
                        {d.oculto ? "Tornar visível" : "Ocultar"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-6 text-sm text-slate-500">Nenhum documento com esses filtros.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}