const tabsEl = document.getElementById("tabs");
const viewContainer = document.getElementById("view-container");
const urlInput = document.getElementById("urlInput");
const menu = document.getElementById("menu");

let tabs = [];
let currentTabId = null;

function encodeUrl(url) {
  return btoa(url);
}

function createTab(url = "https://example.com") {
  const id = Date.now();

  const tab = document.createElement("div");
  tab.className = "tab";
  tab.textContent = "New Tab";
  tab.onclick = () => switchTab(id);
  tabsEl.appendChild(tab);

  const view = document.createElement("iframe");
  view.className = "webview";
  viewContainer.appendChild(view);

  tabs.push({ id, tab, view });
  switchTab(id);
  loadURL(url);
}

function switchTab(id) {
  currentTabId = id;
  tabs.forEach(t => {
    t.tab.classList.toggle("active", t.id === id);
    t.view.classList.toggle("active", t.id === id);
  });
}

function getCurrentView() {
  return tabs.find(t => t.id === currentTabId).view;
}

function loadURL(input) {
  let url = input || urlInput.value;

  if (!url.startsWith("http")) {
    url = "https://www.google.com/search?q=" + encodeURIComponent(url);
  }

  const encoded = encodeUrl(url);
  const proxyURL = `/proxy/${encoded}`;

  const view = getCurrentView();
  view.src = proxyURL;
  urlInput.value = url;

  const tab = tabs.find(t => t.id === currentTabId);
  tab.tab.textContent = new URL(url).hostname;
}

function goBack() { getCurrentView().contentWindow.history.back(); }
function goForward() { getCurrentView().contentWindow.history.forward(); }
function reload() { getCurrentView().contentWindow.location.reload(); }

urlInput.addEventListener("keydown", e => {
  if (e.key === "Enter") loadURL();
});

document.getElementById("newTabBtn").onclick = () => createTab();
document.getElementById("menuBtn").onclick = () => menu.classList.toggle("hidden");

createTab();
