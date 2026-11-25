'use strict';
(() => {
  const releaseNode = document.querySelector('#trip-release');
  if (!releaseNode) return;
  const current = JSON.parse(releaseNode.textContent);
  const offline = document.documentElement.hasAttribute('data-trip-offline');
  const publicSite = 'https://oceanwhileru.github.io/Tokyo-Family-Trip-2027/';
  const reloadParam = '_trip_reload';
  const taipeiTime = new Intl.DateTimeFormat('sv-SE', {
    timeZone:'Asia/Taipei', year:'numeric', month:'2-digit', day:'2-digit',
    hour:'2-digit', minute:'2-digit', second:'2-digit', hourCycle:'h23'
  });
  const locationUrl = new URL(window.location.href);
  if (locationUrl.searchParams.has(reloadParam)) {
    locationUrl.searchParams.delete(reloadParam);
    window.history.replaceState(window.history.state, '', locationUrl);
  }

  let message = '';
  let checking = false;
  let updated = false;
  let requestSequence = 0;
  const freshToken = () => Date.now().toString(36)+'-'+(++requestSequence).toString(36);

  function render() {
    for (const panel of document.querySelectorAll('[data-version-panel]')) {
      if (!panel.firstElementChild) {
        panel.append(document.querySelector('#version-panel-template').content.cloneNode(true));
        panel.querySelector('[data-current-version]').textContent = current.version;
        const time = panel.querySelector('[data-deployed-at]');
        time.dateTime = current.deployedAt;
        time.textContent = taipeiTime.format(new Date(current.deployedAt))+' 台灣時間';
        panel.querySelector('[data-new-offline]').href = publicSite+'#sources';
      }
      panel.querySelector('[data-version-status]').textContent = message;
      panel.querySelector('[data-version-action="check"]').disabled = checking;
      panel.querySelector('[data-new-offline]').hidden = !offline || !updated;
    }
  }

  async function check(manual) {
    if (checking) return;
    checking = true;
    if (manual) message = '正在檢查版本…';
    render();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const endpoint = new URL('version.json', offline ? publicSite : window.location.href);
      endpoint.searchParams.set('_trip_check', freshToken());
      const response = await fetch(endpoint, {
        cache:'no-store', credentials:'omit', signal:controller.signal
      });
      if (!response.ok) throw new Error('Version request failed');
      const latest = await response.json();
      if (!/^V\d+\.\d+\.\d+$/.test(latest?.version ?? '') ||
          !/^v\d+\.\d+\.\d+-[a-f0-9]{12}$/.test(latest?.buildId ?? '') ||
          !latest.buildId.startsWith(latest.version.toLowerCase()+'-') ||
          !Number.isFinite(Date.parse(latest?.deployedAt))) {
        throw new Error('Invalid version metadata');
      }
      updated = latest.buildId !== current.buildId;
      message = updated
        ? '線上版本為 '+latest.version+'。'+(offline ? '請下載新版離線檔。' : '請重新載入以更新。')
        : manual ? '目前使用的是最新版本。' : '';
    } catch {
      if (manual) message = '目前無法檢查版本，請確認網路後重試。';
    } finally {
      clearTimeout(timer);
      checking = false;
      render();
    }
  }

  function reload() {
    if (window.location.protocol === 'file:') {
      window.location.reload();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set(reloadParam, freshToken());
    window.location.replace(url);
  }

  document.addEventListener('click', event => {
    const action = event.target.closest('button[data-version-action]')?.dataset.versionAction;
    if (action === 'check') check(true);
    if (action === 'reload') reload();
  });
  window.TRIP_VERSION = {render};
  render();
  if (!offline) check(false);
})();
