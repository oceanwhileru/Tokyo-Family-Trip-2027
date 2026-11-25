# Tokyo Family Trip 2027｜東京家族旅行

2027/01/24–01/28 的手機版家庭旅行助手。使用原生 HTML、CSS 和 JavaScript。行程、交通、住宿與店家資料分別在 `data.js` 和 `transport.js`。網站資料與圖片來源位於「資料與離線」。

## 開啟

- 網頁版從本機伺服器開啟。在這個專案資料夾執行 `python3 -m http.server 8765 --bind 127.0.0.1`，再開啟 [本機網站](http://127.0.0.1:8765/)。
- 離線版雙擊 `Tokyo-Family-Trip-2027-offline.html`。照片與程式已內嵌。地圖、官網、天氣與匯率更新需要網路。
- 清單、收藏、待辦、活動完成與費用按使用者存在目前瀏覽器。可從旅行工具匯出購物 CSV。網頁版和本機檔由瀏覽器分別保存。

## 維護與部署

執行 `node scripts/build-offline.mjs` 重建單檔，再執行 `node --test scripts/verify.mjs`。GitHub Pages 從 `main` 的 `/(root)` 發佈，保留根目錄 `.nojekyll`。

主要查核日期為 2026/11/25。未來日期的報價、訂位、冬胎、營業與道路按頁面狀態及業者回覆複核。網站使用 Open-Meteo 天氣模型和 Frankfurter 參考匯率，定位須由使用者主動授權。

公共網站的行程、照片與前端檔案可被有連結的人看到。訂房代碼、地址細節、證件或付款資料應留在私人訂單與裝置。
