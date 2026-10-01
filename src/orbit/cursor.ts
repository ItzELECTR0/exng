const STORAGE_KEY = 'electris-orbit-cursor';

// Every search is a full page load, which would otherwise leave Orbit hidden until the
// mouse moves again. The last pointer position is carried over so it spawns straight away.
export function carryCursorAcrossPages() {
  const pointer = { x: -1, y: -1 };

  window.addEventListener('mousemove', (event) => {
    if (!event.isTrusted) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });

  window.addEventListener('pagehide', () => {
    if (pointer.x < 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pointer));
    } catch {
      // Storage can be unavailable in private modes; Orbit then waits for the next move.
    }
  });

  let saved: { x: number, y: number } | null = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    saved = null;
  }

  if (!saved || !window.matchMedia('(any-pointer: fine)').matches) return;
  const { x, y } = saved;
  requestAnimationFrame(() => {
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y }));
  });
}
