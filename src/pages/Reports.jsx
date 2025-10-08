import React, { useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Badge from "../components/Badge.jsx";
import Icon from "../components/Icons.jsx";
import { BRAND, TIPOLOGIAS } from "../data/constants.js";

export default function Reports() {
  // ----- Estado local apenas para UI (mock) -----
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [format, setFormat] = useState("csv");
  const [reportTypes, setReportTypes] = useState({
    inventario: true,
    etcm: false,
    auditoria: false,
  });
  const [email, setEmail] = useState("");
  const [schedule, setSchedule] = useState("none");

  const [backupKind, setBackupKind] = useState("completo");
  const [retencaoDias, setRetencaoDias] = useState(90);
  const [cryptoOn, setCryptoOn] = useState(true);
  const [integrityOn, setIntegrityOn] = useState(true);

  // mock de distribuição por tipologia (poderemos trocar por dados reais depois)
  const usage = useMemo(() => {
    // números fictícios em GB; somatório ~ 8200 GB (8.2 TB)
    const base = {
      financeiro: 2100, folha: 1650, contratos: 950, patrimonio: 1150,
      educacao: 900, saude: 850, licitacoes: 400, etcm: 150, ocultos: 50
    };
    const total = Object.values(base).reduce((a, b) => a + b, 0);
    return { base, total };
  }, []);

  const onGenerateReport = () => {
    const tipos = Object.entries(reportTypes)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(", ");
    alert(`Gerando relatório (${tipos || "nenhum tipo selecionado"}) em ${format.toUpperCase()} de ${dateFrom || "início"} a ${dateTo || "hoje"}.`);
  };

  const onScheduleEmail = () => {
    if (!email) return alert("Informe um e-mail para agendar.");
    if (schedule === "none") return alert("Selecione uma frequência.");
    alert(`Agendado envio ${schedule} para ${email}.`);
  };

  const onBackupNow = () => {
    alert(`Backup ${backupKind} iniciado com criptografia ${cryptoOn ? "ATIVADA" : "DESATIVADA"} e retenção de ${retencaoDias} dias.`);
  };

  const onRestore = () => {
    alert("Restauração iniciada (mock). Selecione um arquivo .msbackup quando implementarmos o backend.");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4">

      {/* Centro de Exportação */}
      <Card title="Centro de Exportação" subtitle="Gere relatórios e (opcionalmente) agende o envio por e-mail.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-sm font-semibold">Período</div>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)}
                     className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }} />
              <input type="date" value={dateTo} onChange={(e)=>setDateTo(e.target.value)}
                     className="rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border }} />
            </div>

            <div className="text-sm font-semibold mt-4">Tipos de relatório</div>
            <div className="flex flex-col gap-2 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={reportTypes.inventario}
                       onChange={(e)=>setReportTypes(s=>({...s, inventario: e.target.checked}))}/>
                Inventário de documentos
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={reportTypes.etcm}
                       onChange={(e)=>setReportTypes(s=>({...s, etcm: e.target.checked}))}/>
                Envios ao ETCM
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={reportTypes.auditoria}
                       onChange={(e)=>setReportTypes(s=>({...s, auditoria: e.target.checked}))}/>
                Auditoria de acessos/ações
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Formato</div>
            <select value={format} onChange={(e)=>setFormat(e.target.value)}
                    className="w-full rounded-2xl border px-3 py-2 text-sm"
                    style={{ borderColor: BRAND.border }}>
              <option value="csv">CSV</option>
              <option value="xlsx">XLSX</option>
              <option value="pdf">PDF</option>
            </select>

            <div className="text-sm font-semibold mt-4">Agendar por e-mail</div>
            <input placeholder="email@org.gov.br" value={email} onChange={(e)=>setEmail(e.target.value)}
                   className="w-full rounded-2xl border px-3 py-2 text-sm"
                   style={{ borderColor: BRAND.border }} />
            <select value={schedule} onChange={(e)=>setSchedule(e.target.value)}
                    className="w-full rounded-2xl border px-3 py-2 text-sm"
                    style={{ borderColor: BRAND.border }}>
              <option value="none">Sem agendamento</option>
              <option value="diario">Diário</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
            </select>
          </div>

          <div className="flex flex-col justify-end gap-2">
            <Button onClick={onGenerateReport}><Icon.File className="h-4 w-4" /> Gerar agora</Button>
            <Button variant="outline" onClick={onScheduleEmail}>Agendar por e-mail</Button>
            <Badge tone="info">Dica: combine com filtros da página “Documentos”.</Badge>
          </div>
        </div>
      </Card>

      {/* Armazenamento & Utilização */}
      <Card title="Armazenamento & Utilização" subtitle="Estimativa por tipologia (mock)">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border p-4" style={{ borderColor: BRAND.border }}>
            <div className="text-sm font-semibold">Uso total</div>
            <div className="mt-1 text-2xl font-bold text-slate-900">{(usage.total/1024).toFixed(1)} TB</div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-3 rounded-full" style={{ width: "72%", background: BRAND.blue }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">Capacidade planejada: 11.5 TB • Utilizado: ~72%</p>
          </div>

          <div className="rounded-3xl border p-4" style={{ borderColor: BRAND.border }}>
            <div className="text-sm font-semibold mb-2">Por tipologia</div>
            <ul className="space-y-2 text-sm">
              {TIPOLOGIAS.map(t => {
                const val = usage.base[t.key] ?? 0;
                const pct = Math.round((val / usage.total) * 100);
                return (
                  <li key={t.key}>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">{t.icon} {t.label}</span>
                      <span className="text-xs text-slate-500">{val} GB • {pct}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: BRAND.blue }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Card>

      {/* Política de Backup */}
      <Card title="Política de Backup" subtitle="Apenas front-end (simulação).">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border p-4" style={{ borderColor: BRAND.border }}>
            <div className="text-sm font-semibold">Frequência</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Áreas críticas — <b>Semanal</b></li>
              <li>Demais áreas — <b>Mensal</b></li>
            </ul>
            <div className="mt-3">
              <label className="text-xs text-slate-500">Retenção (dias)</label>
              <input type="range" min={30} max={365} step={5} value={retencaoDias}
                     onChange={(e)=>setRetencaoDias(parseInt(e.target.value))}
                     className="w-full" />
              <div className="text-xs text-slate-600 mt-1">{retencaoDias} dias</div>
            </div>
          </div>

          <div className="rounded-3xl border p-4" style={{ borderColor: BRAND.border }}>
            <div className="text-sm font-semibold">Segurança</div>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={cryptoOn} onChange={(e)=>setCryptoOn(e.target.checked)} />
              Criptografia em repouso (AES-256)
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={integrityOn} onChange={(e)=>setIntegrityOn(e.target.checked)} />
              Verificação de integridade
            </label>
            <p className="mt-2 text-xs text-slate-500">Trânsito protegido com TLS 1.2+</p>
          </div>

          <div className="rounded-3xl border p-4" style={{ borderColor: BRAND.border }}>
            <div className="text-sm font-semibold">Próximos agendamentos</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li>Dom 02:00 — backup semanal (crítico)</li>
              <li>1º dia útil — backup mensal (geral)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Backup & Restore */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Backup manual">
          <div className="flex flex-wrap items-center gap-2">
            <select value={backupKind} onChange={(e)=>setBackupKind(e.target.value)}
                    className="rounded-2xl border px-3 py-2 text-sm"
                    style={{ borderColor: BRAND.border }}>
              <option value="completo">Completo</option>
              <option value="incremental">Incremental</option>
            </select>
            <Button onClick={onBackupNow}><Icon.Cloud className="h-4 w-4" /> Iniciar backup</Button>
            <Button variant="outline"><Icon.File className="h-4 w-4" /> Baixar último pacote</Button>
          </div>
          <div className="mt-2 text-xs text-slate-500">Último backup concluído: há 2 dias • Duração: 14 min</div>
        </Card>

        <Card title="Restauração">
          <div className="flex flex-wrap items-center gap-2">
            <input type="file" className="text-sm" />
            <Button variant="soft" onClick={onRestore}>Restaurar pacote</Button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Aceita arquivos <code>.msbackup</code> (quando o backend estiver disponível).
          </p>
        </Card>
      </div>

      {/* Histórico (changelog de backup) */}
      <Card title="Histórico de backup">
        <ul className="space-y-2 text-sm">
          {[
            { t: "Hoje 02:10", m: "Verificação de integridade concluída", ok: true },
            { t: "Há 2 dias", m: "Backup semanal (crítico) concluído", ok: true },
            { t: "Há 9 dias", m: "Backup mensal (geral) concluído", ok: true },
          ].map((l, i) => (
            <li key={i} className="flex items-center gap-2">
              <Icon.Check className="h-4 w-4 text-green-600" />
              <span className="text-slate-500">{l.t} — </span>
              <span>{l.m}</span>
              {l.ok ? <Badge tone="success" >OK</Badge> : <Badge tone="danger">Falhou</Badge>}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}