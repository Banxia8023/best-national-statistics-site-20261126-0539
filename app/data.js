// Nippon by Numbers — the data behind the site.
//
// Every figure below is a published statistic with its source and year.
// Main sources: World Bank World Development Indicators (2024), Statistics
// Bureau of Japan (Population Estimates, 1 Oct 2024), IMF World Economic
// Outlook (2024), OECD (2022-2024), Ministry of Health, Labour and Welfare
// (MHLW, 2023-2024), UN World Population Prospects 2024, PISA 2022.
// Figures are rounded for display; the Sources page lists each one.

export const COUNTRY = {
  name: 'Japan',
  japanese: '日本',
  capital: 'Tokyo',
  areaKm2: 377975,
  landKm2: 364569,
  population2024: 123975371,
  motto: 'National statistics, in one place.',
};

export const KEY_STATS = [
  { label: 'Population', value: '124.0m', note: '2024 · World Bank', detail: '12th largest in the world; shrinking about 0.5% a year.' },
  { label: 'GDP (nominal)', value: '$4.19tn', note: '2024 · World Bank', detail: '4th largest economy in the world.' },
  { label: 'GDP per capita', value: '$33,797', note: '2024 · World Bank', detail: '$54,677 at purchasing-power parity (IMF).' },
  { label: 'Life expectancy', value: '84.0 yrs', note: '2024 · World Bank', detail: '87.1 for women, 81.1 for men (2023).' },
  { label: 'Median age', value: '49.4 yrs', note: '2024 · UN', detail: 'The oldest large population on earth.' },
  { label: 'Unemployment', value: '2.5%', note: '2024 · ILO', detail: 'Labour force 69.3 million; participation 63.3%.' },
  { label: 'Fertility rate', value: '1.20', note: '2023 · World Bank', detail: '1.14 in 2024 (MHLW); replacement is 2.1.' },
  { label: 'Public debt', value: '251.7%', note: 'of GDP · 2024 · IMF', detail: 'The highest ratio among advanced economies.' },
];

// Population, millions (UN World Population Prospects 2024).
export const POP_HISTORY = [
  { year: 1950, pop: 83.2 }, { year: 1955, pop: 90.0 }, { year: 1960, pop: 94.3 },
  { year: 1965, pop: 99.2 }, { year: 1970, pop: 104.3 }, { year: 1975, pop: 111.9 },
  { year: 1980, pop: 117.1 }, { year: 1985, pop: 121.0 }, { year: 1990, pop: 123.5 },
  { year: 1995, pop: 125.4 }, { year: 2000, pop: 126.9 }, { year: 2005, pop: 127.8 },
  { year: 2010, pop: 128.1 }, { year: 2015, pop: 127.1 }, { year: 2020, pop: 125.8 },
  { year: 2024, pop: 124.0 },
];

// Age structure 2024, thousands (UN World Population Prospects 2024, medium estimate).
export const AGE_PYRAMID = [
  { group: '0–4', male: 1970, female: 1880 }, { group: '5–9', male: 2360, female: 2240 },
  { group: '10–14', male: 2800, female: 2650 }, { group: '15–19', male: 2880, female: 2730 },
  { group: '20–24', male: 3080, female: 2920 }, { group: '25–29', male: 3230, female: 3060 },
  { group: '30–34', male: 3380, female: 3210 }, { group: '35–39', male: 3580, female: 3420 },
  { group: '40–44', male: 4050, female: 3870 }, { group: '45–49', male: 4590, female: 4410 },
  { group: '50–54', male: 4430, female: 4280 }, { group: '55–59', male: 4020, female: 3900 },
  { group: '60–64', male: 3750, female: 3660 }, { group: '65–69', male: 4150, female: 4320 },
  { group: '70–74', male: 4450, female: 4930 }, { group: '75–79', male: 3560, female: 4250 },
  { group: '80–84', male: 2440, female: 3190 }, { group: '85–89', male: 1400, female: 2100 },
  { group: '90–94', male: 560, female: 1030 }, { group: '95–99', male: 160, female: 360 },
  { group: '100+', male: 20, female: 80 },
];

export const AGE_SHARES = [
  { band: 'Ages 0–14', share: 11.4, people: '14.1m' },
  { band: 'Ages 15–64', share: 58.8, people: '72.9m' },
  { band: 'Ages 65+', share: 29.8, people: '36.9m' },
];

