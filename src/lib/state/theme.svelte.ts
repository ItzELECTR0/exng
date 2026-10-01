export type Theme = 'default' | 'cyber-neotic';

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'cyber-neotic' ? 'cyber-neotic' : 'default';
}

export const themeState = $state({ theme: readTheme() });
