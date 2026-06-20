/* Transben Devoluções UI kit — shared screen helpers (exposed on window) */
const { Card: HCard } = window.TransbenDevoluEsDesignSystem_026074;

/* Uppercase section divider used inside forms */
function Secao({ icon, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 7, margin: '18px 0 12px',
      font: 'var(--fw-bold) 10px/1 var(--font-sans)', textTransform: 'uppercase',
      letterSpacing: '.08em', color: 'var(--brand-blue)',
    }}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </div>
  );
}

/* Intro/help banner at the top of a screen */
function ScreenInfo({ children, tone = 'info' }) {
  const map = {
    info: { bg: 'var(--blue-50)', bd: 'var(--blue-100)', fg: 'var(--blue-700)' },
    neutral: { bg: 'var(--slate-50)', bd: 'var(--border-subtle)', fg: 'var(--text-body)' },
  }[tone];
  return (
    <div style={{
      background: map.bg, border: `1px solid ${map.bd}`, borderRadius: 'var(--radius-md)',
      padding: '12px 14px', font: 'var(--fw-regular) 12.5px/1.6 var(--font-sans)',
      color: map.fg, marginBottom: 18,
    }}>{children}</div>
  );
}

/* Centered empty state */
function EmptyState({ icon = 'search', title, children }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
      <div style={{ display: 'inline-flex', padding: 14, borderRadius: 999, background: 'var(--navy-50)', color: 'var(--brand-blue)', marginBottom: 14 }}>
        <Icon name={icon} size={24} />
      </div>
      {title && <div style={{ font: 'var(--fw-semibold) 14px/1.3 var(--font-sans)', color: 'var(--text-strong)', marginBottom: 5 }}>{title}</div>}
      <p style={{ font: 'var(--fw-regular) 12.5px/1.6 var(--font-sans)', maxWidth: 380, margin: '0 auto' }}>{children}</p>
    </div>
  );
}

/* Shared table cell styles */
const cellBase = { padding: '11px 14px', font: 'var(--fw-medium) 13px/1.3 var(--font-sans)', color: 'var(--text-strong)', borderBottom: '1px solid var(--slate-100)', whiteSpace: 'nowrap' };
const cellMono = { ...cellBase, fontFamily: 'var(--font-mono)', fontFeatureSettings: '"tnum" 1' };
const thBase = { textAlign: 'left', padding: '11px 14px', font: 'var(--fw-semibold) 10px/1 var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--slate-50)', whiteSpace: 'nowrap' };

Object.assign(window, { Secao, ScreenInfo, EmptyState, cellBase, cellMono, thBase });