// Births and deaths per year (MHLW vital statistics).
export const BIRTHS_DEATHS = [
  { year: 2015, births: 1005656, deaths: 1290428 },
  { year: 2016, births: 977242, deaths: 1307748 },
  { year: 2017, births: 946065, deaths: 1340433 },
  { year: 2018, births: 918400, deaths: 1362470 },
  { year: 2019, births: 865239, deaths: 1381093 },
  { year: 2020, births: 840832, deaths: 1372755 },
  { year: 2021, births: 811622, deaths: 1439809 },
  { year: 2022, births: 770759, deaths: 1569050 },
  { year: 2023, births: 727277, deaths: 1575916 },
  { year: 2024, births: 720988, deaths: 1613802 },
];

// Nominal GDP, $ trillion (World Bank, current US$).
export const GDP_HISTORY = [
  { year: 2010, gdp: 5.76 }, { year: 2011, gdp: 6.23 }, { year: 2012, gdp: 6.27 },
  { year: 2013, gdp: 5.21 }, { year: 2014, gdp: 4.90 }, { year: 2015, gdp: 4.44 },
  { year: 2016, gdp: 5.00 }, { year: 2017, gdp: 4.93 }, { year: 2018, gdp: 5.04 },
  { year: 2019, gdp: 5.12 }, { year: 2020, gdp: 5.06 }, { year: 2021, gdp: 5.03 },
  { year: 2022, gdp: 4.26 }, { year: 2023, gdp: 4.20 }, { year: 2024, gdp: 4.19 },
];

export const GDP_SECTORS = [
  { sector: 'Services', share: 70.1, note: 'finance, retail, health, transport' },
  { sector: 'Industry & construction', share: 28.9, note: 'manufacturing is 18.8% of GDP' },
  { sector: 'Agriculture, forestry & fishing', share: 1.0, note: 'rice, fish, timber' },
];

export const TRADE_PARTNERS_EXPORTS = [
  { partner: 'United States', share: 20.0 },
  { partner: 'China', share: 17.6 },
  { partner: 'South Korea', share: 7.1 },
  { partner: 'Taiwan', share: 6.0 },
  { partner: 'Hong Kong', share: 4.2 },
  { partner: 'Thailand', share: 3.7 },
  { partner: 'Singapore', share: 3.1 },
  { partner: 'Germany', share: 2.5 },
];

export const TRADE_PARTNERS_IMPORTS = [
  { partner: 'China', share: 22.0 },
  { partner: 'United States', share: 10.6 },
  { partner: 'Australia', share: 6.0 },
  { partner: 'South Korea', share: 4.2 },
  { partner: 'Taiwan', share: 3.6 },
  { partner: 'Saudi Arabia', share: 3.4 },
  { partner: 'UAE', share: 3.1 },
  { partner: 'Vietnam', share: 2.8 },
];

// Life expectancy at birth, years (World Bank).
export const LIFE_EXPECTANCY = [
  { year: 1960, total: 68.4, female: 71.1, male: 65.3 },
  { year: 1970, total: 72.0, female: 74.7, male: 69.3 },
  { year: 1980, total: 75.9, female: 78.8, male: 73.4 },
  { year: 1990, total: 79.0, female: 81.9, male: 75.9 },
  { year: 2000, total: 81.1, female: 84.6, male: 77.7 },
  { year: 2010, total: 83.0, female: 86.3, male: 79.6 },
  { year: 2020, total: 84.0, female: 87.5, male: 81.6 },
  { year: 2024, total: 84.0, female: 87.1, male: 81.1 },
];

export const HEALTH = [
  { label: 'Life expectancy', value: '84.0 years', year: 2024, source: 'World Bank' },
  { label: 'Healthy life expectancy', value: '74.1 years', year: 2021, source: 'WHO' },
  { label: 'Health spending', value: '10.9% of GDP', year: 2022, source: 'OECD' },
  { label: 'Hospital beds', value: '12.6 per 1,000', year: 2022, source: 'OECD' },
  { label: 'Physicians', value: '2.65 per 1,000', year: 2022, source: 'World Bank' },
  { label: 'Nurses', value: '12.0 per 1,000', year: 2022, source: 'OECD' },
  { label: 'Infant mortality', value: '1.8 per 1,000 births', year: 2023, source: 'World Bank' },
  { label: 'Centenarians', value: '95,119', year: 2024, source: 'MHLW' },
];

// Leading causes of death, share of all deaths (MHLW vital statistics 2023).
export const CAUSES_OF_DEATH = [
  { cause: 'Cancer', share: 24.3 },
  { cause: 'Heart disease', share: 14.9 },
  { cause: 'Senility (old age)', share: 11.1 },
  { cause: 'Cerebrovascular disease', share: 6.7 },
  { cause: 'Pneumonia', share: 5.5 },
  { cause: 'Aspiration pneumonia', share: 3.4 },
  { cause: 'Accidents', share: 2.6 },
  { cause: 'Suicide', share: 1.4 },
];

