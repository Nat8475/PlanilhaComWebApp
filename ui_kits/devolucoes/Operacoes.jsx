/* Transben Devoluções UI kit — Operações: Frete, Transferências, Baixas, Reabertura */
const OPS_DS = window.TransbenDevoluEsDesignSystem_026074;

/* ═══════════════ PROGRAMAR DEVOLUÇÃO (FRETE) ═══════════════ */
const FRETE_OPCOES = [
  { v: 'Tabela', d: 'Calculado pelo sistema de emissão de CTe / TMS — sem valor manual' },
  { v: 'Valor + ICMS', d: 'Informe o valor do frete já com ICMS incluso' },
  { v: 'Valor', d: 'Informe o valor do frete (sem ICMS)' },
  { v: 'Cortesia', d: 'Sem custo de frete (R$ 0,00)' },
];

function Frete() {
  const [achou, setAchou] = React.useState(false);
  const [tipo, setTipo] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const precisaValor = tipo === 'Valor + ICMS' || tipo === 'Valor';

  return (
    <div style={{ padding: 24, maxWidth: 640, margin: '0 auto' }}>
      <ScreenInfo>Busque a NF/NFD pendente e programe a <strong>devolução do frete</strong> — tipo, valor, agendamento e transportadora.</ScreenInfo>
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <div style={{ flex: 1 }}><OPS_DS.Input mono leadingIcon={<Icon name="search" size={16} />} placeholder="Nº NF ou NFD" onKeyDown={(e) => e.key === 'Enter' && setAchou(true)} /></div>
        <OPS_DS.Button variant="primary" leadingIcon={<Icon name="search" size={15} />} onClick={() => setAchou(true)}>Buscar</OPS_DS.Button>
      </div>

      {!achou ? (
        <OPS_DS.Card><EmptyState icon="truck" title="Nenhum item carregado">Busque uma NF pendente para programar a devolução.</EmptyState></OPS_DS.Card>
      ) : (
        <OPS_DS.Card footer={<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <OPS_DS.Button variant="secondary" onClick={() => setAchou(false)}>Fechar</OPS_DS.Button>
          <OPS_DS.Button variant="accent" disabled={!tipo} leadingIcon={<Icon name="check" size={15} />} onClick={() => setSaved(true)}>Salvar programação</OPS_DS.Button>
        </div>}>
          {saved && <OPS_DS.Alert tone="success" title="Programação salva" style={{ marginBottom: 16 }}>Item movido para <strong>Em Transferência</strong>.</OPS_DS.Alert>}
          {/* item detail */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: 4 }}>
            {[['NF / NFD', '8841 / 045.872'], ['Fornecedor', 'Britânia'], ['Descrição', 'Liquidificador 3L c/12'], ['Data de entrada', '12/06/2026'], ['Peso', '18,4 kg']].map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 13px', borderBottom: i < 4 ? '1px solid var(--slate-100)' : 'none', background: i % 2 ? 'var(--white)' : 'var(--slate-50)' }}>
                <span style={{ font: 'var(--fw-medium) 11.5px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{k}</span>
                <b style={{ font: 'var(--fw-semibold) 12.5px/1 var(--font-sans)', color: 'var(--text-strong)' }}>{v}</b>
              </div>
            ))}
          </div>

          <Secao icon="truck">Tipo de frete</Secao>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FRETE_OPCOES.map((o) => {
              const sel = tipo === o.v;
              return (
                <label key={o.v} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '11px 13px', cursor: 'pointer', border: `1.5px solid ${sel ? 'var(--brand-blue)' : 'var(--border-subtle)'}`, borderRadius: 'var(--radius-sm)', background: sel ? 'var(--navy-50)' : 'var(--white)', transition: 'var(--transition-control)' }}>
                  <input type="radio" name="frete" checked={sel} onChange={() => setTipo(o.v)} style={{ width: 16, height: 16, marginTop: 1, accentColor: 'var(--brand-blue)' }} />
                  <span><strong style={{ display: 'block', font: 'var(--fw-semibold) 13px/1.3 var(--font-sans)', color: 'var(--text-strong)' }}>{o.v}</strong>
                    <span style={{ font: 'var(--fw-regular) 11.5px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}>{o.d}</span></span>
                </label>
              );
            })}
          </div>

          {precisaValor && <div style={{ marginTop: 14 }}><OPS_DS.Field label="Valor do frete (R$)" required><OPS_DS.Input mono placeholder="0,00" /></OPS_DS.Field></div>}

          <Secao icon="truck">Agendamento</Secao>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <OPS_DS.Field label="Data de agendamento" hint="opcional"><OPS_DS.Input type="date" /></OPS_DS.Field>
            <OPS_DS.Field label="Transportadora" hint="opcional"><OPS_DS.Input placeholder="Ex: Jadlog, Mercúrio…" /></OPS_DS.Field>
          </div>
          <div style={{ marginTop: 12 }}><OPS_DS.Field label="Observações" hint="opcional"><OPS_DS.Input placeholder="Instruções para a transferência" /></OPS_DS.Field></div>
        </OPS_DS.Card>
      )}
    </div>
  );
}

