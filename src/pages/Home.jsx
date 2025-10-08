import React from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Badge from "../components/Badge.jsx";
import Icon from "../components/Icons.jsx";
import { BRAND, TIPOLOGIAS } from "../data/constants.js";

function Kpi({ label, value, hint, tone = "default" }) {
  const toneClass =
    tone === "success" ? "text-green-600" :
    tone === "danger"  ? "text-red-600"   :
    tone === "info"    ? "text-sky-600"   :
    tone === "amber"   ? "text-amber-600" : "text-slate-900";

  return (
    <div className="rounded-3xl border p-4" style={{ borderColor: BRAND.border }}>
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${toneClass}`}>{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}

export default function Home({ role = "admin", counts = {}, setRoute, onUploadClick }) {
  const totalDocs = React.useMemo(
    () => Object.values(counts || {}).reduce((a, b) => a + (Number(b) || 0), 0),
    [counts]
  );

  // números de exemplo para dar vida ao dashboard (somente front)
  const mensal = Math.round(totalDocs * 0.08) || 120;
  const pendETCM = counts.etcm ?? 14;
  const ocultos = counts.ocultos ?? 5;
  const usoPct = 72;

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4">

      {/* Hero / boas-vindas + ações principais */}
      <Card
        title="Dashboard"
        subtitle={role === "admin" ? "Visão geral do ambiente — MS Consultoria"
          : role === "patrus" ? "Visão da PATRUS" : "Visão da Prefeitura"}
      >
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="rounded-3xl border p-4" style={{ borderColor: BRAND.border }}>
            <div className="text-sm font-semibold">Atalhos rápidos</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button onClick={onUploadClick}><Icon.Upload className="h-4 w-4" /> Digitalizar / Upload</Button>
              <Button variant="outline" onClick={() => setRoute?.("docs")}><Icon.Search className="h-4 w-4" /> Buscar documentos</Button>
              <Button variant="outline" onClick={() => setRoute?.("integracoes")}><Icon.Cloud className="h-4 w-4" /> ETCM</Button>
            </div>
          </div>

          <Kpi label="Documentos (total)" value={totalDocs} hint="somatório por tipologia" />
          <Kpi label="No mês" value={mensal} hint="documentos recebidos" tone="info" />
          <Kpi label="Ocultos" value={ocultos} hint="visíveis só p/ admin" tone="amber" />
        </div>
      </Card>

      {/* Status rápido */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="ETCM — status">
          <div className="flex items-center gap-2">
            <Badge tone="success">Operacional</Badge>
            <span className="text-xs text-slate-500">Última sincronização: há 5 min</span>
          </div>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>Envios pendentes: <b>{pendETCM}</b></li>
            <li>Recibos aguardando leitura: <b>3</b></li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Button onClick={() => setRoute?.("integracoes")}>Abrir Integrações</Button>
            <Button variant="outline" onClick={() => setRoute?.("relatorios")}>Ver relatórios</Button>
          </div>
        </Card>

        <Card title="Armazenamento" subtitle="Uso estimado">
          <div className="text-2xl font-bold">{usoPct}%</div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-3 rounded-full" style={{ width: `${usoPct}%`, background: BRAND.blue }} />
          </div>
          <div className="mt-2 text-xs text-slate-500">Capacidade planejada 11.5 TB</div>
        </Card>

        <Card title="Atividade recente">
          <ul className="space-y-2 text-sm">
            <li>• Folha Maio/2025 enviada ao ETCM</li>
            <li>• 5 contratos importados por Digitalização</li>
            <li>• Usuário “Pref. Imperatriz” reativado</li>
          </ul>
          <div className="mt-3">
            <Button variant="outline" onClick={() => setRoute?.("docs")}>Ver tudo</Button>
          </div>
        </Card>
      </div>

      {/* Visão por tipologia (clicável) */}
      <Card title="Por tipologia" subtitle="Navegue rapidamente pelos conjuntos de documentos.">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {TIPOLOGIAS.map((t) => {
            const qtd = Number(counts?.[t.key] ?? 0);
            const isRestricted = t.restricted;
            return (
              <button
                key={t.key}
                onClick={() => setRoute?.("docs")}
                className="group rounded-3xl border p-4 text-left transition hover:border-slate-300 hover:bg-blue-50/40"
                style={{ borderColor: BRAND.border }}
                title={isRestricted ? "Apenas administradores" : ""}
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold text-slate-800">
                    <span className="mr-1">{t.icon}</span> {t.label}
                  </div>
                  {isRestricted && <Badge tone="amber">Oculto</Badge>}
                </div>
                <div className="mt-1 text-xs text-slate-500">{t.desc}</div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-2xl font-bold text-slate-900">{qtd}</div>
                  <span className="text-xs text-slate-500 group-hover:text-slate-700">Abrir</span>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Próximas ações sugeridas */}
      <Card title="Sugestões">
        <div className="flex flex-wrap gap-2">
          <Button onClick={onUploadClick}><Icon.Upload className="h-4 w-4" /> Digitalizar novos documentos</Button>
          <Button variant="outline" onClick={() => setRoute?.("usuarios")}><Icon.File className="h-4 w-4" /> Revisar acessos</Button>
          <Button variant="outline" onClick={() => setRoute?.("relatorios")}><Icon.File className="h-4 w-4" /> Exportar relatórios</Button>
        </div>
      </Card>
    </div>
  );
}