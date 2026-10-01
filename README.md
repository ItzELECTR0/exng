# exng · Electrified

The ELECTRIS **Electrified** theme for SearXNG, including **Orbit**, the cursor follower from ELECTRIS.net.

This branch holds only the theme. It is layered on top of the official `searxng/searxng` image, so there is no SearXNG fork to keep up to date.

## How it works

SearXNG only ships its `simple` theme, so Electrified restyles `simple` in place instead of registering a new theme name:

- `templates/simple/` replaces a small set of upstream templates. Every other template stays upstream.
  - `base.html`: the ELECTRIS navbar and footer, the colour scheme attribute, and loading the theme.
  - `index.html`: the home page hero.
  - `page_with_header.html`: the logo on the info, stats and preferences pages.
  - `preferences/theme.html`: the Orbit settings, added under *User interface*.
- `src/` builds `electris.css` and `electris.js`, which load after SearXNG's own files:
  - `styles/` holds the ELECTRIS tokens and colour schemes. They are mapped onto SearXNG's `--color-*` variables, and the components are restyled from there.
  - `orbit/Orbit.svelte` is a verbatim copy of the component from ELECTRIS.net, and so is `lib/state/hoverConfig.svelte.ts`. The SvelteKit and site-state imports it relies on are replaced by small shims (`shims/navigation.ts`, `lib/state/theme.svelte.ts`, `lib/state/mods.svelte.ts`).
  - `orbit/configs.ts` holds the hover configs for SearXNG's markup: the search box, categories, filters, result cards, image results, answers and infoboxes, pagination, preference controls and the footer.
- `public/` is copied as-is next to the build output (favicon, logo, gear icon).

SearXNG's *Theme style* preference picks the colour scheme: Auto, Light, Dark, or Black, which maps to Midnight.

Orbit settings live in the browser's `localStorage` under the same `electris-mods` key as ELECTRIS.net. They are never sent to the SearXNG server, and the controls stay hidden when JavaScript is off.

## Build

```sh
npm ci
npm run check
npm run build
```

This writes `dist/electris/`.

## Deploy with Podman

### Option A: a thin image on top of the official one (recommended)

```sh
podman build -t localhost/electris-searxng .
```

To pin an upstream version, pass it as a build argument:

```sh
podman build --build-arg SEARXNG_VERSION=2026.6.16-502c820 -t localhost/electris-searxng .
```

Then use `localhost/electris-searxng` wherever you used `docker.io/searxng/searxng`.

### Option B: the official image with bind mounts

Run `npm run build` first, then mount the files into the stock image:

```yaml
services:
  searxng:
    image: docker.io/searxng/searxng:latest
    volumes:
      - ./config:/etc/searxng:Z
      - ./exng-theme/dist/electris:/usr/local/searxng/searx/static/themes/simple/electris:ro,Z
      - ./exng-theme/templates/simple/base.html:/usr/local/searxng/searx/templates/simple/base.html:ro,Z
      - ./exng-theme/templates/simple/index.html:/usr/local/searxng/searx/templates/simple/index.html:ro,Z
      - ./exng-theme/templates/simple/page_with_header.html:/usr/local/searxng/searx/templates/simple/page_with_header.html:ro,Z
      - ./exng-theme/templates/simple/preferences/theme.html:/usr/local/searxng/searx/templates/simple/preferences/theme.html:ro,Z
```

Keep `ui.default_theme: simple` (the default) in `settings.yml`.

## Keeping up with upstream

Only the four overridden templates can drift from SearXNG. After updating the image, compare each one against the new upstream version:

```sh
git diff <old-tag> <new-tag> -- searx/templates/simple/base.html searx/templates/simple/index.html searx/templates/simple/page_with_header.html searx/templates/simple/preferences/theme.html
```

Run this in a checkout of SearXNG (e.g. this repository's `master`). Then carry any upstream changes into `templates/simple/`.

To bring Orbit up to date with ELECTRIS.net, copy `src/lib/components/layout/Orbit.svelte` and `src/lib/state/hoverConfig.svelte.ts` over the copies in `src/`. Then run `npm run check`.

## Licence

The templates are derived from SearXNG's and are licensed under the AGPL-3.0-or-later, as is the rest of this branch (see `LICENSE`). Orbit and the fonts and icons come from ELECTRIS.net.