/* ═══════════════ TRANSFERÊNCIAS ═══════════════ */
const TRANSF_DADOS = [
  { nf: '045.872', forn: 'Britânia', transp: 'Jadlog', origem: 'Britânia', frete: 'Tabela', agend: '24/06', dias: 8, status: 'transferencia' },
  { nf: '045.913', forn: 'Unilever', transp: 'Mercúrio', origem: 'Unilever', frete: 'Valor + ICMS', agend: '22/06', dias: 3, status: 'transferencia' },
  { nf: '045.640', forn: 'Variados', transp: 'Correios', origem: 'Variados', frete: 'Cortesia', agend: '19/06', dias: 12, status: 'atraso' },
];

function Transferencias() {
  const [sel, setSel] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const toggle = (nf) => setSel((s) => s.includes(nf) ? s.filter((x) => x !== nf) : [...s, nf]);
  const allSel = sel.length === TRANSF_DADOS.length;

  return (
    <div style={{ padding: 24, maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: 180 }}><OPS_DS.Select placeholder="Todas as transportadoras" options={['Jadlog', 'Mercúrio', 'Correios']} /></div>
        <div style={{ width: 160 }}><OPS_DS.Select placeholder="Todos os status" options={[{ value: 'transferencia', label: 'Em Transferência' }, { value: 'atraso', label: 'Atrasada' }]} /></div>
        <div style={{ flex: 1 }} />
        {sel.length > 0 && <>
          <span style={{ font: 'var(--fw-medium) 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{sel.length} selecionada(s)</span>
          <OPS_DS.Button variant="success" size="sm" leadingIcon={<Icon name="check" size={14} />} onClick={() => setModal('baixa')}>Confirmar baixa</OPS_DS.Button>
        </>}
      </div>

      <OPS_DS.Card pad={false} header={<><span>{TRANSF_DADOS.length} transferências ativas</span><span style={{ font: 'var(--fw-medium) 11px/1 var(--font-sans)', color: 'var(--text-faint)' }}>1 atrasada</span></>}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 880 }}>
            <thead><tr>
              <th style={{ ...thBase, width: 40 }}><input type="checkbox" checked={allSel} onChange={() => setSel(allSel ? [] : TRANSF_DADOS.map((r) => r.nf))} style={{ width: 15, height: 15, accentColor: 'var(--brand-blue)' }} /></th>
              {['NF / NFD', 'Fornecedor', 'Transportadora', 'Frete', 'Agendamento', 'Dias', 'Status', 'Ações'].map((h, i) => <th key={h} style={{ ...thBase, textAlign: i === 5 ? 'right' : 'left' }}>{h}</th>)}
            </tr></thead>
            <tbody>{TRANSF_DADOS.map((r) => (
              <tr key={r.nf} style={{ background: sel.includes(r.nf) ? 'var(--navy-50)' : 'transparent' }}>
                <td style={cellBase}><input type="checkbox" checked={sel.includes(r.nf)} onChange={() => toggle(r.nf)} style={{ width: 15, height: 15, accentColor: 'var(--brand-blue)' }} /></td>
                <td style={cellMono}>{r.nf}</td>
                <td style={cellBase}>{r.forn}</td>
                <td style={cellBase}>{r.transp}</td>
                <td style={cellBase}><span style={{ font: 'var(--fw-medium) 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{r.frete}</span></td>
                <td style={cellMono}>{r.agend}</td>
                <td style={{ ...cellMono, textAlign: 'right' }}>{r.dias}</td>
                <td style={{ ...cellBase, paddingTop: 7, paddingBottom: 7 }}><OPS_DS.StatusBadge status={r.status} size="sm" label={r.status === 'atraso' ? r.dias + ' dias' : 'Em transf.'} /></td>
                <td style={{ ...cellBase, paddingTop: 6, paddingBottom: 6 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <OPS_DS.IconButton label="Confirmar baixa" variant="ghost" size="sm" onClick={() => setModal('baixa')}><Icon name="file-check" size={15} /></OPS_DS.IconButton>
                    <OPS_DS.IconButton label="Reagendar" variant="ghost" size="sm" onClick={() => setModal('reag')}><Icon name="history" size={15} /></OPS_DS.IconButton>
                    <OPS_DS.IconButton label="Cancelar" variant="ghost" size="sm" onClick={() => setModal('cancel')}><Icon name="arrow-left-right" size={15} /></OPS_DS.IconButton>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </OPS_DS.Card>

      {modal && <TransfModal kind={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

function TransfModal({ kind, onClose }) {
  const cfg = {
    baixa: { title: 'Confirmar baixa', icon: 'file-check', color: 'var(--dev-fg)', btn: 'success', label: 'Confirmar baixa', desc: 'A transferência será baixada e o item movido para Devolvido no histórico.' },
    cancel: { title: 'Cancelar transferência', icon: 'arrow-left-right', color: 'var(--brand-red)', btn: 'danger', label: 'Confirmar cancelamento', desc: 'O item volta para a aba de origem como Pendente. O registro fica como Cancelada para auditoria.' },
    reag: { title: 'Reagendar transferência', icon: 'history', color: 'var(--transf-fg)', btn: 'primary', label: 'Confirmar', desc: 'Informe a nova data de agendamento da retirada.' },
  }[kind];
  const [done, setDone] = React.useState(false);

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(11,18,32,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}>
      <div style={{ width: 420, maxWidth: '100%', background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '15px 18px', borderBottom: '1px solid var(--border-subtle)', color: cfg.color, font: 'var(--fw-bold) 14px/1 var(--font-sans)' }}>
          <Icon name={cfg.icon} size={17} />{cfg.title}
        </div>
        <div style={{ padding: 18 }}>
          {done ? <OPS_DS.Alert tone="success" title="Concluído">Operação registrada com sucesso.</OPS_DS.Alert> : <>
            <p style={{ font: 'var(--fw-regular) 12.5px/1.6 var(--font-sans)', color: 'var(--text-body)', marginBottom: 14 }}>{cfg.desc}</p>
            {kind === 'reag' && <OPS_DS.Field label="Nova data de agendamento" required style={{ marginBottom: 12 }}><OPS_DS.Input type="date" /></OPS_DS.Field>}
            <OPS_DS.Field label={kind === 'cancel' ? 'Motivo do cancelamento' : 'Observação'} required={kind === 'cancel'}>
              <textarea rows={2} placeholder={kind === 'cancel' ? 'Informe o motivo obrigatório…' : 'Opcional…'} style={opsTa} />
            </OPS_DS.Field>
          </>}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', padding: '12px 18px', borderTop: '1px solid var(--border-subtle)', background: 'var(--slate-50)' }}>
          <OPS_DS.Button variant="secondary" size="sm" onClick={onClose}>{done ? 'Fechar' : 'Cancelar'}</OPS_DS.Button>
          {!done && <OPS_DS.Button variant={cfg.btn} size="sm" onClick={() => setDone(true)}>{cfg.label}</OPS_DS.Button>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ BAIXAS (Venda / Devolução) + REABERTURA ═══════════════ */
function BaixaLote({ tipo }) {
  const isVenda = tipo === 'venda';
  const [done, setDone] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const go = () => { setBusy(true); setTimeout(() => { setBusy(false); setDone(true); }, 1000); };
  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <OPS_DS.Card
        header={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name={isVenda ? 'shopping-cart' : 'file-check'} size={16} style={{ color: isVenda ? 'var(--venda-fg)' : 'var(--dev-fg)' }} /> {isVenda ? 'Baixa para Venda' : 'Baixa para Devolução'}</span>}
        footer={<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <OPS_DS.Button variant="secondary">Cancelar</OPS_DS.Button>
          <OPS_DS.Button variant={isVenda ? 'primary' : 'success'} disabled={busy} leadingIcon={<Icon name={busy ? 'history' : 'check'} size={15} />} onClick={go}>{busy ? 'Processando…' : (isVenda ? 'Dar baixa p/ venda' : 'Dar baixa p/ devolução')}</OPS_DS.Button>
        </div>}>
        {done && <OPS_DS.Alert tone="success" title="Baixa realizada" style={{ marginBottom: 16 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>Status alterado para <strong>{isVenda ? 'Venda' : 'Devolvido'}</strong>. <Icon name="download" size={13} /> Relatório PDF gerado.</span></OPS_DS.Alert>}
        <ScreenInfo>Informe as NFs <strong>Pendentes</strong> que serão baixadas para <strong>{isVenda ? 'Venda' : 'Devolução'}</strong>. Separe por vírgula ou uma por linha. Um relatório PDF é gerado ao final.</ScreenInfo>
        <OPS_DS.Field label="Números das NFs" required>
          <textarea rows={5} placeholder={'Ex:\n123456\n789012\nou: 123456, 789012'} style={opsTa} />
        </OPS_DS.Field>
      </OPS_DS.Card>
    </div>
  );
}
function BaixaVenda() { return <BaixaLote tipo="venda" />; }
function BaixaDevolucao() { return <BaixaLote tipo="devolucao" />; }

const REAB_DADOS = [
  { nf: '044.512', aba: 'Britânia', desc: 'Batedeira 5L', status: 'devolvido' },
  { nf: '043.980', aba: 'Variados', desc: 'Caixa térmica 34L', status: 'venda' },
];

function Reabertura() {
  const [preview, setPreview] = React.useState(false);
  const [done, setDone] = React.useState(false);
  return (
    <div style={{ padding: 24, maxWidth: 640, margin: '0 auto' }}>
      <OPS_DS.Card
        header={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="unlock" size={16} style={{ color: 'var(--brand-blue)' }} /> Reabrir devoluções concluídas</span>}
        footer={preview && !done ? <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <OPS_DS.Button variant="secondary" onClick={() => setPreview(false)}>Voltar</OPS_DS.Button>
          <OPS_DS.Button variant="primary" leadingIcon={<Icon name="unlock" size={15} />} onClick={() => setDone(true)}>Confirmar reabertura</OPS_DS.Button>
        </div> : null}>
        {done && <OPS_DS.Alert tone="success" title="Reabertas" style={{ marginBottom: 16 }}>2 NFs voltaram para <strong>Pendente</strong> na aba de origem.</OPS_DS.Alert>}
        <ScreenInfo>Informe NFs já <strong>Devolvido</strong> ou <strong>Venda</strong>. Elas retornam ao status <strong>Pendente</strong> na aba de origem.</ScreenInfo>
        {!preview ? (
          <OPS_DS.Field label="Números das NFs" required>
            <textarea rows={4} placeholder={'Ex:\n044512, 043980'} style={opsTa} />
            <div style={{ marginTop: 12 }}><OPS_DS.Button variant="primary" leadingIcon={<Icon name="search" size={15} />} onClick={() => setPreview(true)}>Buscar NFs</OPS_DS.Button></div>
          </OPS_DS.Field>
        ) : (
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>{['NF', 'Aba', 'Descrição', 'Status'].map((h) => <th key={h} style={thBase}>{h}</th>)}</tr></thead>
              <tbody>{REAB_DADOS.map((r) => (
                <tr key={r.nf}><td style={cellMono}>{r.nf}</td><td style={cellBase}>{r.aba}</td><td style={{ ...cellBase, color: 'var(--text-body)' }}>{r.desc}</td><td style={{ ...cellBase, paddingTop: 7, paddingBottom: 7 }}><OPS_DS.StatusBadge status={r.status} size="sm" /></td></tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </OPS_DS.Card>
    </div>
  );
}

const opsTa = { width: '100%', padding: '10px 12px', font: 'var(--fw-medium) 13px/1.5 var(--font-mono)', color: 'var(--text-strong)', background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' };

Object.assign(window, { Frete, Transferencias, BaixaVenda, BaixaDevolucao, Reabertura });
