// Nippon by Numbers — router and interactions.
//
// Hash routes: #/ overview, #/population, #/economy, #/regions, #/health,
// #/education, #/sources. The regions page keeps its own state (search text,
// region filter, sort column and direction, selected prefecture) and re-renders
// in place; the population page keeps its year-range choice.
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { economy, education, health, missing, overview, population, regions, sources } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('site-nav');

const ROUTES = [
  { path: '', title: 'Nippon by Numbers — Japan in statistics', render: overview },
  { path: 'population', title: 'Population | Nippon by Numbers', render: population },
  { path: 'economy', title: 'Economy | Nippon by Numbers', render: economy },
  { path: 'regions', title: 'Regions | Nippon by Numbers', render: regions },
  { path: 'health', title: 'Health | Nippon by Numbers', render: health },
  { path: 'education', title: 'Education | Nippon by Numbers', render: education },
  { path: 'sources', title: 'Sources & methods | Nippon by Numbers', render: sources },
];

// State that survives re-renders of the interactive pages.
const state = {
  popRange: 'all',
  trade: 'exports',
  query: '',
  region: 'All',
  sortKey: 'pop',
  sortDir: -1,
  selected: null,
};

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, '').split('?')[0];
  return ROUTES.find((r) => r.path === hash) ?? { path: null, title: 'Page not found | Nippon by Numbers', render: missing };
}

function render() {
  window.__shotReady = false;
  const route = currentRoute();
  document.title = route.title;
  app.innerHTML = route.render(state);
  for (const link of nav.querySelectorAll('a')) {
    const href = link.getAttribute('href');
    const path = href.replace(/^#\/?/, '');
    link.classList.toggle('active', path === route.path);
    if (path === route.path) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  const search = document.getElementById('pref-search');
  if (search) {
    search.addEventListener('input', () => {
      state.query = search.value;
      state.selected = null;
      render();
      const again = document.getElementById('pref-search');
      if (again) {
        again.focus();
        again.setSelectionRange(again.value.length, again.value.length);
      }
    });
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

app.addEventListener('click', (event) => {
  const rangeBtn = event.target.closest('[data-pop-range]');
  if (rangeBtn) {
    state.popRange = rangeBtn.getAttribute('data-pop-range');
    render();
    return;
  }
  const tradeBtn = event.target.closest('[data-trade]');
  if (tradeBtn) {
    state.trade = tradeBtn.getAttribute('data-trade');
    render();
    return;
  }
  const regionBtn = event.target.closest('[data-region]');
  if (regionBtn) {
    state.region = regionBtn.getAttribute('data-region');
    state.selected = null;
    render();
    return;
  }
  const sortBtn = event.target.closest('[data-sort]');
  if (sortBtn) {
    const key = sortBtn.getAttribute('data-sort');
    if (state.sortKey === key) state.sortDir = -state.sortDir;
    else {
      state.sortKey = key;
      state.sortDir = key === 'name' ? 1 : -1;
    }
    render();
    return;
  }
  const clearBtn = event.target.closest('[data-clear-selected]');
  if (clearBtn) {
    state.selected = null;
    render();
    return;
  }
  const row = event.target.closest('tr[data-pref]');
  if (row) {
    const name = row.getAttribute('data-pref');
    state.selected = state.selected === name ? null : name;
    render();
    const detail = document.getElementById('pref-detail');
    if (detail) detail.scrollIntoView({ block: 'nearest' });
  }
});

window.addEventListener('hashchange', () => {
  state.selected = null;
  render();
});

render();
