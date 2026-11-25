# Tokyo Family Trip 2027｜東京家族旅行

2027/01/24–01/28 的手機版家庭旅行助手。使用原生 HTML、CSS 和 JavaScript。行程、交通、住宿與店家資料分別在 `data.js` 和 `transport.js`。網站資料與圖片來源位於「資料與離線」。

## 開啟

- 網頁版從本機伺服器開啟。在這個專案資料夾執行 `python3 -m http.server 8765 --bind 127.0.0.1`，再開啟 [本機網站](http://127.0.0.1:8765/)。
- 離線版雙擊 `Tokyo-Family-Trip-2027-offline.html`。照片與程式已內嵌。地圖、官網、天氣與匯率更新需要網路。
- 清單、收藏、待辦、活動完成與費用按使用者存在目前瀏覽器。可從旅行工具匯出購物 CSV。網頁版和本機檔由瀏覽器分別保存。

## 維護與部署

1. 修改 `index.template.html`、`styles.css` 或相關 JavaScript。先在 `CHANGELOG.md` 新增下一個版本與更新內容。
2. 發版時執行 `node scripts/release.mjs V2.0.2`（換成實際版本）。程式記錄當下的 UTC 發版建置時間，頁面統一以台灣時間顯示。它同時產生 `index.html`、`version.json`、版本專屬資源與單檔離線版。
3. 執行 `node --test scripts/verify.mjs`。將程式、更新紀錄、發版檔案與新的 `releases/` 子目錄一起提交並推送至 `main`。GitHub Pages 從 `main` 的根目錄部署。平時保留舊發版目錄，讓仍快取舊 HTML 的瀏覽器取用同版資源。需要撤下內容時，也將含有該內容的舊發版目錄移出網站。
4. 確認正式網站和 `version.json` 都顯示新版本。需要重建本次離線檔時，可執行 `node scripts/build-offline.mjs`。

個人儲存鍵為 `tokyo-family-trip-2027.v1`。網站版本與資料格式各自管理。若未來調整資料格式，先將舊 JSON 複製到帶版本的備份鍵，驗證遷移結果後再寫入，並保留可還原的備份。

主要查核日期為 2026/11/25。未來日期的報價、訂位、冬胎、營業與道路按頁面狀態及業者回覆複核。網站使用 Open-Meteo 天氣模型和 Frankfurter 參考匯率，定位須由使用者主動授權。

公共網站的行程、照片與前端檔案可被有連結的人看到。訂房代碼、地址細節、證件或付款資料應留在私人訂單與裝置。
