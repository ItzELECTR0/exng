export interface SiteModsConfig {
  enableOrbit: boolean;
  textWrapSpacing: number;
  adaptiveOrbitColor: boolean;
}

export interface ModsConfig {
  site: SiteModsConfig;
}

export const MODS_STORAGE_KEY = 'electris-mods';

const DEFAULT_SITE_MODS: SiteModsConfig = {
  enableOrbit: true,
  textWrapSpacing: 0.69,
  adaptiveOrbitColor: true
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function readBoolean(value: unknown, fallback: boolean) {
  return typeof value === 'boolean' ? value : fallback;
}

function readFloat(value: unknown, fallback: number, min: number, max: number) {
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function readStoredMods(): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(MODS_STORAGE_KEY) || '{}');
    return isRecord(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function readSiteMods(): SiteModsConfig {
  const site = readStoredMods().site;
  const config = { ...DEFAULT_SITE_MODS };
  if (!isRecord(site)) return config;

  config.enableOrbit = readBoolean(site.enableOrbit, config.enableOrbit);
  config.textWrapSpacing = readFloat(site.textWrapSpacing, config.textWrapSpacing, 0.1, 1);
  config.adaptiveOrbitColor = readBoolean(site.adaptiveOrbitColor, config.adaptiveOrbitColor);
  return config;
}

class ModsState {
  config = $state<ModsConfig>({ site: readSiteMods() });

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === MODS_STORAGE_KEY) {
        this.config.site = readSiteMods();
        window.dispatchEvent(new CustomEvent('modsChanged', { detail: this.config }));
      }
    });
  }

  updateSetting<Key extends keyof SiteModsConfig>(section: 'site', key: Key, value: SiteModsConfig[Key]) {
    this.config[section][key] = value;

    try {
      const stored = readStoredMods();
      const site = isRecord(stored.site) ? stored.site : {};
      localStorage.setItem(MODS_STORAGE_KEY, JSON.stringify({ ...stored, site: { ...site, [key]: value } }));
    } catch (error) {
      console.warn('Failed to save mods config:', error);
    }

    window.dispatchEvent(new CustomEvent('modsChanged', { detail: this.config }));
  }
}

export const modsState = new ModsState();
