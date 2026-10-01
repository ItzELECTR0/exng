import type { HoverConfig } from '$lib/state/hoverConfig.svelte';

export const searxngHoverConfigs: HoverConfig[] = [
  {
    type: ['a'],
    selectors: ['.nav-button'],
    className: 'hovered-word-wrap',
    lockPosition: true,
    wrapText: {
      sentences: true
    }
  },
  {
    selectors: ['.settings-button'],
    className: 'hovered-settings',
    lockPosition: true,
    absoluteSizeOffset: 3.5,
    absoluteBorderRadiusOffset: 5,
    customPositioning: {
      targetSelector: '.settings-icon'
    }
  },
  {
    selectors: ['.search_box'],
    className: 'hovered-search',
    lockPosition: true,
    dynamicSizeOffset: 0.2,
    dynamicBorderRadiusOffset: 0.2
  },
  {
    selectors: ['.category_checkbox label', 'button.category_button'],
    className: 'hovered-category',
    lockPosition: true,
    preventRotation: true,
    dynamicSizeOffset: 0.5
  },
  {
    selectors: ['.search_filters select'],
    className: 'hovered-filter',
    lockPosition: true,
    preventRotation: true,
    dynamicSizeOffset: 0.4
  },
  {
    selectors: {
      include: ['#urls .result'],
      exclude: ['.result-images']
    },
    className: 'hovered-result',
    lockPosition: true,
    preventRotation: true,
    color: 'var(--accent)'
  },
  {
    selectors: ['.result-images'],
    className: 'hovered-result-image',
    lockPosition: true,
    preventRotation: true,
    dynamicSizeOffset: 0.4,
    color: 'color-mix(in srgb, var(--accent) 70%, var(--brand-electro) 30%)'
  },
  {
    selectors: ['#answers', '#sidebar .infobox'],
    className: 'hovered-panel',
    lockPosition: true,
    preventRotation: true,
    color: 'color-mix(in srgb, var(--accent) 68%, var(--brand-electris) 32%)'
  },
  {
    selectors: [
      '#suggestions input[type="submit"]',
      '#corrections input[type="submit"]',
      '#apis input[type="submit"]',
      '#search_url button',
      '.result .altlink a',
      '.result .cache_link',
      '.result .proxyfied_link'
    ],
    className: 'hovered-chip',
    lockPosition: true,
    preventRotation: true,
    dynamicSizeOffset: 0.4
  },
  {
    selectors: ['#pagination button', '.numbered_pagination input'],
    className: 'hovered-page-button',
    lockPosition: true,
    preventRotation: true,
    dynamicSizeOffset: 0.5,
    color: 'color-mix(in srgb, var(--brand-electro) 40%, var(--accent) 60%)'
  },
  {
    selectors: ['#backToTop'],
    className: 'hovered-button-grow',
    lockPosition: true,
    shape: 'circle',
    dynamicSizeOffset: 0.6
  },
  {
    selectors: ['.tabs > label', 'ul.tabs a'],
    className: 'hovered-tab',
    lockPosition: true,
    preventRotation: true,
    dynamicSizeOffset: 0.3
  },
  {
    selectors: [
      '#search_form select',
      '#search_form .checkbox-onoff',
      '#search_form input[type="checkbox"]',
      '#search_form input[type="submit"]',
      '#search_form input[type="range"]',
      '.preferences_back a',
      'input[type="submit"].button',
      'a.button'
    ],
    className: 'hovered-control',
    lockPosition: true,
    preventRotation: true,
    dynamicSizeOffset: 0.4
  },
  {
    selectors: ['footer'],
    className: 'hovered-hamburger-footer',
    lockPosition: true,
    preventRotation: true,
    color: 'var(--circle-hover-footer)',
    dynamicSizeOffset: 0.6,
    absoluteBorderRadiusOffset: 1.2,
    trackingTarget: '.footer-card'
  }
];

export const wrapExclusions = [
  '#search_header',
  '.search_filters',
  '#urls .result',
  '#answers',
  '#sidebar .infobox',
  '#pagination',
  '#backToTop',
  '.tabs > label',
  'ul.tabs',
  'footer'
];
