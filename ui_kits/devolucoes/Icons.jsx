/* Transben Devoluções UI kit — Lucide icon set (subset, stroke=currentColor).
   Paths copied from lucide.dev (ISC). Use <Icon name="package" size={18} />. */
const ICON_PATHS = {
  menu: ['M4 12h16', 'M4 6h16', 'M4 18h16'],
  plus: ['M5 12h14', 'M12 5v14'],
  search: ['m21 21-4.34-4.34', 'circle:11,11,8'],
  package: ['m7.5 4.27 9 5.15', 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  'clipboard-list': ['rect:8,2,8,4,1', 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  mail: ['rect:2,4,20,16,2', 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'circle:7,18,2', 'circle:17,18,2'],
  'file-check': ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z', 'M14 2v4a2 2 0 0 0 2 2h4', 'm9 15 2 2 4-4'],
  'shopping-cart': ['circle:8,21,1', 'circle:19,21,1', 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'],
  unlock: ['rect:3,11,18,11,2', 'M7 11V7a5 5 0 0 1 9.9-1'],
  'bar-chart-3': ['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
  home: ['m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  database: ['ellipse:12,5,9,3', 'M3 5v14a9 3 0 0 0 18 0V5', 'M3 12a9 3 0 0 0 18 0'],
  history: ['M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', 'M3 3v5h5', 'M12 7v5l4 2'],
  settings: ['circle:12,12,3', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  'bell-ring': ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  'arrow-left-right': ['m16 3 4 4-4 4', 'M20 7H4', 'm8 21-4-4 4-4', 'M4 17h16'],
  'chevron-down': ['m6 9 6 6 6-6'],
  'log-out': ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'm16 17 5-5-5-5', 'M21 12H9'],
  pencil: ['M21.17 6.83a2.83 2.83 0 0 0-4-4L4 16v4h4Z', 'm15 5 4 4'],
  filter: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  paperclip: ['m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48'],
  check: ['M20 6 9 17l-5-5'],
};

function Icon({ name, size = 18, stroke = 2, style }) {
  const parts = ICON_PATHS[name] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ display: 'block', flexShrink: 0, ...style }}>
      {parts.map((p, i) => {
        if (p.startsWith('circle:')) { const [cx, cy, r] = p.slice(7).split(','); return <circle key={i} cx={cx} cy={cy} r={r} />; }
        if (p.startsWith('rect:')) { const [x, y, w, h, rx] = p.slice(5).split(','); return <rect key={i} x={x} y={y} width={w} height={h} rx={rx} />; }
        if (p.startsWith('ellipse:')) { const [cx, cy, rx, ry] = p.slice(8).split(','); return <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />; }
        return <path key={i} d={p} />;
      })}
    </svg>
  );
}

window.Icon = Icon;
