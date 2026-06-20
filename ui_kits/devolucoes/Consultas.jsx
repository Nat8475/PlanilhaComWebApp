/* Transben Devoluções UI kit — Consultas: Busca, E-mail, Relatórios */
const CON_DS = window.TransbenDevoluEsDesignSystem_026074;

/* ═══════════════ BUSCA ═══════════════ */
const BUSCA_DADOS = [
  { origem: 'ativo', nf: '045.872', forn: 'Britânia', desc: 'Liquidificador 3L c/12', status: 'pendente', data: '12/06/2026', valor: '3.480,00', arq: '' },
  { origem: 'ativo', nf: '045.913', forn: 'Unilever', desc: 'Shampoo 400ml cx/12', status: 'transferencia', data: '11/06/2026', valor: '1.229,90', arq: '' },
  { origem: 'historico', nf: '044.512', forn: 'Britânia', desc: 'Batedeira 5L', status: 'devolvido', data: '03/04/2026', valor: '5.220,00', arq: '18/04/2026' },
  { origem: 'historico', nf: '043.980', forn: 'Variados', desc: 'Caixa térmica 34L', status: 'venda', data: '21/03/2026', valor: '912,00', arq: '02/04/2026' },
];

function Busca() {
  const [q, setQ] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const run = () => { if (!q.trim()) return; setLoading(true); setDone(false); setTimeout(() => { setLoading(false); setDone(true); }, 700); };
  const rows = BUSCA_DADOS.filter((r) => (r.nf + r.forn + r.desc).toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <ScreenInfo>Busque por <strong>NF, NFD, fornecedor ou descrição</strong>. A busca varre os lançamentos <strong>ativos</strong> e o <strong>Histórico_Arquivo</strong> ao mesmo tempo.</ScreenInfo>
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <div style={{ flex: 1 }}>
          <CON_DS.Input leadingIcon={<Icon name="search" size={16} />} placeholder="Nº NF, NFD, fornecedor ou produto…" value={q}
            onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && run()} />
        </div>
        <CON_DS.Button variant="primary" leadingIcon={<Icon name="search" size={15} />} onClick={run} disabled={loading}>{loading ? 'Buscando…' : 'Buscar'}</CON_DS.Button>
      </div>

      <CON_DS.Card pad={false} header={done ? <><span>{rows.length} resultado(s)</span><span style={{ font: 'var(--fw-medium) 11px/1 var(--font-sans)', color: 'var(--text-faint)' }}>ativos + histórico</span></> : 'Resultados'}>
        {!done ? <EmptyState icon="search" title="Nenhuma busca ainda">Digite um termo acima e pressione Buscar para localizar devoluções ativas e arquivadas.</EmptyState> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Origem', 'NF', 'Fornecedor', 'Descrição', 'Status', 'Data', 'Valor R$', 'Arquivado'].map((h, i) => <th key={h} style={{ ...thBase, textAlign: i === 6 ? 'right' : 'left' }}>{h}</th>)}</tr></thead>
            <tbody>{rows.map((r, i) => (
              <tr key={i}>
                <td style={cellBase}><span style={{ font: 'var(--fw-semibold) 10px/1 var(--font-sans)', padding: '3px 7px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '.03em', ...(r.origem === 'ativo' ? { background: 'var(--blue-50)', color: 'var(--blue-700)' } : { background: 'var(--slate-100)', color: 'var(--slate-500)' }) }}>{r.origem === 'ativo' ? 'Ativo' : 'Histórico'}</span></td>
                <td style={cellMono}>{r.nf}</td>
                <td style={cellBase}>{r.forn}</td>
                <td style={{ ...cellBase, color: 'var(--text-body)' }}>{r.desc}</td>
                <td style={{ ...cellBase, paddingTop: 7, paddingBottom: 7 }}><CON_DS.StatusBadge status={r.status} size="sm" /></td>
                <td style={cellMono}>{r.data}</td>
                <td style={{ ...cellMono, textAlign: 'right' }}>{r.valor}</td>
                <td style={{ ...cellBase, color: 'var(--text-faint)', fontSize: 11 }}>{r.arq || '—'}</td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </CON_DS.Card>
    </div>
  );
}

/* ═══════════════ E-MAIL DE DEVOLUÇÃO ═══════════════ */
const EMAILS_BASE = ['devolucoes@transben.com.br', 'fiscal@transben.com.br'];

function Email() {
  const [nfds, setNfds] = React.useState('');
  const [comunicado, setComunicado] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const send = () => { setSending(true); setTimeout(() => { setSending(false); setSent(true); }, 1000); };

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <CON_DS.Card
        header={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="mail" size={16} style={{ color: 'var(--brand-blue)' }} /> Enviar e-mail de devolução</span>}
        footer={<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <CON_DS.Button variant="secondary">Cancelar</CON_DS.Button>
          <CON_DS.Button variant="accent" disabled={sending} leadingIcon={<Icon name={sending ? 'history' : 'mail'} size={15} />} onClick={send}>{sending ? 'Enviando…' : 'Enviar e-mail'}</CON_DS.Button>
        </div>}>
        {sent && <CON_DS.Alert tone="success" title="E-mail enviado" style={{ marginBottom: 16 }}>Comunicado de devolução enviado aos destinatários.</CON_DS.Alert>}

        <Secao icon="clipboard-list">NFDs</Secao>
        <CON_DS.Field label="Números das NFDs" hint="Uma por linha, ou separadas por vírgula">
          <textarea rows={3} value={nfds} onChange={(e) => setNfds(e.target.value)} placeholder={'Ex:\nNFD001, NFD002'} style={taStyle} />
        </CON_DS.Field>

        <Secao icon="mail">Destinatários</Secao>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {EMAILS_BASE.map((e) => (
            <span key={e} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'var(--navy-50)', color: 'var(--brand-blue)', borderRadius: 999, font: 'var(--fw-medium) 11.5px/1 var(--font-mono)' }}>
              <Icon name="check" size={12} />{e}
            </span>
          ))}
          <span style={{ font: 'var(--fw-medium) 11px/1.8 var(--font-sans)', color: 'var(--text-faint)' }}>padrão · sempre incluídos</span>
        </div>
        <CON_DS.Field label="E-mails adicionais" hint="opcional"><CON_DS.Input placeholder="ex@email.com; outro@email.com" /></CON_DS.Field>

        <Secao icon="paperclip">Comunicado de retorno</Secao>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', background: 'var(--slate-50)' }}>
          <input type="checkbox" checked={comunicado} onChange={(e) => setComunicado(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--brand-blue)' }} />
          <span style={{ font: 'var(--fw-medium) 12.5px/1.4 var(--font-sans)', color: 'var(--text-body)' }}>Incluir comunicado de retorno como anexo</span>
        </label>
        {comunicado && (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-md)', padding: '20px 16px', background: 'var(--white)', color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
            <Icon name="paperclip" size={20} style={{ color: 'var(--text-faint)' }} />
            <span style={{ font: 'var(--fw-medium) 12.5px/1.4 var(--font-sans)', color: 'var(--text-body)' }}>Clique ou arraste o arquivo do comunicado</span>
            <span style={{ font: 'var(--fw-regular) 11px/1.3 var(--font-sans)' }}>PDF, JPG ou PNG — máx. 8 MB</span>
          </label>
        )}

        <Secao icon="pencil">Complemento</Secao>
        <CON_DS.Field label="Assunto do e-mail" hint="Gerado automaticamente, pode editar" style={{ marginBottom: 12 }}>
          <CON_DS.Input defaultValue="Devolução de mercadoria — NFD pendente · Transben" />
        </CON_DS.Field>
        <CON_DS.Field label="Observações" hint="opcional">
          <textarea rows={2} placeholder="Observações adicionais que aparecerão no e-mail…" style={taStyle} />
        </CON_DS.Field>
      </CON_DS.Card>
    </div>
  );
}

/* ═══════════════ RELATÓRIOS ═══════════════ */
const REL_TIPOS = [
  { id: 'mensal', icon: 'bar-chart-3', title: 'Relatório Mensal', desc: 'Consolidado do mês — KPIs, resumo por fornecedor e listagem detalhada' },
  { id: 'semanal', icon: 'history', title: 'Relatório Semanal', desc: 'Dados dos últimos 7 dias ou de uma semana específica' },
  { id: 'diario', icon: 'clipboard-list', title: 'Relatório Diário', desc: 'Lançamentos de um dia específico' },
  { id: 'fornecedor', icon: 'package', title: 'Por Fornecedor', desc: 'Lançamentos de um fornecedor específico em um período' },
  { id: 'pendentes', icon: 'bell-ring', title: 'Pendências', desc: 'Snapshot de todos os itens Pendentes, do mais antigo ao mais recente' },
];
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function Relatorios() {
  const [tipo, setTipo] = React.useState(null);
  const [gerando, setGerando] = React.useState(false);
  const [pronto, setPronto] = React.useState(false);
  const gerar = () => { setGerando(true); setPronto(false); setTimeout(() => { setGerando(false); setPronto(true); }, 1200); };

  if (!tipo) {
    return (
      <div style={{ padding: 24, maxWidth: 820, margin: '0 auto' }}>
        <ScreenInfo>Gere relatórios em <strong>PDF</strong> salvos no Drive. Selecione o tipo desejado.</ScreenInfo>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {REL_TIPOS.map((t) => (
            <button key={t.id} onClick={() => { setTipo(t); setPronto(false); }} style={selCard}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--brand-blue)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}>
              <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy-50)', color: 'var(--brand-blue)' }}><Icon name={t.icon} size={20} /></span>
              <div><strong style={{ display: 'block', font: 'var(--fw-semibold) 13.5px/1.3 var(--font-sans)', color: 'var(--text-strong)' }}>{t.title}</strong>
                <span style={{ display: 'block', font: 'var(--fw-regular) 11.5px/1.45 var(--font-sans)', color: 'var(--text-muted)', marginTop: 3 }}>{t.desc}</span></div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <CON_DS.Button variant="ghost" size="sm" leadingIcon={<Icon name="arrow-left-right" size={14} />} onClick={() => setTipo(null)} style={{ marginBottom: 14 }}>Voltar</CON_DS.Button>
      <CON_DS.Card header={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name={tipo.icon} size={16} style={{ color: 'var(--brand-blue)' }} /> {tipo.title} <span style={{ font: 'var(--fw-bold) 9px/1 var(--font-sans)', background: 'var(--brand-red-50)', color: 'var(--brand-red)', padding: '3px 6px', borderRadius: 4, letterSpacing: '.05em' }}>PDF</span></span>}
        footer={<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <CON_DS.Button variant="secondary" onClick={() => setTipo(null)}>Cancelar</CON_DS.Button>
          <CON_DS.Button variant="primary" disabled={gerando} leadingIcon={<Icon name={gerando ? 'history' : 'bar-chart-3'} size={15} />} onClick={gerar}>{gerando ? 'Gerando…' : 'Gerar relatório'}</CON_DS.Button>
        </div>}>
        {pronto && <CON_DS.Alert tone="success" title="Relatório gerado" style={{ marginBottom: 16 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="download" size={14} /> PDF salvo no Drive — pronto para abrir.</span></CON_DS.Alert>}
        <p style={{ font: 'var(--fw-regular) 12.5px/1.6 var(--font-sans)', color: 'var(--text-body)', marginBottom: 16 }}>Inclui KPIs do período, resumo por fornecedor e a listagem detalhada de todos os lançamentos.</p>
        {tipo.id === 'mensal' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 12, marginBottom: 16 }}>
            <CON_DS.Field label="Mês"><CON_DS.Select options={MESES} defaultValue="Junho" /></CON_DS.Field>
            <CON_DS.Field label="Ano"><CON_DS.Input mono type="number" defaultValue="2026" /></CON_DS.Field>
          </div>
        )}
        {tipo.id === 'fornecedor' && (
          <CON_DS.Field label="Fornecedor" style={{ marginBottom: 16 }}><CON_DS.Select placeholder="Selecione…" options={['Britânia', 'Unilever', 'Fornecedores Variados']} /></CON_DS.Field>
        )}
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', padding: '11px 12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', background: 'var(--slate-50)' }}>
          <input type="checkbox" style={{ width: 16, height: 16, marginTop: 1, accentColor: 'var(--brand-blue)' }} />
          <span><strong style={{ display: 'block', font: 'var(--fw-semibold) 12.5px/1.3 var(--font-sans)', color: 'var(--text-strong)' }}>Enviar por e-mail após gerar</strong>
            <span style={{ font: 'var(--fw-regular) 11.5px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}>O PDF será anexado e enviado aos destinatários configurados.</span></span>
        </label>
      </CON_DS.Card>
    </div>
  );
}

const taStyle = { width: '100%', padding: '10px 12px', font: 'var(--fw-regular) 13px/1.5 var(--font-sans)', color: 'var(--text-strong)', background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' };
const selCard = { display: 'flex', alignItems: 'flex-start', gap: 13, textAlign: 'left', width: '100%', background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '15px 16px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow .15s, border-color .15s' };

Object.assign(window, { Busca, Email, Relatorios });
