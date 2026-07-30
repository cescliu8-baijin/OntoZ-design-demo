// Enterprise ontology overview interactions.

document.querySelectorAll('[data-ontology-module]').forEach(moduleLink => {
  moduleLink.addEventListener('click', event => {
    if (moduleLink.dataset.ontologyReady === 'true') return;
    event.preventDefault();
    const moduleName = moduleLink.dataset.ontologyModule;
    showToast(`${moduleName}二级页面将在后续版本中补充`, 2200);
  });
});
