import { wrapExclusions } from './configs';

// ELECTRIS.net marks its cards in markup; SearXNG's templates are left untouched, so the
// same marker class is applied here, including to results that load in after the page.
const MARKER = 'wrap-no-interact-all';
const selector = wrapExclusions.join(', ');

function mark(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(selector).forEach((element) => element.classList.add(MARKER));
}

export function markWrapExclusions() {
  mark(document);

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(selector)) node.classList.add(MARKER);
        mark(node);
      });
    }
  }).observe(document.body, { childList: true, subtree: true });
}
