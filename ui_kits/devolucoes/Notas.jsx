/* Transben Devoluções UI kit — Notas Lançadas (data table) */
const { Card: NCard, Button: NButton, Input: NInput, Select: NSelect, StatusBadge: NBadge, IconButton } = window.TransbenDevoluEsDesignSystem_026074;

const DADOS = [
  { nfd: '8841', nf: '045.872', data: '12/06', forn: 'Britânia', tipo: 'Avaria', desc: 'Liquidificador 3L c/12', qtd: 12, valor: '3.480,00', status: 'pendente', dias: 8 },
  { nfd: '8839', nf: '045.913', data: '11/06', forn: 'Unilever', tipo: 'Falta', desc: 'Shampoo 400ml cx/12', qtd: 8, valor: '1.229,90', status: 'transferencia', dias: 3 },
  { nfd: '8835', nf: '046.004', data: '09/06', forn: 'Variados', tipo: 'Rejeição', desc: 'Detergente 500ml fardo', qtd: 144, valor: '2.196,00', status: 'devolvido', dias: 21 },
  { nfd: '8830', nf: '045.788', data: '04/06', forn: 'Britânia', tipo: 'Avaria', desc: 'Ventilador 40cm', qtd: 6, valor: '4.140,00', status: 'atraso', dias: 34 },
  { nfd: '8822', nf: '045.701', data: '02/06', forn: 'Unilever', tipo: 'Falta', desc: 'Sabonete 90g pack/6', qtd: 240, valor: '1.872,00', status: 'venda', dias: 18 },
  { nfd: '8814', nf: '045.640', data: '28/05', forn: 'Variados', tipo: 'Avaria', desc: 'Mixer 250W', qtd: 9, valor: '1.611,00', status: 'devolvido', dias: 25 },
  { nfd: '8808', nf: '045.588', data: '26/05', forn: 'Britânia', tipo: 'Rejeição', desc: 'Cafeteira 30 xíc.', qtd: 4, valor: '2.760,00', status: 'pendente', dias: 31 },
];

const TABS = ['Todos', 'Britânia', 'Unilever', 'Variados'];

function Notas() {
  const [tab, setTab] = React.useState('Todos');
  const [q, setQ] = React.useState('');
  const [status, setStatus] = React.useState('');

  const rows = DADOS.filter((r) =>
    (tab === 'Todos' || r.forn === tab) &&
    (status === '' || r.status === status) &&
    (q === '' || (r.nf + r.forn + r.desc).toLowerCase().includes(q.toLowerCase())));

  const total = rows.reduce((s, r) => s + parseFloat(r.valor.replace('.', '').replace(',', '.')), 0);

  return (
    <div style={{ padding: 24, maxWidth: 1180, margin: '0 auto' }}>
      {/* Tabs + filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 2, background: 'var(--slate-100)', padding: 3, borderRadius: 'var(--radius-sm)' }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '7px 14px', border: 'none', borderRadius: 'var(--radius-xs)', cursor: 'pointer',
              font: `${tab === t ? 'var(--fw-semibold)' : 'var(--fw-medium)'} 12.5px/1 var(--font-sans)`,
              background: tab === t ? 'var(--white)' : 'transparent', color: tab === t ? 'var(--brand-blue)' : 'var(--text-muted)',
              boxShadow: tab === t ? 'var(--shadow-xs)' : 'none', transition: 'var(--transition-control)',
            }}>{t}</button>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 180, maxWidth: 280 }}>
          <NInput leadingIcon={<Icon name="search" size={15} />} placeholder="Buscar NF, fornecedor…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div style={{ width: 170 }}>
          <NSelect placeholder="Todos os status" value={status} onChange={(e) => setStatus(e.target.value)}
            options={[{ value: 'pendente', label: 'Pendente' }, { value: 'transferencia', label: 'Em Transferência' }, { value: 'devolvido', label: 'Devolvido' }, { value: 'venda', label: 'Venda' }, { value: 'atraso', label: 'Atrasado' }]} />
        </div>
        <NButton variant="secondary" size="md" leadingIcon={<Icon name="download" size={15} />}>Exportar</NButton>
      </div>

      <NCard pad={false} header={<><span>{rows.length} notas · {tab}</span>
        <span style={{ font: 'var(--type-mono)', color: 'var(--text-muted)', fontSize: 13 }}>Total R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></>}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860 }}>
            <thead><tr>
              {[['NFD', 'l'], ['NF', 'l'], ['Data', 'l'], ['Fornecedor', 'l'], ['Tipo', 'l'], ['Produto', 'l'], ['Qtd', 'r'], ['Valor R$', 'r'], ['Status', 'l'], ['', 'r']].map(([h, a], i) => (
                <th key={i} style={{ textAlign: a === 'r' ? 'right' : 'left', padding: '11px 14px', position: 'sticky', top: 0,
                  font: 'var(--fw-semibold) 10px/1 var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.05em',
                  color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--slate-50)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.nfd} style={{ transition: 'background .1s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--slate-50)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={ntdMono}>{r.nfd}</td>
                  <td style={ntdMono}>{r.nf}</td>
                  <td style={ntdMono}>{r.data}</td>
                  <td style={ntd}>{r.forn}</td>
                  <td style={ntd}><span style={{ font: 'var(--fw-medium) 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{r.tipo}</span></td>
                  <td style={{ ...ntd, color: 'var(--text-body)' }}>{r.desc}</td>
                  <td style={{ ...ntdMono, textAlign: 'right' }}>{r.qtd}</td>
                  <td style={{ ...ntdMono, textAlign: 'right' }}>{r.valor}</td>
                  <td style={{ ...ntd, paddingTop: 7, paddingBottom: 7 }}><NBadge status={r.status} size="sm" label={r.status === 'atraso' ? r.dias + ' dias' : undefined} /></td>
                  <td style={{ ...ntd, textAlign: 'right', paddingTop: 6, paddingBottom: 6 }}>
                    <IconButton label="Editar" variant="ghost" size="sm"><Icon name="pencil" size={15} /></IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NCard>
    </div>
  );
}

const ntd = { padding: '11px 14px', font: 'var(--fw-medium) 13px/1.3 var(--font-sans)', color: 'var(--text-strong)', borderBottom: '1px solid var(--slate-100)', whiteSpace: 'nowrap' };
const ntdMono = { ...ntd, fontFamily: 'var(--font-mono)', fontFeatureSettings: '"tnum" 1' };

window.Notas = Notas;
