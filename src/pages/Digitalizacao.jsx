import React, { useRef, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Badge from "../components/Badge.jsx";
import Icon from "../components/Icons.jsx";
import { BRAND, PREFEITURAS, TIPOLOGIAS } from "../data/constants.js";

const AREAS = ["Financeiro","Licitação","Patrimônio","Educação","Saúde","RH"];
const fmtSize = (b) => (b > 1048576 ? (b/1048576).toFixed(1)+" MB" : b > 1024 ? (b/1024).toFixed(1)+" KB" : b+" B");

export default function Digitalizacao() {
  const inputRef = useRef(null);
  const [queue, setQueue] = useState([]);
  const [defaults, setDefaults] = useState({
    prefeitura: "", tipologia: "", area: "", data: new Date().toISOString().slice(0,10), oculto: false
  });

  const addFiles = (files) => {
    const list = Array.from(files || []);
    if (!list.length) return;
    setQueue(q => [
      ...q,
      ...list.map((f, idx) => ({
        id: `${Date.now()}-${idx}`,
        name: f.name,
        size: f.size || 0,
        file: f,
        meta: { ...defaults },
        status: "pronto",
        progress: 0,
      }))
    ]);
  };

  const onDrop = (e) => { e.preventDefault(); e.stopPropagation(); addFiles(e.dataTransfer.files); };
  const sendAll = () => {
    if (!queue.length) return alert("Adicione arquivos.");
    setQueue(q => q.map(i => ({ ...i, status: "enviando", progress: 30 })));
    setTimeout(() => {
      setQueue(q => q.map(i => ({ ...i, status: "enviado", progress: 100 })));
      alert("Arquivos enviados (mock). Verifique em Documentos.");
    }, 700);
  };

  const clearQueue = () => setQueue([]);
  const applyDefaultsToAll = () => setQueue(q => q.map(it => ({ ...it, meta: { ...defaults } })));
  const updateItemMeta = (id, patch) => setQueue(q => q.map(it => it.id === id ? ({ ...it, meta: { ...it.meta, ...patch } }) : it));
  const removeItem = (id) => setQueue(q => q.filter(it => it.id !== id));

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4">
      <Card title="Digitalização — Metadados padrão" subtitle="Valores aplicados por padrão aos arquivos enviados.">
        <div className="grid gap-3 md:grid-cols-5">
          <select value={defaults.prefeitura} onChange={(e)=>setDefaults(d=>({ ...d, prefeitura: e.target.value }))}
                  className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }}>
            <option value="">Prefeitura (selecione)</option>
            {PREFEITURAS.map(p => <option key={p}>{p}</option>)}
          </select>
          <select value={defaults.tipologia} onChange={(e)=>setDefaults(d=>({ ...d, tipologia: e.target.value }))}
                  className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }}>
            <option value="">Tipologia</option>
            {TIPOLOGIAS.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
          </select>
          <select value={defaults.area} onChange={(e)=>setDefaults(d=>({ ...d, area: e.target.value }))}
                  className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }}>
            <option value="">Área/Secretaria</option>
            {AREAS.map(a => <option key={a}>{a}</option>)}
          </select>
          <input type="date" value={defaults.data} onChange={(e)=>setDefaults(d=>({ ...d, data: e.target.value }))}
                 className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={defaults.oculto} onChange={(e)=>setDefaults(d=>({ ...d, oculto:e.target.checked }))}/>
            Marcar como <b>Oculto</b>
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button variant="soft" onClick={applyDefaultsToAll}>Aplicar aos itens da fila</Button>
        </div>
      </Card>

      <Card title="Enviar documentos digitalizados">
        <div
          onDrop={onDrop}
          onDragOver={(e)=>{ e.preventDefault(); e.stopPropagation(); }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center"
          style={{ borderColor: BRAND.border }}
          onClick={()=>inputRef.current?.click()}
        >
          <Icon.Upload className="mb-2 h-7 w-7 text-slate-500" />
          <div className="text-sm font-medium text-slate-800">Arraste e solte aqui ou clique para selecionar</div>
          <div className="mt-1 text-xs text-slate-500">PDF, JPG, PNG, DOCX, XLSX…</div>
          <input type="file" multiple ref={inputRef} className="hidden" onChange={(e)=>addFiles(e.target.files)} />
        </div>

        {queue.length > 0 && (
          <>
            <div className="mt-4 overflow-hidden rounded-3xl border" style={{ borderColor: BRAND.border }}>
              <table className="min-w-full divide-y" style={{ borderColor: BRAND.border }}>
                <thead className="bg-gray-50 text-left text-xs font-semibold text-slate-600">
                  <tr>
                    {["Arquivo","Tamanho","Prefeitura","Tipologia","Área","Data","Oculto","Status","Ações"].map(h=>(
                      <th key={h} className="px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y bg-white text-sm" style={{ borderColor: BRAND.border }}>
                  {queue.map(item => (
                    <tr key={item.id} className="align-top">
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3">{fmtSize(item.size)}</td>
                      <td className="px-4 py-3">
                        <select value={item.meta.prefeitura} onChange={(e)=>updateItemMeta(item.id,{ prefeitura:e.target.value })}
                                className="rounded-xl border px-2 py-1 text-xs" style={{ borderColor: BRAND.border }}>
                          <option value="">—</option>
                          {PREFEITURAS.map(p => <option key={p}>{p}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select value={item.meta.tipologia} onChange={(e)=>updateItemMeta(item.id,{ tipologia:e.target.value })}
                                className="rounded-xl border px-2 py-1 text-xs" style={{ borderColor: BRAND.border }}>
                          <option value="">—</option>
                          {TIPOLOGIAS.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select value={item.meta.area} onChange={(e)=>updateItemMeta(item.id,{ area:e.target.value })}
                                className="rounded-xl border px-2 py-1 text-xs" style={{ borderColor: BRAND.border }}>
                          <option value="">—</option>
                          {AREAS.map(a => <option key={a}>{a}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input type="date" value={item.meta.data} onChange={(e)=>updateItemMeta(item.id,{ data:e.target.value })}
                               className="rounded-xl border px-2 py-1 text-xs" style={{ borderColor: BRAND.border }} />
                      </td>
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={item.meta.oculto} onChange={(e)=>updateItemMeta(item.id,{ oculto:e.target.checked })}/>
                      </td>
                      <td className="px-4 py-3">
                        {item.status === "pronto" && <Badge>pronto</Badge>}
                        {item.status === "enviando" && (
                          <div className="w-36">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                              <div className="h-2 rounded-full" style={{ width: `${item.progress}%`, background: BRAND.blue }} />
                            </div>
                            <div className="mt-1 text-[10px] text-slate-500">{item.progress}%</div>
                          </div>
                        )}
                        {item.status === "enviado" && <Badge tone="success">enviado</Badge>}
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="outline" onClick={()=>removeItem(item.id)}>Remover</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button onClick={sendAll}><Icon.Cloud className="h-4 w-4" /> Enviar ao sistema</Button>
              <Button variant="outline" onClick={clearQueue}>Limpar fila</Button>
              <Badge tone="info">{queue.length} arquivo(s)</Badge>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}