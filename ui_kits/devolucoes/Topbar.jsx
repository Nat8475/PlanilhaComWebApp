/* Transben Devoluções UI kit — Topbar (white, real logo) */
function Topbar({ title, subtitle, actions }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px',
      height: 60, background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)',
      flexShrink: 0, position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ font: 'var(--fw-bold) 17px/1.2 var(--font-sans)', color: 'var(--text-strong)', letterSpacing: 'var(--ls-tight)' }}>{title}</h1>
        {subtitle && <p style={{ font: 'var(--fw-medium) 12px/1.3 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</p>}
      </div>
      {actions}
      <img src="../../assets/logo-transben.svg" alt="Transben Transportes" style={{ height: 30 }} />
    </header>
  );
}
window.Topbar = Topbar;
