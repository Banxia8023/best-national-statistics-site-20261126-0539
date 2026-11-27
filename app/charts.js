// Nippon by Numbers — chart builders.
//
// Every chart is plain inline SVG drawn from the numbers in data.js. No
// library, no network, no canvas: the same markup renders on desktop and on
// a phone, and it prints cleanly.

const INK = '#1d2a4a';
const MUTED = '#5d6b85';
const GRID = '#dfe4ee';
const RED = '#b3352b';
const BLUE = '#2f5d8a';
const TEAL = '#2e7d6b';
const GOLD = '#c08a2d';
const LIGHT_BLUE = '#7fa8c9';
const LIGHT_RED = '#d98a7f';
const LIGHT_TEAL = '#8fc3b3';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceMax(v) {
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
}

function fmt(v, digits = 1) {
  return Number(v).toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

/** A line chart with labelled points. points: [{x, y}], xLabel formats the x value. */
export function lineChart(points, opts) {
  const w = opts.width ?? 760;
  const h = opts.height ?? 300;
  const padL = 56;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = opts.yMin ?? 0;
  const yMax = niceMax(Math.max(...ys) * 1.05);
  const X = (x) => padL + ((x - xMin) / (xMax - xMin || 1)) * (w - padL - padR);
  const Y = (y) => padT + (1 - (y - yMin) / (yMax - yMin)) * (h - padT - padB);
  const ticks = 4;
  let grid = '';
  for (let i = 0; i <= ticks; i++) {
    const v = yMin + ((yMax - yMin) * i) / ticks;
    const y = Y(v);
    grid += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="${MUTED}">${esc(opts.yFormat ? opts.yFormat(v) : fmt(v))}</text>`;
  }
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)}`).join(' ');
  const area = `${path} L${X(points[points.length - 1].x).toFixed(1)},${Y(yMin).toFixed(1)} L${X(points[0].x).toFixed(1)},${Y(yMin).toFixed(1)} Z`;
  const dots = points
    .filter((_, i) => i % (opts.labelEvery ?? 4) === 0 || i === points.length - 1)
    .map((p) => `<circle cx="${X(p.x).toFixed(1)}" cy="${Y(p.y).toFixed(1)}" r="3.5" fill="${opts.color ?? RED}"/>` +
      `<text x="${X(p.x).toFixed(1)}" y="${(Y(p.y) - 9).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${esc(opts.pointLabel ? opts.pointLabel(p) : fmt(p.y))}</text>`)
    .join('');
  const xLabels = points
    .filter((_, i) => i % (opts.labelEvery ?? 4) === 0 || i === points.length - 1)
    .map((p) => `<text x="${X(p.x).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(opts.xFormat ? opts.xFormat(p.x) : p.x)}</text>`)
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label ?? 'Line chart')}" class="chart">
${grid}
<path d="${area}" fill="${opts.color ?? RED}" opacity="0.08"/>
<path d="${path}" fill="none" stroke="${opts.color ?? RED}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
${dots}
${xLabels}
</svg>`;
}

/** Horizontal bars with a value at the end of each bar. rows: [{label, value, display}]. */
export function hbars(rows, opts) {
  const w = opts.width ?? 760;
  const rowH = opts.rowHeight ?? 34;
  const h = rows.length * rowH + 8;
  const max = Math.max(...rows.map((r) => r.value));
  const labelW = opts.labelWidth ?? 150;
  const valueW = 72;
  const barX = labelW + 8;
  const barW = w - barX - valueW - 8;
  const color = opts.color ?? BLUE;
  const body = rows.map((r, i) => {
    const y = 8 + i * rowH;
    const bw = Math.max(2, (r.value / max) * barW);
    return `<text x="${labelW}" y="${y + 19}" text-anchor="end" font-size="13" fill="${INK}">${esc(r.label)}</text>` +
      `<rect x="${barX}" y="${y + 6}" width="${bw.toFixed(1)}" height="18" rx="3" fill="${r.color ?? color}"/>` +
      `<text x="${barX + bw + 8}" y="${y + 20}" font-size="13" font-weight="600" fill="${INK}">${esc(r.display ?? fmt(r.value))}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label ?? 'Bar chart')}" class="chart">${body}</svg>`;
}

