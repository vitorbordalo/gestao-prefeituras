import React from "react";
import { BRAND, TIPOLOGIAS } from "../data/constants.js";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Icon from "../components/Icons.jsx";
import Badge from "../components/Badge.jsx";

function BannerHero({ setRoute, onUploadClick }) {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Icon.Cloud className="h-3.5 w-3.5" />
              Armazenamento seguro 24/7 — White Mode
            </div>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
              Gestão de Documentos para Prefeituras —
              <span className="ml-2 inline-block rounded-xl px-2.5 py-1 text-white" style={{ background: BRAND.blue }}>
                PATRUS
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-slate-600">
              Busque, inclua, gerencie e integre documentos ao ETCM com controle de acesso
              avançado e visão por tipologia. Projetado para escalar a milhões de arquivos.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button onClick={() => setRoute("docs")}>
                <Icon.File className="h-4 w-4" /> Ver Documentos
              </Button>
              <Button variant="outline" onClick={onUploadClick}>
                <Icon.Upload className="h-4 w-4" /> Enviar Arquivos
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[16/11] w-full overflow-hidden rounded-3xl border bg-white shadow-sm" style={{ borderColor: BRAND.border }}>
              <div className="h-full w-full bg-gradient-to-b from-white via-white to-blue-50">
                <div className="flex h-full items-center justify-center">
                  <div className="flex items-center gap-3">
                    <Icon.Logo className="h-12 w-12" />
                    <div>
                      <div className="text-xl font-bold text-slate-800">MS Assessoria & Serviços</div>
                      <div className="text-sm text-slate-500">Protótipo — Gestão Documental</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-x-6 -top-8 -z-10 h-40 rounded-full bg-blue-100 blur-3xl"/>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPIs() {
  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-4">
      {[
        { label: "Documentos totais", value: "1.002.345", sub: "+1.200/mês" },
        { label: "Usuários ativos", value: "18", sub: "1 admin (acesso total)" },
        { label: "Envios ao ETCM", value: "7.423", sub: "92% concluídos" },
        { label: "Armazenamento", value: "8.2 TB", sub: "Backups semanais" },
      ].map((k) => (
        <Card key={k.label}>
          <div className="space-y-1">
            <div className="text-xs text-slate-500">{k.label}</div>
            <div className="text-2xl font-bold text-slate-900">{k.value}</div>
            <div className="text-xs text-slate-500">{k.sub}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function TipologiaGrid({ role, counts, onOpenTipologia }) {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-2 mt-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">Visão por Tipologia</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TIPOLOGIAS.filter((t) => !(t.restricted && role !== "admin")).map((t) => (
          <button
            key={t.key}
            onClick={() => onOpenTipologia?.(t.key)}
            className="group rounded-3xl border bg-white p-4 text-left shadow-sm transition hover:shadow-md"
            style={{ borderColor: BRAND.border }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold text-slate-900">{t.icon} {t.label}</div>
                <div className="text-xs text-slate-500">{t.desc}</div>
              </div>
              <Badge tone="info">{counts[t.key] || 0} docs</Badge>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-2 rounded-full" style={{ width: `${Math.min(100, (counts[t.key] || 1) * 7)}%`, background: BRAND.blue }} />
            </div>
            <div className="mt-3 text-xs text-slate-500">Clique para filtrar por tipologia</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home({ setRoute, onUploadClick, role, counts, onOpenTipologia }) {
  return (
    <>
      <BannerHero setRoute={setRoute} onUploadClick={onUploadClick} />
      <KPIs />
      <TipologiaGrid role={role} counts={counts} onOpenTipologia={onOpenTipologia} />
    </>
  );
}