/* Transben Devoluções UI kit — Dashboard (Menu Principal, modernized) */
const { MetricCard, Card, Button, StatusBadge, Alert } = window.TransbenDevoluEsDesignSystem_026074;

const QUICK_ACTIONS = [
  { id: 'atraso', icon: 'bell-ring', title: 'Verificar Atrasos Agora', desc: 'Varre pendências com +30 dias e envia alerta por e-mail', accent: 'var(--brand-red)' },
  { id: 'arquivar', icon: 'package', title: 'Forçar Arquivamento Manual', desc: 'Move itens Devolvido / Venda para o Histórico_Arquivo', accent: 'var(--brand-blue)' },
];

const RECENTES = [
  { nf: '045.872', forn: 'Britânia', desc: 'Liquidificador 3L c/12', qtd: '12', valor: '3.480,00', status: 'pendente', dias: 8 },
  { nf: '045.913', forn: 'Unilever', desc: 'Shampoo 400ml cx/12', qtd: '8', valor: '1.229,90', status: 'transferencia', dias: 3 },
  { nf: '046.004', forn: 'Variados', desc: 'Detergente 500ml fardo', qtd: '144', valor: '2.196,00', status: 'devolvido', dias: 21 },
  { nf: '045.788', forn: 'Britânia', desc: 'Ventilador 40cm', qtd: '6', valor: '4.140,00', status: 'atraso', dias: 34 },
];

function ActionCard({ action, onRun, busy, done }) {
  return (
    <button onClick={() => onRun(action.id)} disabled={busy} style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, textAlign: 'left',
      background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
      padding: '15px 16px', cursor: busy ? 'wait' : 'pointer', boxShadow: 'var(--shadow-sm)',
      transition: 'box-shadow .15s var(--ease-out), border-color .15s var(--ease-out)', width: '100%',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--border-default)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}>
      <span style={{
        width: 38, height: 38, borderRadius: 'var(--radius-sm)', flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: action.accent + '14', color: action.accent,
      }}><Icon name={done ? 'check' : action.icon} size={19} /></span>
      <div style={{ minWidth: 0 }}>
        <strong style={{ display: 'block', font: 'var(--fw-semibold) 13px/1.3 var(--font-sans)', color: 'var(--text-strong)', marginBottom: 2 }}>{action.title}</strong>
        <span style={{ display: 'block', font: 'var(--fw-regular) 11px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}>
          {done ? 'Concluído com sucesso.' : action.desc}
        </span>
      </div>
    </button>
  );
}

function Dashboard({ onNavigate }) {
  const [busy, setBusy] = React.useState(null);
  const [done, setDone] = React.useState({});
  const run = (id) => { setBusy(id); setTimeout(() => { setBusy(null); setDone((d) => ({ ...d, [id]: true })); }, 1100); };

  return (
    <div style={{ padding: 24, maxWidth: 1180, margin: '0 auto' }}>
      <Alert tone="warning" title="4 itens com mais de 30 dias armazenados" style={{ marginBottom: 18 }}>
        Há devoluções pendentes vencidas e 1 transferência atrasada. Revise as pendências antes do fechamento.
      </Alert>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 22 }}>
        <MetricCard label="Pendentes" value="142" unit="NFs" accent="navy" icon={<Icon name="clipboard-list" size={17} />} hint="valor R$ 318,4 mil" />
        <MetricCard label="Em Transferência" value="17" unit="NFs" accent="transf" icon={<Icon name="truck" size={17} />} />
        <MetricCard label="Devolvido (mês)" value="86" accent="unilever" icon={<Icon name="file-check" size={17} />} trend={{ dir: 'down', value: '-9' }} />
        <MetricCard label="Baixa p/ Venda" value="23" accent="variados" icon={<Icon name="shopping-cart" size={17} />} />
        <MetricCard label="Atrasos +30d" value="4" accent="danger" icon={<Icon name="bell-ring" size={17} />} trend={{ dir: 'up', value: '+1' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 18, alignItems: 'start' }}>
        {/* Recent table */}
        <Card pad={false} header={<><span>Devoluções recentes</span>
          <Button variant="ghost" size="sm" trailingIcon={<Icon name="arrow-left-right" size={14} />} onClick={() => onNavigate('Notas')}>Ver todas</Button></>}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>
              {['NF', 'Fornecedor', 'Produto', 'Qtd', 'Valor R$', 'Status'].map((h, i) => (
                <th key={h} style={{ textAlign: i >= 3 && i <= 4 ? 'right' : 'left', padding: '10px 14px',
                  font: 'var(--fw-semibold) 10px/1 var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.05em',
                  color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--slate-50)' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {RECENTES.map((r) => (
                <tr key={r.nf}>
                  <td style={tdMono}>{r.nf}</td>
                  <td style={td}>{r.forn}</td>
                  <td style={{ ...td, color: 'var(--text-body)' }}>{r.desc}</td>
                  <td style={{ ...tdMono, textAlign: 'right' }}>{r.qtd}</td>
                  <td style={{ ...tdMono, textAlign: 'right' }}>{r.valor}</td>
                  <td style={{ ...td, paddingTop: 8, paddingBottom: 8 }}><StatusBadge status={r.status} size="sm" label={r.status === 'atraso' ? r.dias + ' dias' : undefined} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Quick actions */}
        <div>
          <div style={{ font: 'var(--fw-semibold) 10px/1 var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-muted)', margin: '4px 2px 10px' }}>Ações rápidas</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {QUICK_ACTIONS.map((a) => <ActionCard key={a.id} action={a} onRun={run} busy={busy === a.id} done={done[a.id]} />)}
          </div>
          <Card header="Nova devolução" footer={<Button block variant="accent" leadingIcon={<Icon name="plus" size={15} />} onClick={() => onNavigate('Lancamento')}>Lançar devolução</Button>}>
            <p style={{ font: 'var(--fw-regular) 12.5px/1.6 var(--font-sans)', color: 'var(--text-body)' }}>
              Registre uma NF individual, em lote, ou exclua um lançamento pendente. Anexe a foto ou PDF da nota fiscal.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

const td = { padding: '11px 14px', font: 'var(--fw-medium) 13px/1.3 var(--font-sans)', color: 'var(--text-strong)', borderBottom: '1px solid var(--slate-100)' };
const tdMono = { ...td, fontFamily: 'var(--font-mono)', fontFeatureSettings: '"tnum" 1', color: 'var(--text-strong)' };

window.Dashboard = Dashboard;