/** A donut chart with a centre label. slices: [{label, value, color}]. */
export function donut(slices, opts) {
  const size = opts.size ?? 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const total = slices.reduce((s, x) => s + x.value, 0);
  let a0 = -Math.PI / 2;
  let paths = '';
  for (const s of slices) {
    const a1 = a0 + (s.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    paths += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${s.color}"/>`;
    a0 = a1;
  }
  const legend = slices.map((s) => `<span class="legend-item"><i style="background:${s.color}"></i>${esc(s.label)} — <b>${fmt(s.value, 1)}%</b></span>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.label ?? 'Donut chart')}" class="chart donut">${paths}
<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="${INK}">${esc(opts.centre ?? '')}</text>
<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(opts.centreSub ?? '')}</text>
</svg><div class="legend">${legend}</div></div>`;
}

/** A population pyramid: men left, women right, one row per age group. */
export function pyramid(rows) {
  const w = 760;
  const rowH = 20;
  const h = rows.length * rowH + 36;
  const max = Math.max(...rows.flatMap((r) => [r.male, r.female]));
  const mid = w / 2;
  const half = w / 2 - 70;
  const gap = 26;
  const body = rows.map((r, i) => {
    const y = 26 + i * rowH;
    const mw = (r.male / max) * half;
    const fw = (r.female / max) * half;
    return `<text x="${mid}" y="${y + 12}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${esc(r.group)}</text>` +
      `<rect x="${(mid - gap - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="14" rx="2" fill="${BLUE}"/>` +
      `<rect x="${(mid + gap).toFixed(1)}" y="${y}" width="${fw.toFixed(1)}" height="14" rx="2" fill="${RED}"/>` +
      `<text x="${(mid - gap - 4 - mw).toFixed(1)}" y="${y + 12}" text-anchor="end" font-size="11" fill="${INK}">${fmt(r.male / 1000, 2)}m</text>` +
      `<text x="${(mid + gap + 4 + fw).toFixed(1)}" y="${y + 12}" font-size="11" fill="${INK}">${fmt(r.female / 1000, 2)}m</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Population pyramid of Japan, 2024" class="chart">
<text x="${mid - gap - half / 2}" y="14" text-anchor="middle" font-size="13" font-weight="600" fill="${BLUE}">Men</text>
<text x="${mid + gap + half / 2}" y="14" text-anchor="middle" font-size="13" font-weight="600" fill="${RED}">Women</text>
<text x="${mid}" y="14" text-anchor="middle" font-size="12" fill="${MUTED}">Age</text>
${body}</svg>`;
}

/** Grouped bars: two series side by side per category. */
export function groupedBars(cats, opts) {
  const w = opts.width ?? 760;
  const h = opts.height ?? 300;
  const padL = 40;
  const padR = 16;
  const padT = 26;
  const padB = 34;
  const max = niceMax(Math.max(...cats.flatMap((c) => [c.a, c.b])) * 1.05);
  const slot = (w - padL - padR) / cats.length;
  const bw = Math.min(56, slot * 0.32);
  const Y = (v) => padT + (1 - v / max) * (h - padT - padB);
  let grid = '';
  for (let i = 0; i <= 4; i++) {
    const v = (max * i) / 4;
    const y = Y(v);
    grid += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="${MUTED}">${fmt(v, 0)}</text>`;
  }
  const bars = cats.map((c, i) => {
    const cx = padL + slot * (i + 0.5);
    return `<rect x="${(cx - bw - 3).toFixed(1)}" y="${Y(c.a).toFixed(1)}" width="${bw}" height="${(h - padB - Y(c.a)).toFixed(1)}" rx="3" fill="${opts.colorA ?? RED}"/>` +
      `<rect x="${(cx + 3).toFixed(1)}" y="${Y(c.b).toFixed(1)}" width="${bw}" height="${(h - padB - Y(c.b)).toFixed(1)}" rx="3" fill="${opts.colorB ?? LIGHT_BLUE}"/>` +
      `<text x="${(cx - bw / 2 - 3).toFixed(1)}" y="${(Y(c.a) - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${c.a}</text>` +
      `<text x="${(cx + bw / 2 + 3).toFixed(1)}" y="${(Y(c.b) - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${c.b}</text>` +
      `<text x="${cx.toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(c.label)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label ?? 'Grouped bar chart')}" class="chart">${grid}${bars}</svg>
<div class="legend"><span class="legend-item"><i style="background:${opts.colorA ?? RED}"></i>${esc(opts.labelA ?? 'Japan')}</span><span class="legend-item"><i style="background:${opts.colorB ?? LIGHT_BLUE}"></i>${esc(opts.labelB ?? 'OECD average')}</span></div>`;
}

export const PALETTE = { INK, MUTED, RED, BLUE, TEAL, GOLD, LIGHT_BLUE, LIGHT_RED, LIGHT_TEAL };