// PISA 2022 mean scores (OECD).
export const PISA = [
  { domain: 'Mathematics', japan: 536, oecd: 472 },
  { domain: 'Reading', japan: 516, oecd: 476 },
  { domain: 'Science', japan: 547, oecd: 485 },
];

export const EDUCATION = [
  { label: 'Tertiary attainment, ages 25–64', value: '56.1%', year: 2022, source: 'OECD' },
  { label: 'Tertiary attainment, ages 25–34', value: '61.9%', year: 2022, source: 'OECD' },
  { label: 'Public spending on education', value: '3.3% of GDP', year: 2021, source: 'World Bank' },
  { label: 'Universities', value: '810', year: 2023, source: 'MEXT' },
  { label: 'University students', value: '2.93 million', year: 2023, source: 'MEXT' },
  { label: 'Primary enrolment (gross)', value: '101.1%', year: 2023, source: 'World Bank' },
  { label: 'Pupil–teacher ratio, primary', value: '16 : 1', year: 2017, source: 'World Bank' },
  { label: 'R&D spending', value: '3.3% of GDP', year: 2022, source: 'OECD' },
];

// All 47 prefectures. Population: thousands, 1 Oct 2024 (Statistics Bureau of
// Japan, Population Estimates). Area: km² (Geospatial Information Authority).
// Region: one of the eight traditional regions.
export const PREFECTURES = [
  { name: 'Hokkaido', jp: '北海道', region: 'Hokkaido', capital: 'Sapporo', pop: 5063, area: 83424 },
  { name: 'Aomori', jp: '青森県', region: 'Tohoku', capital: 'Aomori', pop: 1183, area: 9646 },
  { name: 'Iwate', jp: '岩手県', region: 'Tohoku', capital: 'Morioka', pop: 1156, area: 15275 },
  { name: 'Miyagi', jp: '宮城県', region: 'Tohoku', capital: 'Sendai', pop: 2262, area: 7282 },
  { name: 'Akita', jp: '秋田県', region: 'Tohoku', capital: 'Akita', pop: 897, area: 11638 },
  { name: 'Yamagata', jp: '山形県', region: 'Tohoku', capital: 'Yamagata', pop: 1022, area: 9323 },
  { name: 'Fukushima', jp: '福島県', region: 'Tohoku', capital: 'Fukushima', pop: 1758, area: 13784 },
  { name: 'Ibaraki', jp: '茨城県', region: 'Kanto', capital: 'Mito', pop: 2849, area: 6097 },
  { name: 'Tochigi', jp: '栃木県', region: 'Kanto', capital: 'Utsunomiya', pop: 1900, area: 6408 },
  { name: 'Gunma', jp: '群馬県', region: 'Kanto', capital: 'Maebashi', pop: 1907, area: 6362 },
  { name: 'Saitama', jp: '埼玉県', region: 'Kanto', capital: 'Saitama', pop: 7332, area: 3798 },
  { name: 'Chiba', jp: '千葉県', region: 'Kanto', capital: 'Chiba', pop: 6251, area: 5158 },
  { name: 'Tokyo', jp: '東京都', region: 'Kanto', capital: 'Tokyo', pop: 14178, area: 2194 },
  { name: 'Kanagawa', jp: '神奈川県', region: 'Kanto', capital: 'Yokohama', pop: 9225, area: 2416 },
  { name: 'Niigata', jp: '新潟県', region: 'Chubu', capital: 'Niigata', pop: 2139, area: 12584 },
  { name: 'Toyama', jp: '富山県', region: 'Chubu', capital: 'Toyama', pop: 1003, area: 4248 },
  { name: 'Ishikawa', jp: '石川県', region: 'Chubu', capital: 'Kanazawa', pop: 1108, area: 4186 },
  { name: 'Fukui', jp: '福井県', region: 'Chubu', capital: 'Fukui', pop: 750, area: 4190 },
  { name: 'Yamanashi', jp: '山梨県', region: 'Chubu', capital: 'Kofu', pop: 801, area: 4465 },
  { name: 'Nagano', jp: '長野県', region: 'Chubu', capital: 'Nagano', pop: 2005, area: 13562 },
  { name: 'Gifu', jp: '岐阜県', region: 'Chubu', capital: 'Gifu', pop: 1948, area: 10621 },
  { name: 'Shizuoka', jp: '静岡県', region: 'Chubu', capital: 'Shizuoka', pop: 3510, area: 7777 },
  { name: 'Aichi', jp: '愛知県', region: 'Chubu', capital: 'Nagoya', pop: 7460, area: 5173 },
  { name: 'Mie', jp: '三重県', region: 'Kansai', capital: 'Tsu', pop: 1720, area: 5774 },
  { name: 'Shiga', jp: '滋賀県', region: 'Kansai', capital: 'Otsu', pop: 1410, area: 4017 },
  { name: 'Kyoto', jp: '京都府', region: 'Kansai', capital: 'Kyoto', pop: 2555, area: 4612 },
  { name: 'Osaka', jp: '大阪府', region: 'Kansai', capital: 'Osaka', pop: 8757, area: 1905 },
  { name: 'Hyogo', jp: '兵庫県', region: 'Kansai', capital: 'Kobe', pop: 5363, area: 8401 },
  { name: 'Nara', jp: '奈良県', region: 'Kansai', capital: 'Nara', pop: 1302, area: 3691 },
  { name: 'Wakayama', jp: '和歌山県', region: 'Kansai', capital: 'Wakayama', pop: 888, area: 4725 },
  { name: 'Tottori', jp: '鳥取県', region: 'Chugoku', capital: 'Tottori', pop: 539, area: 3507 },
  { name: 'Shimane', jp: '島根県', region: 'Chugoku', capital: 'Matsue', pop: 649, area: 6708 },
  { name: 'Okayama', jp: '岡山県', region: 'Chugoku', capital: 'Okayama', pop: 1842, area: 7114 },
  { name: 'Hiroshima', jp: '広島県', region: 'Chugoku', capital: 'Hiroshima', pop: 2757, area: 8479 },
  { name: 'Yamaguchi', jp: '山口県', region: 'Chugoku', capital: 'Yamaguchi', pop: 1295, area: 6113 },
  { name: 'Tokushima', jp: '徳島県', region: 'Shikoku', capital: 'Tokushima', pop: 691, area: 4147 },
  { name: 'Kagawa', jp: '香川県', region: 'Shikoku', capital: 'Takamatsu', pop: 927, area: 1877 },
  { name: 'Ehime', jp: '愛媛県', region: 'Shikoku', capital: 'Matsuyama', pop: 1291, area: 5676 },
  { name: 'Kochi', jp: '高知県', region: 'Shikoku', capital: 'Kochi', pop: 655, area: 7104 },
  { name: 'Fukuoka', jp: '福岡県', region: 'Kyushu', capital: 'Fukuoka', pop: 5096, area: 4986 },
  { name: 'Saga', jp: '佐賀県', region: 'Kyushu', capital: 'Saga', pop: 790, area: 2441 },
  { name: 'Nagasaki', jp: '長崎県', region: 'Kyushu', capital: 'Nagasaki', pop: 1273, area: 4131 },
  { name: 'Kumamoto', jp: '熊本県', region: 'Kyushu', capital: 'Kumamoto', pop: 1703, area: 7409 },
  { name: 'Oita', jp: '大分県', region: 'Kyushu', capital: 'Oita', pop: 1091, area: 6341 },
  { name: 'Miyazaki', jp: '宮崎県', region: 'Kyushu', capital: 'Miyazaki', pop: 1046, area: 7735 },
  { name: 'Kagoshima', jp: '鹿児島県', region: 'Kyushu', capital: 'Kagoshima', pop: 1551, area: 9187 },
  { name: 'Okinawa', jp: '沖縄県', region: 'Kyushu', capital: 'Naha', pop: 1470, area: 2281 },
];

