import React from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Badge from "../components/Badge.jsx";
import Icon from "../components/Icons.jsx";
import { BRAND } from "../data/constants.js";

export default function Support() {
  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4">

      {/* Central de Ajuda (hero simples) */}
      <Card title="Central de Ajuda" subtitle="Encontre respostas rápidas ou fale com o time.">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Icon.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Pesquisar na base de conhecimento (ex.: ETCM, permissões, uploads)…"
              className="w-full rounded-2xl border bg-white py-2 pl-9 pr-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
              style={{ borderColor: BRAND.border }}
            />
          </div>
          <Button variant="outline"><Icon.File className="h-4 w-4" /> Abrir chamado</Button>
          <Button><Icon.Upload className="h-4 w-4" /> Enviar feedback</Button>
        </div>
      </Card>

      {/* Ações rápidas */}
      <Card title="Ações rápidas">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border p-4" style={{ borderColor: BRAND.border }}>
            <div className="text-sm font-semibold">Guia de primeiros passos</div>
            <p className="mt-1 text-xs text-slate-500">Como organizar por tipologia, criar usuários e enviar ao ETCM.</p>
            <div className="mt-3"><Button variant="soft">Abrir guia</Button></div>
          </div>
          <div className="rounded-3xl border p-4" style={{ borderColor: BRAND.border }}>
            <div className="text-sm font-semibold">Políticas & Permissões</div>
            <p className="mt-1 text-xs text-slate-500">Acesso por prefeitura/secretaria e documentos “ocultos”.</p>
            <div className="mt-3"><Button variant="soft">Ver detalhes</Button></div>
          </div>
          <div className="rounded-3xl border p-4" style={{ borderColor: BRAND.border }}>
            <div className="text-sm font-semibold">Modelos de planilha</div>
            <p className="mt-1 text-xs text-slate-500">Captura de metadados para importação em lote.</p>
            <div className="mt-3"><Button variant="soft">Baixar modelos</Button></div>
          </div>
        </div>
      </Card>

      {/* FAQ com <details> nativo (leve e acessível) */}
      <Card title="FAQ — dúvidas frequentes">
        <div className="space-y-2">
          {[
            {
              q: "Como habilitar acesso a documentos ocultos?",
              a: "Apenas administradores podem alternar a visibilidade. Acesse Usuários & Acesso → Documentos Ocultos → conceder para o usuário/órgão.",
            },
            {
              q: "Quais campos são usados na busca?",
              a: "Título, prefeitura, área/secretaria, tipologia, autor e data. Use também os filtros avançados na página Documentos.",
            },
            {
              q: "Como enviar documentos ao ETCM?",
              a: "Em Integrações, conecte com as credenciais do órgão e utilize Envio Rápido. Você também consegue enviar a partir da pré-visualização do documento.",
            },
            {
              q: "Qual é a política de backup padrão?",
              a: "Áreas críticas: semanal. Demais: mensal. Retenção de 30 dias até 1 ano (ajustável).",
            },
          ].map((item, i) => (
            <details key={i} className="rounded-2xl border px-4 py-3 open:bg-blue-50/30" style={{ borderColor: BRAND.border }}>
              <summary className="cursor-pointer select-none text-sm font-semibold text-slate-800">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </Card>

      {/* Status e Changelog simples */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Status do sistema" subtitle="Atual em tempo real (mock)">
          <div className="flex items-center gap-2 text-sm">
            <Badge tone="success">Operacional</Badge>
            <span className="text-slate-500 text-xs">Última checagem: há 1 min</span>
          </div>
          <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>Armazenamento • OK</li>
            <li>Integração ETCM • OK</li>
            <li>Upload & Pré-visualização • OK</li>
          </ul>
        </Card>

        <Card title="Changelog" subtitle="Principais melhorias recentes">
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>Nova visão por Tipologia com contagem por bloco.</li>
            <li>Pré-visualização com ações rápidas: assinar, enviar ao ETCM, compartilhar.</li>
            <li>Controle de documentos ocultos (somente admin).</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}