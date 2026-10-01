// SearXNG navigates with full page loads, so the only "navigations" Orbit can observe are the
// initial mount (which SvelteKit's afterNavigate also reports) and a back/forward cache restore.
export function afterNavigate(callback: () => void) {
  callback();
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) callback();
  });
}
