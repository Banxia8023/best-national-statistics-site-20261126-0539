// Nippon by Numbers — page renderers.
//
// Each view returns an HTML string for one hash route. All numbers come from
// data.js; all charts from charts.js. Nothing here fetches anything.

import {
  AGE_PYRAMID, AGE_SHARES, BIRTHS_DEATHS, CAUSES_OF_DEATH, COUNTRY, EDUCATION,
  GDP_HISTORY, GDP_SECTORS, HEALTH, KEY_STATS, LIFE_EXPECTANCY, PISA,
  POP_HISTORY, PREFECTURES, REGIONS, SOURCES, TRADE_PARTNERS_EXPORTS,
  TRADE_PARTNERS_IMPORTS,
} from './data.js';
import { donut, groupedBars, hbars, lineChart, pyramid, PALETTE } from './charts.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function statCard(s) {
  return `<article class="stat-card"><div class="stat-value">${esc(s.value)}</div>` +
    `<div class="stat-label">${esc(s.label)}</div><div class="stat-note">${esc(s.note)}</div>` +
    `<p class="stat-detail">${esc(s.detail)}</p></article>`;
}

function section(title, intro, inner) {
  return `<section class="card"><h2>${esc(title)}</h2>${intro ? `<p class="intro">${intro}</p>` : ''}${inner}</section>`;
}

function figure(caption, inner) {
  return `<figure>${inner}<figcaption>${caption}</figcaption></figure>`;
}

function fmtPop(thousands) {
  return `${(thousands / 1000).toFixed(2)}m`;
}

