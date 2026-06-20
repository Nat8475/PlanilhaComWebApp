# UI Kit — Sistema de Controle de Devoluções

High-fidelity recreation of the **Transben internal returns-control app**, modernized onto
this design system. Recreates the real Google Apps Script web app (`Planilha 2/`): the navy
sidebar SPA shell, the home/quick-actions screen, the Lançamento form, and the Notas table.

## Run
Open `index.html`. It's an interactive click-through:
- **Menu Principal** (`Dashboard.jsx`) — KPI tiles (Pendentes, Em Transferência, Devolvido,
  Venda, Atrasos), the +30-dias alert, a recent-devoluções table, and the two real quick
  actions ("Verificar Atrasos", "Forçar Arquivamento") that simulate running.
- **Lançar / Excluir** (`Lancamento.jsx`) — the three-mode selector (Individual / Lote /
  Excluir) → the full individual-lançamento form (Fornecedor, NFD, Tipo, NF, Motivo,
  Descrição, Qtd, Valor, anexo dropzone) with a simulated save.
- **Notas Lançadas** (`Notas.jsx`) — supplier tabs, search + status filter, and the data
  table with status badges and a running total.
- Other nav items show a labelled placeholder (not reproduced in this sample kit).

## Files
| File | Role |
|---|---|
| `index.html` | Mounts the app; loads the DS bundle + all kit scripts |
| `App.jsx` | Shell — sidebar + topbar + page routing (React state) |
| `Sidebar.jsx` | Navy sidebar, real nav sections, red active rule + vencido badge |
| `Topbar.jsx` | White header with page title + the official Transben logo |
| `Helpers.jsx` | Shared screen helpers (Secao, ScreenInfo, EmptyState, table cells) |
| `Dashboard.jsx` | Menu Principal: KPIs, alert, recent table, quick actions |
| `Lancamento.jsx` | Lançamento mode selector + individual form |
| `Notas.jsx` | Notas Lançadas data table with tabs/filters |
| `Consultas.jsx` | Busca, E-mail de Devolução, Relatórios (PDF) |
| `Operacoes.jsx` | Programar Frete, Transferências (+ modais), Baixas, Reabertura |
| `Icons.jsx` | Lucide icon subset (`<Icon name=… />`) |

## Screens (all 11 nav functions)
**Lançamentos:** Menu Principal · Lançar/Excluir · Notas Lançadas · Buscar · E-mail de Devolução.
**Operações:** Programar Devolução (frete) · Transferências (baixa/reagendar/cancelar) · Baixa p/ Devolução · Baixa p/ Venda · Reabrir Devoluções.
**Relatórios:** Relatórios (PDF) — mensal/semanal/diário/fornecedor/pendências.

## Notes
- Components come from the design system bundle (`window.TransbenDevoluEsDesignSystem_026074`):
  `Button`, `IconButton`, `Card`, `Field`, `Input`, `Select`, `StatusBadge`, `MetricCard`,
  `Alert`. The kit only adds product-specific composition (sidebar, tables, forms).
- Brand: royal blue `#25419A` chrome, red `#C62025` as the active-nav / badge accent.
- Icons are **Lucide** (stroke 2). Data is illustrative sample data, not real records.
