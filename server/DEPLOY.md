# 個人帳本同步部署

旅行網站由原本的 GitHub Pages 提供。Cloud Run 處理 Google 登入和帳本讀寫，Cloud Firestore 使用同一 GCP 專案的 `(default)` 資料庫。Firestore 的瀏覽器存取規則維持正式模式，由服務本身驗證使用者並依 Google 帳號 ID 查閱帳本。

1. 在 Google Auth Platform 建立「網頁應用程式」OAuth 用戶端。授權重新導向 URI 是 Cloud Run 服務的 HTTPS 網址加上 `/auth/callback`。帳本只要求確認 Google 帳號身分和電子郵件。
2. 用 Secret Manager 提供 `GOOGLE_OAUTH_CLIENT_SECRET`、`TRIP_SESSION_SECRET` 和 `TRIP_MEMBERS_JSON`。登入工作階段密鑰至少使用 32 個隨機位元組。成員設定使用 `{"account@example.invalid":"Judy"}` 格式，以小寫電子郵件對應到成員姓名。僅填已確認要開放帳本的帳號。
3. 建立專用的 Cloud Run 服務帳戶。給予操作 Firestore 資料所需的 `roles/datastore.user`，並只給予上述個別 Secret 的讀取權限。Cloud Run 使用服務身分連線，不需匯出服務帳戶私鑰。
4. 把此資料夾部署到 Cloud Run。執行階段設定 `TRIP_SITE_URL`、`TRIP_BACKEND_URL`、`GOOGLE_CLOUD_PROJECT`、`GOOGLE_OAUTH_CLIENT_ID`，以及上述三個 Secret。讓瀏覽器能呼叫服務，再由服務驗證各個帳本請求。可使用請求式計費、最少零個執行個體。
5. 驗證 `/health`、匿名讀取拒絕、Google 登入與兩個工作階段的隔離之後，將伺服器網址填入根目錄的 `ledger-cloud-config.js` 並使用既有版本發布流程部署網站。

可用 `npm ci` 和 `npm test` 執行伺服器測試。測試使用受控的登入替身和記憶體帳本，涵蓋不同帳號、重試、鎖定匯率和重複匯入。
