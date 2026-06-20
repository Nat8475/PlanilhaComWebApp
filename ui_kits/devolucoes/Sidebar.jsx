/* Transben Devoluções UI kit — Sidebar (navy, nav sections from the real app) */

const NAV = [
  { section: 'Lançamentos', items: [
    { id: 'Lancamento', label: 'Lançar / Excluir', icon: 'plus' },
    { id: 'Notas', label: 'Notas Lançadas', icon: 'clipboard-list' },
    { id: 'Busca', label: 'Buscar NF / Fornecedor', icon: 'search' },
    { id: 'Email', label: 'E-mail de Devolução', icon: 'mail' },
  ]},
  { section: 'Operações', items: [
    { id: 'Frete', label: 'Programar Devolução', icon: 'truck' },
    { id: 'Transferencias', label: 'Transferências', icon: 'arrow-left-right', badge: true },
    { id: 'BaixaDevolucao', label: 'Baixa p/ Devolução', icon: 'file-check' },
    { id: 'BaixaVenda', label: 'Baixa p/ Venda', icon: 'shopping-cart' },
    { id: 'Reabertura', label: 'Reabrir Devoluções', icon: 'unlock' },
  ]},
  { section: 'Relatórios', items: [
    { id: 'Relatorios', label: 'Relatórios (PDF)', icon: 'bar-chart-3' },
  ]},
  { section: 'Sistema', items: [
    { id: 'Index', label: 'Menu Principal', icon: 'home' },
    { id: 'Backup', label: 'Backup / Restauração', icon: 'database' },
    { id: 'Auditoria', label: 'Auditoria e Histórico', icon: 'history' },
    { id: 'Configuracoes', label: 'Configurações', icon: 'settings' },
  ]},
];

function Sidebar({ current, onNavigate, collapsed, onToggle, vencidos = 0 }) {
  const w = collapsed ? 64 : 240;
  return (
    <aside style={{
      width: w, flexShrink: 0, height: '100%',
      background: 'var(--navy-800)', color: '#fff',
      display: 'flex', flexDirection: 'column',
      boxShadow: 'var(--shadow-sidebar)', transition: 'width .2s var(--ease-out)',
      overflow: 'hidden',
    }}>
      {/* Brand row */}
      <div style={{ display: 'flex', alignItems: 'center', minHeight: 56, borderBottom: '1px solid rgba(255,255,255,.12)', flexShrink: 0 }}>
        <button onClick={onToggle} title="Recolher / Expandir" style={{
          background: 'none', border: 'none', borderRight: '1px solid rgba(255,255,255,.1)',
          color: '#fff', cursor: 'pointer', height: 56, width: 56, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="menu" size={20} /></button>
        {!collapsed && (
          <div style={{ padding: '0 14px', whiteSpace: 'nowrap', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 9 }}>
            <Icon name="package" size={19} style={{ color: '#9CC1FF' }} />
            <div>
              <div style={{ font: 'var(--fw-bold) 14px/1.1 var(--font-sans)' }}>Devoluções</div>
              <div style={{ font: 'var(--fw-medium) 10px/1.3 var(--font-sans)', color: 'rgba(255,255,255,.5)' }}>Transben · v6.2</div>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ padding: '6px 0', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {NAV.map((grp) => (
          <div key={grp.section}>
            {!collapsed && <div style={{
              padding: '11px 16px 4px', font: 'var(--fw-bold) 9px/1 var(--font-sans)',
              textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.4)', whiteSpace: 'nowrap',
            }}>{grp.section}</div>}
            {grp.items.map((it) => {
              const active = current === it.id;
              return (
                <button key={it.id} onClick={() => onNavigate(it.id)} title={collapsed ? it.label : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 11, width: '100%',
                    padding: collapsed ? '9px 0' : '9px 16px', justifyContent: collapsed ? 'center' : 'flex-start',
                    background: active ? 'rgba(255,255,255,.12)' : 'transparent',
                    border: 'none', borderLeft: `3px solid ${active ? 'var(--brand-red)' : 'transparent'}`,
                    color: active ? '#fff' : 'rgba(255,255,255,.78)',
                    font: `${active ? 'var(--fw-semibold)' : 'var(--fw-medium)'} 12.5px/1.2 var(--font-sans)`,
                    cursor: 'pointer', whiteSpace: 'nowrap', textAlign: 'left',
                    transition: 'background .12s var(--ease-out)',
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,.07)'; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                  <span style={{ position: 'relative', display: 'inline-flex' }}>
                    <Icon name={it.icon} size={16} />
                    {it.badge && vencidos > 0 && (
                      <span style={{
                        position: 'absolute', top: -6, right: -7, minWidth: 15, height: 15, padding: '0 4px',
                        background: 'var(--brand-red)', color: '#fff', borderRadius: 999,
                        font: 'var(--fw-bold) 9px/15px var(--font-sans)', textAlign: 'center',
                      }}>{vencidos}</span>
                    )}
                  </span>
                  {!collapsed && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,.1)', font: 'var(--fw-medium) 10px/1.4 var(--font-sans)', color: 'rgba(255,255,255,.35)', flexShrink: 0 }}>
          Sistema Transben · Controle de Devoluções
        </div>
      )}
    </aside>
  );
}

window.Sidebar = Sidebar;
