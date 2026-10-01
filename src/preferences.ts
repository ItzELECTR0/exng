import { modsState, type SiteModsConfig } from '$lib/state/mods.svelte';

type ToggleKey = 'enableOrbit' | 'adaptiveOrbitColor';

// The Orbit fieldsets in preferences/theme.html are client-side only: they carry no `name`,
// so SearXNG never submits them, and they stay hidden for visitors without JavaScript.
export function bindOrbitPreferences() {
  const fieldsets = document.querySelectorAll<HTMLElement>('[data-orbit-preference]');
  if (fieldsets.length === 0) return;

  fieldsets.forEach((fieldset) => {
    fieldset.hidden = false;
  });

  document.querySelectorAll<HTMLInputElement>('input[data-orbit-toggle]').forEach((input) => {
    const key = input.dataset.orbitToggle as ToggleKey;
    input.checked = modsState.config.site[key];
    input.addEventListener('change', () => {
      modsState.updateSetting('site', key, input.checked);
    });
  });

  const spacing = document.querySelector<HTMLInputElement>('input[data-orbit-spacing]');
  const spacingValue = document.querySelector<HTMLOutputElement>('output[data-orbit-spacing-value]');
  if (!spacing) return;

  const render = (value: SiteModsConfig['textWrapSpacing']) => {
    spacing.value = String(value);
    if (spacingValue) spacingValue.value = value.toFixed(2);
  };

  render(modsState.config.site.textWrapSpacing);
  spacing.addEventListener('input', () => {
    const value = Math.round(Number(spacing.value) * 100) / 100;
    modsState.updateSetting('site', 'textWrapSpacing', value);
    render(value);
  });
}