export function overview() {
  const top10 = [...PREFECTURES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  return `
<header class="hero">
  <p class="eyebrow">Japan · 日本 · National statistics</p>
  <h1>Nippon by Numbers</h1>
  <p class="lede">One country, counted properly. Population, economy, regions, health and
  education — every figure with its source and year, drawn from the World Bank,
  Japan's Statistics Bureau, the OECD and the IMF.</p>
  <p class="hero-facts"><span><b>124.0m</b> people</span><span><b>$4.19tn</b> GDP</span>
  <span><b>84.0 yrs</b> life expectancy</span><span><b>47</b> prefectures</span></p>
</header>
<div class="stat-grid">${KEY_STATS.map(statCard).join('')}</div>
${section('Population: shrinking, and getting older',
  'Japan peaked at 128.1 million people in 2010 and has fallen every year since. ' +
  'Births hit a record low of 720,988 in 2024 while deaths reached 1.61 million.',
  figure('Total population, millions · UN World Population Prospects 2024',
    lineChart(POP_HISTORY.map((p) => ({ x: p.year, y: p.pop })), {
      label: 'Population of Japan, 1950 to 2024', color: PALETTE.BLUE,
      yFormat: (v) => `${v}m`, labelEvery: 3,
      pointLabel: (p) => `${p.y.toFixed(1)}m`,
    })))}
${section('Economy: the world’s fourth largest',
  'Nominal GDP was $4.19 trillion in 2024. The yen’s slide cut the dollar figure by a ' +
  'fifth since 2021, even as output in yen kept growing.',
  figure('Nominal GDP, $ trillion · World Bank, current US$',
    lineChart(GDP_HISTORY.map((g) => ({ x: g.year, y: g.gdp })), {
      label: 'Nominal GDP of Japan, 2010 to 2024', color: PALETTE.RED,
      yFormat: (v) => `$${v}tn`, labelEvery: 3,
      pointLabel: (p) => `$${p.y.toFixed(2)}tn`,
    })))}
${section('Where people live',
  'More than one in nine Japanese residents lives in Tokyo. The five largest prefectures ' +
  'hold 37.9% of the whole country.',
  figure('Largest prefectures by population, 1 Oct 2024 · Statistics Bureau of Japan',
    hbars(top10.map((p) => ({ label: p.name, value: p.pop, display: fmtPop(p.pop) })), {
      label: 'Largest prefectures by population', color: PALETTE.TEAL,
    })))}
${section('Explore the numbers',
  '',
  `<nav class="explore-grid">
    <a href="#/population"><b>Population</b><span>Pyramid, births and deaths, all 47 prefectures</span></a>
    <a href="#/economy"><b>Economy</b><span>GDP, sectors, trade partners, debt</span></a>
    <a href="#/regions"><b>Regions</b><span>Search and sort every prefecture</span></a>
    <a href="#/health"><b>Health</b><span>Life expectancy and causes of death</span></a>
    <a href="#/education"><b>Education</b><span>PISA scores and attainment</span></a>
    <a href="#/sources"><b>Sources</b><span>Where every figure comes from</span></a>
  </nav>`)}
<p class="update-note">Figures are the latest published values as of November 2026. Population and GDP are 2024; see <a href="#/sources">Sources</a> for each figure’s year.</p>`;
}

export function population(state) {
  const range = state.popRange ?? 'all';
  const rows = range === '2000' ? POP_HISTORY.filter((p) => p.year >= 2000)
    : range === '2010' ? POP_HISTORY.filter((p) => p.year >= 2010) : POP_HISTORY;
  const every = range === 'all' ? 3 : 2;
  const top10 = [...PREFECTURES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  return `
<header class="page-head"><h1>Population</h1>
<p class="lede">124.0 million people in 2024 — down from a peak of 128.1 million in 2010, and
falling by roughly half a million a year.</p></header>
${section('The age pyramid, 2024',
  'Japan has the oldest population of any large country: 29.8% are 65 or older, and only ' +
  '11.4% are under 15. The bulge at 45–54 is the second baby boom; the narrow base is the ' +
  'birth rate, 1.20 children per woman in 2023.',
  figure('Population by five-year age group, thousands · UN World Population Prospects 2024',
    pyramid(AGE_PYRAMID)))}
<div class="two-col">
${section('Who is how old',
  'Three age bands, 2024 (World Bank).',
  donut(AGE_SHARES.map((a, i) => ({
    label: a.band, value: a.share,
    color: [PALETTE.BLUE, PALETTE.TEAL, PALETTE.RED][i],
  })), { label: 'Age structure of Japan', centre: '124.0m', centreSub: 'people, 2024' }))}
${section('Births vs deaths',
  'Deaths have outnumbered births every year since 2007. In 2024 the gap was 892,814 people — ' +
  'about the population of a city the size of Okayama.',
  figure('Births and deaths per year · MHLW vital statistics',
    groupedBars(BIRTHS_DEATHS.slice(-6).map((d) => ({
      label: String(d.year), a: Math.round(d.births / 1000), b: Math.round(d.deaths / 1000),
    })), {
      label: 'Births and deaths in Japan, thousands per year',
      labelA: 'Births (thousands)', labelB: 'Deaths (thousands)',
      colorA: PALETTE.TEAL, colorB: PALETTE.RED, height: 260,
    })))}
</div>
${section('Population over time',
  'From 83 million in 1950 to a 2010 peak and a steady fall since. Use the buttons to zoom in.',
  `<div class="btn-row" role="group" aria-label="Year range">
    <button data-pop-range="all" class="${range === 'all' ? 'active' : ''}">1950–2024</button>
    <button data-pop-range="2000" class="${range === '2000' ? 'active' : ''}">2000–2024</button>
    <button data-pop-range="2010" class="${range === '2010' ? 'active' : ''}">2010–2024</button>
  </div>` +
  figure('Total population, millions · UN World Population Prospects 2024',
    lineChart(rows.map((p) => ({ x: p.year, y: p.pop })), {
      label: 'Population of Japan over time', color: PALETTE.BLUE,
      yFormat: (v) => `${v}m`, labelEvery: every,
      pointLabel: (p) => `${p.y.toFixed(1)}m`,
    })))}
${section('Largest prefectures',
  'Population, 1 Oct 2024 · Statistics Bureau of Japan. See <a href="#/regions">Regions</a> for all 47.',
  figure('Largest prefectures by population',
    hbars(top10.map((p) => ({ label: p.name, value: p.pop, display: fmtPop(p.pop) })), {
      label: 'Largest prefectures by population', color: PALETTE.TEAL,
    })))}
<p class="update-note">Sources: UN World Population Prospects 2024; World Bank 2024; Statistics Bureau of Japan, Population Estimates 1 Oct 2024; MHLW vital statistics.</p>`;
}

export function economy(state) {
  const trade = state.trade ?? 'exports';
  const partners = trade === 'exports' ? TRADE_PARTNERS_EXPORTS : TRADE_PARTNERS_IMPORTS;
  const econStats = [
    { label: 'GDP (PPP)', value: '$6.77tn', note: '2024 · IMF', detail: '5th in the world at purchasing-power parity; $54,677 per person.' },
    { label: 'Real GDP growth', value: '−0.2%', note: '2024 · World Bank', detail: 'Growth has averaged under 1% a year since the 1990s.' },
    { label: 'Inflation (CPI)', value: '2.7%', note: '2024 · World Bank', detail: 'Up from decades near zero; the Bank of Japan ended negative rates in 2024.' },
    { label: 'Exports of goods & services', value: '$921bn', note: '2024 · World Bank', detail: '22.0% of GDP. Merchandise exports alone were $707bn.' },
    { label: 'Imports of goods & services', value: '$958bn', note: '2024 · World Bank', detail: '22.9% of GDP. Merchandise imports were $743bn.' },
    { label: 'Current account', value: '+4.6%', note: 'of GDP · 2024 · IMF', detail: 'Japan has run a surplus every year since 1981.' },
    { label: 'Foreign reserves', value: '$1.37tn', note: '2025 · World Bank', detail: 'The world’s third-largest reserve stockpile.' },
    { label: 'R&D spending', value: '3.3%', note: 'of GDP · 2022 · OECD', detail: 'About 5,630 researchers per million people.' },
  ];
  return `
<header class="page-head"><h1>Economy</h1>
<p class="lede">The world’s fourth-largest economy: $4.19 trillion in 2024, $33,797 per person —
and a public debt of 251.7% of GDP, the highest of any advanced economy.</p></header>
<div class="stat-grid">${econStats.map(statCard).join('')}</div>
${section('GDP over time',
  'Nominal GDP in current US dollars. The 2022–2024 fall is mostly the yen: in yen terms ' +
  'the economy kept growing; in dollars it shrank by a fifth.',
  figure('Nominal GDP, $ trillion · World Bank, current US$',
    lineChart(GDP_HISTORY.map((g) => ({ x: g.year, y: g.gdp })), {
      label: 'Nominal GDP of Japan, 2010 to 2024', color: PALETTE.RED,
      yFormat: (v) => `$${v}tn`, labelEvery: 3,
      pointLabel: (p) => `$${p.y.toFixed(2)}tn`,
    })))}
<div class="two-col">
${section('What the economy makes',
  'Value-added shares, 2021 (OECD). Manufacturing alone is 18.8% of GDP (2024).',
  donut(GDP_SECTORS.map((s, i) => ({
    label: s.sector, value: s.share,
    color: [PALETTE.BLUE, PALETTE.TEAL, PALETTE.GOLD][i],
  })), { label: 'GDP by sector', centre: '100%', centreSub: 'of value added' }))}
${section('Who Japan trades with',
  'Share of merchandise trade, 2024 (Ministry of Finance). Switch between exports and imports.',
  `<div class="btn-row" role="group" aria-label="Trade direction">
    <button data-trade="exports" class="${trade === 'exports' ? 'active' : ''}">Exports</button>
    <button data-trade="imports" class="${trade === 'imports' ? 'active' : ''}">Imports</button>
  </div>` +
  figure(trade === 'exports'
    ? 'Top export partners, % of merchandise exports · Ministry of Finance 2024'
    : 'Top import partners, % of merchandise imports · Ministry of Finance 2024',
    hbars(partners.map((p) => ({ label: p.partner, value: p.share, display: `${p.share.toFixed(1)}%` })), {
      label: 'Top trade partners', color: trade === 'exports' ? PALETTE.BLUE : PALETTE.GOLD,
      labelWidth: 120,
    })))}
</div>
${section('Trade in goods, 2024',
  'Machinery and transport equipment — cars, electronics, machine tools — are more than half of ' +
  'what Japan sells abroad. Mineral fuels are more than a quarter of what it buys.',
  `<table class="data-table"><thead><tr><th>Flow</th><th>Main items</th><th>Share</th></tr></thead><tbody>
  <tr><td>Exports — machinery &amp; transport equipment</td><td>Cars, electronics, machine tools</td><td>53.9%</td></tr>
  <tr><td>Exports — manufactured goods</td><td>Steel, chemicals, plastics</td><td>12.0%</td></tr>
  <tr><td>Exports — chemicals</td><td>Pharmaceuticals, organic chemicals</td><td>11.8%</td></tr>
  <tr><td>Imports — mineral fuels</td><td>Oil, LNG, coal</td><td>28.0%</td></tr>
  <tr><td>Imports — machinery &amp; transport equipment</td><td>Computers, aircraft parts</td><td>24.3%</td></tr>
  </tbody></table>
  <p class="table-note">Shares of merchandise trade, 2022 (OECD Economic Surveys: Japan 2024).</p>`)}
<p class="update-note">Sources: World Bank 2024; IMF World Economic Outlook 2024; OECD 2022; Ministry of Finance 2024.</p>`;
}

export function regions(state) {
  const q = (state.query ?? '').trim().toLowerCase();
  const region = state.region ?? 'All';
  const sortKey = state.sortKey ?? 'pop';
  const sortDir = state.sortDir ?? -1;
  let rows = PREFECTURES.filter((p) =>
    (region === 'All' || p.region === region) &&
    (!q || p.name.toLowerCase().includes(q) || p.jp.includes(q) || p.capital.toLowerCase().includes(q)));
  const keyFn = { pop: (p) => p.pop, name: (p) => p.name, area: (p) => p.area, density: (p) => p.pop * 1000 / p.area }[sortKey];
  rows = [...rows].sort((a, b) => {
    const ka = keyFn(a);
    const kb = keyFn(b);
    return (ka < kb ? -1 : ka > kb ? 1 : 0) * sortDir;
  });
  const selected = state.selected ? PREFECTURES.find((p) => p.name === state.selected) : null;
  const top10 = [...PREFECTURES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  const th = (key, label) => `<th><button class="sort-btn" data-sort="${key}">${esc(label)}${sortKey === key ? (sortDir === -1 ? ' ▼' : ' ▲') : ''}</button></th>`;
  const body = rows.map((p) => {
    const density = Math.round((p.pop * 1000) / p.area);
    return `<tr data-pref="${esc(p.name)}" class="${selected && selected.name === p.name ? 'selected' : ''}">
      <td>${esc(p.name)}</td><td lang="ja">${esc(p.jp)}</td><td>${esc(p.region)}</td>
      <td>${esc(p.capital)}</td><td class="num">${fmtPop(p.pop)}</td>
      <td class="num">${p.area.toLocaleString('en-US')}</td><td class="num">${density.toLocaleString('en-US')}</td></tr>`;
  }).join('');
  const detail = selected ? `
  <aside class="detail-panel" id="pref-detail">
    <h3>${esc(selected.name)} <span lang="ja">${esc(selected.jp)}</span></h3>
    <dl>
      <dt>Capital</dt><dd>${esc(selected.capital)}</dd>
      <dt>Region</dt><dd>${esc(selected.region)}</dd>
      <dt>Population</dt><dd>${fmtPop(selected.pop)} (${(selected.pop / 123802 * 100).toFixed(1)}% of Japan)</dd>
      <dt>Area</dt><dd>${selected.area.toLocaleString('en-US')} km²</dd>
      <dt>Density</dt><dd>${Math.round((selected.pop * 1000) / selected.area).toLocaleString('en-US')} people per km² (national average: 328)</dd>
    </dl>
    <p>${esc(selected.name)} is ${selected.pop >= 5000 ? 'one of Japan’s largest prefectures' : selected.pop >= 2000 ? 'a mid-sized prefecture' : 'one of Japan’s smaller prefectures'} by population. ` +
    `Click another row to compare, or clear the search to see all 47.</p>
    <button class="btn-row" data-clear-selected="1">Close details</button>
  </aside>` : '';
  return `
<header class="page-head"><h1>Regions</h1>
<p class="lede">All 47 prefectures, from Hokkaido’s 83,424 km² to Kagawa’s 1,877 km².
Search, filter by region, sort any column — and click a row for its details.</p></header>
${section('Largest prefectures',
  'Population, 1 Oct 2024 · Statistics Bureau of Japan.',
  figure('Largest prefectures by population',
    hbars(top10.map((p) => ({ label: p.name, value: p.pop, display: fmtPop(p.pop) })), {
      label: 'Largest prefectures by population', color: PALETTE.TEAL,
    })))}
${section('All 47 prefectures',
  `Showing ${rows.length} of 47 prefectures. Population is the 1 Oct 2024 estimate (thousands); ` +
  'area is from the Geospatial Information Authority of Japan.',
  `<div class="controls">
    <label class="search-box">Search <input type="search" id="pref-search" placeholder="Name, Japanese name or capital…" value="${esc(state.query ?? '')}" aria-label="Search prefectures"></label>
    <div class="btn-row" role="group" aria-label="Filter by region">
      ${['All', ...REGIONS].map((r) => `<button data-region="${esc(r)}" class="${region === r ? 'active' : ''}">${esc(r)}</button>`).join('')}
    </div>
  </div>
  ${detail}
  <div class="table-scroll"><table class="data-table" id="pref-table"><thead><tr>
    ${th('name', 'Prefecture')}<th>Japanese</th><th>Region</th><th>Capital</th>
    ${th('pop', 'Population')}${th('area', 'Area km²')}${th('density', 'Density /km²')}
  </tr></thead><tbody>${body || '<tr><td colspan="7">No prefecture matches that search.</td></tr>'}</tbody></table></div>
  <p class="table-note">Density is people per km² of land. Tokyo, at 6,461 per km², is the densest; Hokkaido, at 61, the least dense.</p>`)}
<p class="update-note">Sources: Statistics Bureau of Japan, Population Estimates 1 Oct 2024; Geospatial Information Authority of Japan.</p>`;
}

export function health() {
  return `
<header class="page-head"><h1>Health</h1>
<p class="lede">Japan lives longer than any other large country — 84.0 years at birth in 2024 —
and spends 10.9% of GDP on health to do it.</p></header>
<div class="stat-grid">${HEALTH.map((h) => statCard({
  value: h.value, label: h.label, note: `${h.year} · ${h.source}`,
  detail: h.label === 'Centenarians' ? 'More than 95,000 people aged 100 or older — the most per capita in the world.' : '',
})).join('')}</div>
${section('Life expectancy keeps climbing',
  'From 68.4 years in 1960 to 84.0 in 2024. Women live 87.1 years, men 81.1 — a gap of six years.',
  figure('Life expectancy at birth, years · World Bank',
    lineChart(LIFE_EXPECTANCY.map((d) => ({ x: d.year, y: d.total })), {
      label: 'Life expectancy in Japan, 1960 to 2024', color: PALETTE.TEAL,
      yFormat: (v) => `${v}`, yMin: 60, labelEvery: 2,
      pointLabel: (p) => p.y.toFixed(1),
    })))}
${section('What people die of',
  'Cancer and heart disease together account for nearly two in five deaths. “Senility” — death ' +
  'recorded as old age with no single disease — is third, a sign of how old the population is.',
  figure('Share of all deaths, % · MHLW vital statistics 2023',
    hbars(CAUSES_OF_DEATH.map((c) => ({ label: c.cause, value: c.share, display: `${c.share}%` })), {
      label: 'Leading causes of death in Japan', color: PALETTE.RED, labelWidth: 190,
    })))}
<p class="update-note">Sources: World Bank 2024; WHO 2021; OECD 2022; MHLW vital statistics 2023–2024.</p>`;
}

export function education() {
  return `
<header class="page-head"><h1>Education</h1>
<p class="lede">Japanese 15-year-olds scored 536 in mathematics in PISA 2022 — 64 points above the
OECD average — and 56.1% of adults hold a tertiary qualification.</p></header>
<div class="stat-grid">${EDUCATION.map((e) => statCard({
  value: e.value, label: e.label, note: `${e.year} · ${e.source}`, detail: '',
})).join('')}</div>
${section('PISA 2022: Japan vs the OECD',
  'Mean scores for 15-year-olds. Japan ranks in the top five of the 81 participating countries ' +
  'in all three domains; mathematics is its strongest.',
  figure('PISA 2022 mean scores · OECD',
    groupedBars(PISA.map((p) => ({ label: p.domain, a: p.japan, b: p.oecd })), {
      label: 'PISA 2022 scores, Japan versus OECD average',
      labelA: 'Japan', labelB: 'OECD average',
      colorA: PALETTE.RED, colorB: PALETTE.LIGHT_BLUE, height: 320,
    })))}
${section('How schooling works',
  '',
  `<ul class="fact-list">
    <li><b>Compulsory schooling</b> runs from age 6 to 15: six years of primary school and three of lower secondary. Enrolment is effectively universal.</li>
    <li><b>Upper secondary</b> is not compulsory, yet about 98% of pupils continue — one of the highest rates in the OECD.</li>
    <li><b>Higher education</b> takes in about 64.5% of young people (gross tertiary enrolment, 2023). There are 810 universities, most of them private.</li>
    <li><b>Teachers</b> are civil servants in public schools, and the pupil–teacher ratio in primary school is 16 to 1.</li>
    <li><b>Public spending</b> on education is 3.3% of GDP (2021) — below the OECD average of about 4.9% — while households spend heavily on after-school <i>juku</i> cram schools.</li>
  </ul>`)}
<p class="update-note">Sources: OECD PISA 2022; OECD Education at a Glance 2024; World Bank 2021–2023; MEXT 2023.</p>`;
}

export function sources() {
  const rows = SOURCES.map((s) => `<tr><td>${esc(s.publisher)}</td><td>${esc(s.what)}</td><td>${esc(s.year)}</td></tr>`).join('');
  return `
<header class="page-head"><h1>Sources &amp; methods</h1>
<p class="lede">Every figure on this site comes from a published official source. This page lists
them all, so any number can be checked.</p></header>
${section('Where the numbers come from',
  '',
  `<div class="table-scroll"><table class="data-table"><thead><tr><th>Publisher</th><th>What it supplied</th><th>Year</th></tr></thead>
  <tbody>${rows}</tbody></table></div>`)}
${section('Methods and notes',
  '',
  `<ul class="fact-list">
    <li><b>Population</b> is the total including foreign residents. Prefecture figures are the Statistics Bureau’s estimates for 1 October 2024; the 2025 census results will revise them.</li>
    <li><b>GDP</b> is nominal, in current US dollars, from the World Bank. The 2022–2024 dollar fall reflects the yen’s depreciation; GDP in yen rose over the same period.</li>
    <li><b>Age pyramid</b> values are the UN’s 2024 medium estimate, in thousands, by five-year age group.</li>
    <li><b>PISA</b> scores are mean scores for 15-year-olds in the OECD’s 2022 assessment, across 81 participating countries and economies.</li>
    <li><b>Figures are rounded</b> for display (for example, populations to the nearest thousand). Rounding may make displayed parts sum to slightly more or less than a displayed total.</li>
    <li><b>No figure is fetched live.</b> The whole site is static files; nothing it shows comes from another server.</li>
  </ul>`)}
${section('About this site',
  '',
  `<p>Nippon by Numbers is an independent statistics site built for make.fun’s “best national
  statistics site” competition. It is not affiliated with the Statistics Bureau of Japan, the World
  Bank, the OECD or any government. The data is public; the design, text and charts are original.</p>
  <p>Built November 2026. Figures are the latest published values as of that date.</p>`)}`;
}

export function missing() {
  return `<header class="page-head"><h1>Page not found</h1>
  <p class="lede">That section does not exist. Try one of these:</p></header>
  <nav class="explore-grid">
    <a href="#/"><b>Overview</b><span>Japan at a glance</span></a>
    <a href="#/population"><b>Population</b><span>Pyramid, births and deaths</span></a>
    <a href="#/economy"><b>Economy</b><span>GDP, sectors, trade</span></a>
    <a href="#/regions"><b>Regions</b><span>All 47 prefectures</span></a>
  </nav>`;
}

export { COUNTRY };
