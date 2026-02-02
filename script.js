const view = document.getElementById("view");
const urlInput = document.getElementById("urlInput");

const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const reloadBtn = document.getElementById("reloadBtn");
const goBtn = document.getElementById("goBtn");

// 🔐 URLをBase64エンコード（サーバー側と合わせる）
function encodeUrl(url) {
  return btoa(url);
}

// 🌍 プロキシ経由で読み込む
function loadURL(url) {
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  const encoded = encodeUrl(url);
  view.src = `/proxy/${encoded}`;  // ← 後で作るサーバー側ルート
  urlInput.value = url;
}

// Enterキーで移動
urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") loadURL(urlInput.value);
});

goBtn.onclick = () => loadURL(urlInput.value);

// ナビゲーション（iframe履歴は制限あり）
backBtn.onclick = () => view.contentWindow.history.back();
forwardBtn.onclick = () => view.contentWindow.history.forward();
reloadBtn.onclick = () => view.contentWindow.location.reload();

// 最初のページ
loadURL("https://example.com");
