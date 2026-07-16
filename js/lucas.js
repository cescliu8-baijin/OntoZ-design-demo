// OntoZ root source module.

const lucasState = {
  assets: []
};

function getLucasRows() {
  return Array.from(document.querySelectorAll('#lucasCheckList [data-lucas-module]'));
}

function updateLucasProgress() {
  const rows = getLucasRows();
  const passed = rows.filter(row => row.classList.contains('is-passed')).length;
  const total = rows.length || 4;
  document.querySelector('#lucasPassedCount').textContent = String(passed);
  document.querySelector('#lucasProgressBar').style.width = `${Math.round((passed / total) * 100)}%`;
  document.querySelector('#lucasProgressCopy').textContent = passed === total
    ? '4 个模块已通过，可以生成网站草稿。'
    : `还有 ${total - passed} 个模块未通过，生成前建议先补齐。`;
  document.querySelector('#lucasPreviewStatus').textContent = passed === total ? '可生成' : '等待资料';
}

function completeLucasModule(row) {
  if (!row || row.classList.contains('is-passed')) return;
  const moduleName = row.dataset.lucasModule;
  row.classList.add('is-passed');
  row.querySelector('button').classList.remove('needed');
  row.querySelector('button').textContent = '已通过';
  showToast(`已补齐「${moduleName}」`);
  updateLucasProgress();
}

function addLucasAsset(asset) {
  lucasState.assets.push(asset);
  const list = document.querySelector('#lucasAssetList');
  list.insertAdjacentHTML('afterbegin', `
    <article>
      <span><i data-lucide="file-image"></i>${escapeHTML(asset.name)}</span>
      <strong>${escapeHTML(asset.type)}</strong>
    </article>
  `);
  document.querySelector('#lucasAssetCount').textContent = String(lucasState.assets.length);
  document.querySelector('#lucasAssetSummary span').textContent = '已记录当前 demo 建站素材';
  refreshIcons();
}

function resetLucasMaterialForm() {
  document.querySelector('#lucasMaterialType').value = '';
  document.querySelector('#lucasMaterialFiles').value = '';
  document.querySelector('#lucasFileSummary').textContent = '未选择任何文件';
  document.querySelectorAll('[data-material-type]').forEach(button => button.classList.remove('active'));
}

function openLucasMaterialModal() {
  const modal = document.querySelector('#lucasMaterialModal');
  modal.hidden = false;
  document.body.classList.add('modal-open');
  resetLucasMaterialForm();
  refreshIcons();
  window.setTimeout(() => document.querySelector('#lucasMaterialType').focus(), 0);
}

function closeLucasMaterialModal() {
  const modal = document.querySelector('#lucasMaterialModal');
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

function updateLucasFileSummary() {
  const input = document.querySelector('#lucasMaterialFiles');
  const files = Array.from(input.files || []);
  const summary = document.querySelector('#lucasFileSummary');
  if (!files.length) {
    summary.textContent = '未选择任何文件';
    return;
  }
  summary.textContent = files.length === 1 ? files[0].name : `已选择 ${files.length} 个文件`;
}

function saveLucasMaterials() {
  const typeInput = document.querySelector('#lucasMaterialType');
  const fileInput = document.querySelector('#lucasMaterialFiles');
  const materialType = typeInput.value.trim() || '未分类素材';
  const files = Array.from(fileInput.files || []);
  if (!files.length) {
    showToast('请选择图片文件');
    fileInput.focus();
    return;
  }
  files.forEach(file => {
    addLucasAsset({ name: file.name, type: materialType });
  });
  closeLucasMaterialModal();
  showToast(`已保存 ${files.length} 个「${materialType}」`);
}

function generateLucasSite() {
  const rows = getLucasRows();
  const pendingRows = rows.filter(row => !row.classList.contains('is-passed'));
  if (pendingRows.length) {
    showToast(`还差 ${pendingRows.length} 个资料模块，请先补齐`);
    pendingRows[0].querySelector('button')?.focus();
    return;
  }
  document.querySelector('#lucasPreviewStatus').textContent = '草稿已生成';
  document.querySelector('#lucasPreviewCopy').textContent = '面向海外采购商的专业独立站草稿已生成：首屏突出企业实力、主推产品、认证背书和询盘入口。';
  showToast('Lucas 已生成网站草稿');
}

document.querySelector('#lucasCheckList')?.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const row = button.closest('[data-lucas-module]');
  if (row.classList.contains('is-passed')) {
    showToast(`「${row.dataset.lucasModule}」已通过`);
    return;
  }
  completeLucasModule(row);
});

document.querySelector('#lucasUploadHero')?.addEventListener('click', openLucasMaterialModal);
document.querySelector('#lucasUploadZone')?.addEventListener('click', openLucasMaterialModal);
document.querySelector('#lucasGenerateSite')?.addEventListener('click', generateLucasSite);
document.querySelector('#lucasOpenKnowledge')?.addEventListener('click', () => {
  showToast('已打开企业知识库资料视图');
});
document.querySelector('#lucasRefreshAudit')?.addEventListener('click', event => {
  const button = event.currentTarget;
  button.classList.add('loading');
  showToast('Lucas 已重新检测知识库资料');
  window.setTimeout(() => button.classList.remove('loading'), 500);
  updateLucasProgress();
});
document.querySelector('#lucasMaterialClose')?.addEventListener('click', closeLucasMaterialModal);
document.querySelector('#lucasMaterialCancel')?.addEventListener('click', closeLucasMaterialModal);
document.querySelector('#lucasMaterialSave')?.addEventListener('click', saveLucasMaterials);
document.querySelector('#lucasMaterialFiles')?.addEventListener('change', updateLucasFileSummary);
document.querySelector('#lucasMaterialModal')?.addEventListener('click', event => {
  if (event.target.id === 'lucasMaterialModal') closeLucasMaterialModal();
});
document.querySelectorAll('[data-material-type]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-material-type]').forEach(item => item.classList.toggle('active', item === button));
    document.querySelector('#lucasMaterialType').value = button.dataset.materialType;
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !document.querySelector('#lucasMaterialModal')?.hidden) {
    closeLucasMaterialModal();
  }
});
updateLucasProgress();