export const REGIONS = ['Hokkaido', 'Tohoku', 'Kanto', 'Chubu', 'Kansai', 'Chugoku', 'Shikoku', 'Kyushu'];

export const SOURCES = [
  { publisher: 'World Bank — World Development Indicators', what: 'Population, GDP, GDP per capita, life expectancy, inflation, unemployment, trade shares, education spending', year: '2024 (latest available)' },
  { publisher: 'Statistics Bureau of Japan — Population Estimates', what: 'Total population and population of all 47 prefectures', year: '1 October 2024' },
  { publisher: 'IMF — World Economic Outlook', what: 'GDP (PPP), public debt as % of GDP', year: '2024' },
  { publisher: 'UN — World Population Prospects 2024', what: 'Population history, median age, age structure and pyramid', year: '2024' },
  { publisher: 'OECD', what: 'GDP by sector, PISA 2022 scores, tertiary attainment, health spending, hospital beds, R&D', year: '2021–2024' },
  { publisher: 'Ministry of Health, Labour and Welfare (MHLW)', what: 'Births and deaths, fertility rate, causes of death, centenarians', year: '2023–2024' },
  { publisher: 'Ministry of Finance / JETRO', what: 'Merchandise trade by partner country', year: '2024' },
  { publisher: 'Geospatial Information Authority of Japan', what: 'Prefecture areas', year: '2024' },
  { publisher: 'MEXT — Ministry of Education, Culture, Sports, Science and Technology', what: 'Number of universities and university students', year: '2023' },
];
