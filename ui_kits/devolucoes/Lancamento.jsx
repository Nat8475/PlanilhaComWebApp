/* Transben Devoluções UI kit — Lançamento (seleção + form individual) */
const { Card: LCard, Button: LButton, Field, Input, Select, Alert: LAlert, StatusBadge: LBadge } = window.TransbenDevoluEsDesignSystem_026074;

const MODOS = [
  { id: 'unico', icon: 'plus', title: 'Lançamento Individual', desc: 'Registrar uma única NF de devolução' },
  { id: 'lote', icon: 'clipboard-list', title: 'Lançamento em Lote', desc: 'Várias NFs de uma vez no mesmo fornecedor' },
  { id: 'excluir', icon: 'pencil', title: 'Excluir Lançamento', desc: 'Remover uma NF Pendente com registro no histórico' },
];

function ModoCard({ modo, onClick }) {
  const danger = modo.id === 'excluir';
  const color = danger ? 'var(--brand-red)' : 'var(--brand-blue)';
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', width: '100%',
      background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
      padding: '16px 18px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow .15s, border-color .15s',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = color; }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}>
      <span style={{ width: 42, height: 42, borderRadius: 'var(--radius-sm)', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: color + '14', color }}>
        <Icon name={modo.icon} size={20} />
      </span>
      <div>
        <strong style={{ display: 'block', font: 'var(--fw-semibold) 14px/1.3 var(--font-sans)', color: 'var(--text-strong)' }}>{modo.title}</strong>
        <span style={{ display: 'block', font: 'var(--fw-regular) 12px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>{modo.desc}</span>
      </div>
      <span style={{ marginLeft: 'auto', color: 'var(--text-faint)' }}><Icon name="arrow-left-right" size={16} /></span>
    </button>
  );
}

function LancForm({ onBack }) {
  const [aba, setAba] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const save = () => { setSaving(true); setTimeout(() => { setSaving(false); setSaved(true); }, 1000); };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <LButton variant="ghost" size="sm" leadingIcon={<Icon name="arrow-left-right" size={14} />} onClick={onBack} style={{ marginBottom: 14 }}>Voltar</LButton>
      <LCard header={<><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="plus" size={16} style={{ color: 'var(--brand-blue)' }} /> Lançamento Individual</span></>}
        footer={<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <LButton variant="secondary" onClick={onBack}>Cancelar</LButton>
          <LButton variant="accent" disabled={saving} leadingIcon={<Icon name={saving ? 'history' : 'check'} size={15} />} onClick={save}>{saving ? 'Salvando…' : 'Salvar'}</LButton>
        </div>}>
        {saved && <LAlert tone="success" title="Devolução lançada" style={{ marginBottom: 16 }}>NF registrada com status Pendente. Dias armazenado começam a contar hoje.</LAlert>}

        <Field label="Fornecedor / Aba" required style={{ marginBottom: 14 }}>
          <Select placeholder="— Selecione —" value={aba} onChange={(e) => setAba(e.target.value)}
            options={['Britânia', 'Unilever', 'Fornecedores Variados']} />
        </Field>
        {aba === 'Fornecedores Variados' && (
          <Field label="Nome do Fornecedor" required style={{ marginBottom: 14 }}>
            <Input placeholder="Ex: Ambev, P&G…" />
          </Field>
        )}

        <Secao>Dados da nota</Secao>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
          <Field label="NFD" hint="opcional"><Input mono placeholder="Nº NFD" /></Field>
          <Field label="Tipo"><Select placeholder="—" options={['Falta', 'Avaria', 'Rejeição']} /></Field>
          <Field label="Nº NF" required><Input mono placeholder="NF original" /></Field>
        </div>
        <Field label="Motivo" style={{ marginBottom: 14 }}><Input placeholder="Ex: medidas fora da tolerância…" /></Field>
        <Field label="Descrição do Produto" required style={{ marginBottom: 14 }}><Input placeholder="Ex: Shampoo 400ml caixa c/12" /></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
          <Field label="Quantidade" required><Input mono type="number" placeholder="0" /></Field>
          <Field label="Valor Unitário (R$)" required><Input mono placeholder="0,00" /></Field>
        </div>

        <Secao>Anexo da NF <span style={{ color: 'var(--text-faint)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span></Secao>
        <label style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer',
          border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-md)', padding: '22px 16px',
          background: 'var(--slate-50)', color: 'var(--text-muted)', textAlign: 'center',
        }}>
          <Icon name="paperclip" size={20} style={{ color: 'var(--text-faint)' }} />
          <span style={{ font: 'var(--fw-medium) 12.5px/1.4 var(--font-sans)', color: 'var(--text-body)' }}>Clique ou arraste a foto / PDF da NF aqui</span>
          <span style={{ font: 'var(--fw-regular) 11px/1.3 var(--font-sans)' }}>JPG, PNG ou PDF — máx. 5 MB</span>
        </label>
      </LCard>
    </div>
  );
}

function Secao({ children }) {
  return <div style={{ font: 'var(--fw-bold) 10px/1 var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--brand-blue)', margin: '4px 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>{children}</div>;
}

function Lancamento() {
  const [modo, setModo] = React.useState(null);
  if (modo === 'unico') return <div style={{ padding: 24 }}><LancForm onBack={() => setModo(null)} /></div>;

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <p style={{ font: 'var(--fw-regular) 13px/1.6 var(--font-sans)', color: 'var(--text-muted)', marginBottom: 16 }}>
        Selecione como deseja registrar a devolução.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {MODOS.map((m) => <ModoCard key={m.id} modo={m} onClick={() => m.id === 'unico' && setModo('unico')} />)}
      </div>
    </div>
  );
}

window.Lancamento = Lancamento;
