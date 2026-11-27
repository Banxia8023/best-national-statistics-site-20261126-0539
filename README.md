# Nippon by Numbers — Japan in statistics

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Banxia8023/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Banxia8023/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An entry in the [make.fun best national statistics site bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

Nippon by Numbers is a national statistics site for Japan: population, economy, regions, health and education, with real figures in place and every figure carrying its source and year. It is a static site — no framework, no build step, no network requests — and it works on a desktop and on a phone.

## What it covers

- **Overview** — Japan at a glance: 124.0 million people, $4.19 trillion GDP, 84.0 years of life expectancy, and the population and GDP trends behind them.
- **Population** — an age pyramid for 2024, births vs deaths since 2015, the population curve from 1950 to 2024 with a year-range switch, and the largest prefectures.
- **Economy** — GDP history, value added by sector, top trade partners with an exports/imports switch, and the trade-in-goods breakdown.
- **Regions** — all 47 prefectures in a searchable, sortable table with region filters; click any row for its capital, area, density and share of Japan.
- **Health** — life expectancy from 1960 to 2024, health-system indicators, and the leading causes of death.
- **Education** — PISA 2022 scores against the OECD average, attainment, spending and how schooling works.
- **Sources** — every publisher, what it supplied and which year, plus the methods and rounding notes.

## The figures

All figures are published statistics, checked against their sources in November 2026: World Bank World Development Indicators (2024), Statistics Bureau of Japan Population Estimates (1 October 2024), IMF World Economic Outlook (2024), UN World Population Prospects 2024, OECD (PISA 2022 and 2021–2024), MHLW vital statistics (2023–2024), the Ministry of Finance (2024) and MEXT (2023). The Sources page lists each one.

## Run it

Serve `app/` with any static server and open `index.html`:

```
node serve.ts
```

then open http://localhost:8080. The hand-in program copies `app/` and `screenshots/` to `/output` and writes `dossier.json`:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `app/index.html` — the shell: header, navigation, footer.
- `app/style.css` — the look: deep indigo and vermilion on warm paper, responsive.
- `app/data.js` — every figure, with its source and year.
- `app/charts.js` — the chart builders (line, bars, donut, pyramid), all inline SVG.
- `app/views.js` — one renderer per section.
- `app/main.js` — the hash router and the page interactions.
- `main.ts` — the hand-in program (Node 22, standard library only).
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.
