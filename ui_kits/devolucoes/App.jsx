/* Transben Devoluções UI kit — App shell */
const { Card: ACard } = window.TransbenDevoluEsDesignSystem_026074;

const PAGE_META = {
  Index: { title: 'Sistema de Controle de Devoluções', subtitle: 'Acesso direto · Transben · Controle de devoluções de fornecedores' },
  Lancamento: { title: 'Lançar / Excluir Devolução', subtitle: 'Registre uma NF de devolução individual, em lote, ou exclua um pendente' },
  Notas: { title: 'Notas Lançadas', subtitle: 'Todas as devoluções registradas, por fornecedor e status' },
  Busca: { title: 'Buscar NF / Fornecedor', subtitle: 'Pesquise lançamentos ativos e o histórico arquivado' },
  Email: { title: 'E-mail de Devolução', subtitle: 'Monte e envie o comunicado de devolução por NFD' },
  Frete: { title: 'Programar Devolução', subtitle: 'Defina o frete, agendamento e transportadora da retirada' },
  Transferencias: { title: 'Transferências', subtitle: 'Acompanhe, baixe, reagende ou cancele as transferências' },
  BaixaDevolucao: { title: 'Baixa para Devolução', subtitle: 'Baixe NFs pendentes como Devolvido em lote' },
  BaixaVenda: { title: 'Baixa para Venda', subtitle: 'Baixe NFs pendentes como Venda em lote' },
  Reabertura: { title: 'Reabrir Devoluções', subtitle: 'Retorne NFs concluídas para o status Pendente' },
  Relatorios: { title: 'Relatórios (PDF)', subtitle: 'Gere relatórios consolidados salvos no Drive' },
};

const BUILT = { Index: true, Lancamento: true, Notas: true };

function Placeholder({ page }) {
  return (
    <div style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <ACard>
        <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'inline-flex', padding: 14, borderRadius: 999, background: 'var(--navy-50)', color: 'var(--brand-blue)', marginBottom: 14 }}>
            <Icon name="package" size={26} />
          </div>
          <div style={{ font: 'var(--fw-semibold) 15px/1.3 var(--font-sans)', color: 'var(--text-strong)', marginBottom: 6 }}>Tela "{page}"</div>
          <p style={{ font: 'var(--fw-regular) 13px/1.6 var(--font-sans)', maxWidth: 420, margin: '0 auto' }}>
            Esta funcionalidade existe no sistema real, mas não está reproduzida neste UI kit de amostra.
            As telas demonstradas são <strong>Menu Principal</strong>, <strong>Lançamento</strong> e <strong>Notas Lançadas</strong>.
          </p>
        </div>
      </ACard>
    </div>
  );
}

function App() {
  const [page, setPage] = React.useState('Index');
  const [collapsed, setCollapsed] = React.useState(false);
  const meta = PAGE_META[page] || { title: page, subtitle: '' };

  let screen;
  if (page === 'Index') screen = <Dashboard onNavigate={setPage} />;
  else if (page === 'Lancamento') screen = <Lancamento />;
  else if (page === 'Notas') screen = <Notas />;
  else if (page === 'Busca') screen = <Busca />;
  else if (page === 'Email') screen = <Email />;
  else if (page === 'Frete') screen = <Frete />;
  else if (page === 'Transferencias') screen = <Transferencias />;
  else if (page === 'BaixaVenda') screen = <BaixaVenda />;
  else if (page === 'BaixaDevolucao') screen = <BaixaDevolucao />;
  else if (page === 'Reabertura') screen = <Reabertura />;
  else if (page === 'Relatorios') screen = <Relatorios />;
  else screen = <Placeholder page={page} />;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-app)', font: 'var(--type-body)' }}>
      <Sidebar current={page} onNavigate={setPage} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} vencidos={4} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar title={meta.title} subtitle={meta.subtitle} />
        <main style={{ flex: 1, overflowY: 'auto' }}>{screen}</main>
      </div>
    </div>
  );
}

window.App = App;
