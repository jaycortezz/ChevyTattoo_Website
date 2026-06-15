# Work gallery — Google Drive auto-feed

The Work section can display **every photo in a shared Google Drive folder,
automatically**. The artist just drops images into the folder and they appear
on the site — no uploads to the website, no code changes.

This needs two values pasted into `js/main.js` (top of the gallery section):

```js
const DRIVE_FOLDER_ID = "";   // from the folder's URL
const DRIVE_API_KEY   = "";   // Google Cloud API key (Drive API enabled)
```

Leave them blank and the grid falls back to local images in `assets/work/`.

---

## One-time setup (~5 minutes)

### 1. Make the Drive folder
1. In Google Drive, create a folder, e.g. **"Cortez Tattoos — Website Photos"**.
2. Right-click it → **Share** → **General access** → **Anyone with the link**
   → role **Viewer**. (Images must be public to display on the site.)
3. Open the folder. The URL looks like:
   `https://drive.google.com/drive/folders/`**`1A2b3C4d5E6f7G8h9I`**
   The bold part is your **folder ID**.
4. Share that folder link with the artist — they upload whenever they want.

### 2. Get a Google API key
1. Go to <https://console.cloud.google.com/> and create a project (free).
2. **APIs & Services → Library** → search **"Google Drive API"** → **Enable**.
3. **APIs & Services → Credentials → Create credentials → API key**. Copy it.
4. (Recommended) Click the key → **Restrict key**:
   - **Application restrictions → HTTP referrers**, add:
     `https://jaycortezz.github.io/*`
   - **API restrictions → Restrict key → Google Drive API**.

### 3. Plug the values in
Paste the folder ID and API key into the two constants in `js/main.js`, commit
to `main`, and the site redeploys with the live folder. (Or just send me the
two values and I'll wire them in.)

---

## Notes
- The grid shows the **24 most recent** images, newest first (adjustable).
- Supported: standard image files (JPG/PNG/WebP). Aim for ~1200–1600px on the
  long edge so the page stays fast.
- The API key is read-only and referrer-locked, so exposing it in the page is
  safe for public files.
- If Drive is unreachable for any reason, the site automatically falls back to
  `assets/work/` images, then to the generated placeholders — it never breaks.
