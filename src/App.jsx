import React from "react";

import Topbar from "./components/Topbar.jsx";
import Home from "./pages/Home.jsx";
import Documents from "./pages/Documents.jsx";
import Digitalizacao from "./pages/Digitalizacao.jsx";
import Users from "./pages/Users.jsx";
import Integracoes from "./pages/Integracoes.jsx";
import Reports from "./pages/Reports.jsx";
import Support from "./pages/Support.jsx";

export default function App() {
  const [route, setRoute] = React.useState("home");
  const [role, setRole] = React.useState("admin");
  const [query, setQuery] = React.useState("");

  // mocks leves só para a Home mostrar contadores
  const counts = React.useMemo(
    () => ({
      financeiro: 120, folha: 80, contratos: 44, patrimonio: 55,
      educacao: 33, saude: 29, licitacoes: 21, etcm: 14, ocultos: 5
    }),
    []
  );

  const onUploadClick = () => setRoute("digitalizacao");
  const onSearch = () => setRoute("docs");

  const render = () => {
    switch (route) {
      case "docs": return <Documents />;
      case "digitalizacao": return <Digitalizacao />;
      case "usuarios": return <Users />;
      case "integracoes": return <Integracoes />;
      case "relatorios": return <Reports />;
      case "suporte": return <Support />;
      case "home":
      default:
        return (
          <Home
            setRoute={setRoute}
            onUploadClick={onUploadClick}
            role={role}
            counts={counts}
            onOpenTipologia={() => setRoute("docs")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Topbar
        role={role}
        setRole={setRole}
        onUploadClick={onUploadClick}
        onSearch={onSearch}
        query={query}
        setQuery={setQuery}
        setRoute={setRoute}
      />
      <main className="pb-16 pt-4">{render()}</main>
      <footer className="border-t py-6 text-center text-xs text-slate-500">
        © 2025 MS Assessoria & Serviços — Protótipo (Front-End)
      </footer>
    </div>
  );
}