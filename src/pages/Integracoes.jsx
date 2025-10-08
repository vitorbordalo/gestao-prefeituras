import React, { useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Badge from "../components/Badge.jsx";
import { BRAND, PREFEITURAS, TIPOLOGIAS } from "../data/constants.js";

export default function Integracoes() {
  // Conexão simples
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [connected, setConnected] = useState(false);

  // Filtros e seleção
  const [fPref, setFPref] = useState("");
  const [fTipo, setFTipo] = useState("");
  const [sel, setSel] = useState({});

  // Itens pendentes (mock leve só para demo)
  const ALL = useMemo(
    () => [
      { id: "Q-1001", titulo: "Folha Maio/2025", prefeitura: "São Luís", tipologia: "folha" },
      { id: "Q-1002", titulo: "Contrato 23/2025", prefeitura: "Imperatriz", tipologia: "contratos" },
      { id: "Q-1003", titulo: "Balancete Q2", prefeitura: "Balsas", tipologia: "financeiro" },
      { id: "Q-1004", titulo: "Relatório Escolar", prefeitura: "Açailândia", tipologia: "educacao" },
    ],
    []
  );

  const view = ALL.filter(
    (d) => (!fPref || d.prefeitura === fPref) && (!fTipo || d.tipologia === fTipo)
  );

  // Histórico simples
  const [hist, setHist] = useState([
    { when: "há 2 dias", qtd: 12, status: "sucesso" },
    { when: "há 1 semana", qtd: 37, status: "sucesso" },
  ]);

  // Ações
  const connect = () => {
    if (!token || !secret) return alert("Informe Token e Secret.");
    setConnected(true);
    alert("Conectado ao ETCM.");
  };
  const disconnect = () => setConnected(false);

  const toggleAll = (checked) => {
    const next = {};
    if (checked) view.forEach((d) => (next[d.id] = true));
    setSel(next);
  };

  const sendSelected = () => {
    const ids = Object.entries(sel).filter(([, v]) => v).map(([k]) => k);
    if (!connected) return alert("Conecte ao ETCM primeiro.");
    if (!ids.length) return alert("Selecione pelo menos 1 documento.");
    setHist((h) => [{ when: "agora", qtd: ids.length, status: "sucesso" }, ...h]);
    setSel({});
    alert(`Enviado: ${ids.length} documento(s).`);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4">
      {/* 1) Conexão */}
      <Card title="ETCM — Conexão" subtitle="Preencha as credenciais e conecte.">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-2 grid gap-2">
            <input
              placeholder="Token / Client ID"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="rounded-2xl border px-3 py-2 text-sm"
              style={{ borderColor: BRAND.border }}
            />
            <input
              placeholder="Secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="rounded-2xl border px-3 py-2 text-sm"
              style={{ borderColor: BRAND.border }}
            />
          </div>
          <div className="flex items-end gap-2">
            {!connected ? (
              <Button onClick={connect}>Conectar</Button>
            ) : (
              <Button variant="soft" onClick={disconnect}>Desconectar</Button>
            )}
            {connected ? <Badge tone="success">Conectado</Badge> : <Badge tone="danger">Desconectado</Badge>}
          </div>
        </div>
      </Card>

      {/* 2) Enviar documentos */}
      <Card title="Enviar documentos" subtitle="Filtre, selecione e envie ao ETCM.">
        <div className="mb-3 grid gap-2 sm:grid-cols-3">
          <select
            value={fPref}
            onChange={(e) => setFPref(e.target.value)}
            className="rounded-2xl border px-3 py-2 text-sm"
            style={{ borderColor: BRAND.border }}
          >
            <option value="">Prefeitura (todas)</option>
            {PREFEITURAS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <select
            value={fTipo}
            onChange={(e) => setFTipo(e.target.value)}
            className="rounded-2xl border px-3 py-2 text-sm"
            style={{ borderColor: BRAND.border }}
          >
            <option value="">Tipologia (todas)</option>
            {TIPOLOGIAS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <Button onClick={sendSelected} disabled={!connected}>
              Enviar selecionados
            </Button>
            {!connected && <span className="text-xs text-slate-500">Conecte para enviar</span>}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border" style={{ borderColor: BRAND.border }}>
          <table className="min-w-full divide-y" style={{ borderColor: BRAND.border }}>
            <thead className="bg-gray-50 text-left text-xs font-semibold text-slate-600">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAll(e.target.checked)}
                    checked={view.length > 0 && view.every((d) => sel[d.id])}
                    aria-label="Selecionar todos"
                  />
                </th>
                {["Título", "Prefeitura", "Tipologia"].map((h) => (
                  <th key={h} className="px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y bg-white text-sm" style={{ borderColor: BRAND.border }}>
              {view.map((d) => (
                <tr key={d.id} className="hover:bg-blue-50/40">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={!!sel[d.id]}
                      onChange={(e) => setSel((s) => ({ ...s, [d.id]: e.target.checked }))}
                      aria-label={`Selecionar ${d.titulo}`}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{d.titulo}</td>
                  <td className="px-4 py-3">{d.prefeitura}</td>
                  <td className="px-4 py-3">
                    {TIPOLOGIAS.find((t) => t.key === d.tipologia)?.label}
                  </td>
                </tr>
              ))}
              {view.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-500" colSpan={4}>
                    Nenhum documento encontrado com os filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 3) Histórico simples */}
      <Card title="Histórico de envios (recentes)">
        <ul className="space-y-2 text-sm">
          {hist.map((h, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-slate-500">{h.when}</span> •{" "}
              <span>{h.qtd} documento(s)</span>{" "}
              {h.status === "sucesso" ? (
                <Badge tone="success">sucesso</Badge>
              ) : (
                <Badge tone="danger">falha</Badge>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}