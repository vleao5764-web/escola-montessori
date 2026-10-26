// Refresh lists only. Never discard contact edits or unsubmitted filters.
(() => {
  const filters = document.querySelector('[data-filters]');
  if (!filters) return;
  let dirty = false;
  filters.addEventListener('input', () => { dirty = true; });
  setInterval(() => {
    const control = document.activeElement;
    if (dirty || document.hidden || (control && /^(INPUT|SELECT|TEXTAREA)$/.test(control.tagName))) return;
    location.reload();
  }, 30000);
})();
