# 📊 XLS to CSV Normalizer

A full-stack web application that converts Excel files (`.xls`, `.xlsx`) into **clean, normalized CSV** files ready for database imports, ETL pipelines, and data processing.

Upload a spreadsheet, configure normalization rules globally or per column, preview the transformed data, and download the result — all from a modern, responsive UI with dark mode support.

---

## ✨ Features

- **Drag & drop** file upload with support for `.xls` and `.xlsx` (up to 10 MB)
- **Global normalization options** — toggle on/off individually:
  - Remove accents (`José García → jose garcia`)
  - Normalize headers to `snake_case` (`Full Name → full_name`)
  - Standardize dates to ISO format (`25/03/2026 → 2026-03-25`)
  - Normalize numbers from Spanish to international format (`1.234,56 → 1234.56`)
  - Clean text — trim whitespace and convert to lowercase
- **Per-column rules** — override global settings on specific columns with granular control (lowercase, uppercase, dates, numbers, accents, or no changes)
- **Presets** — apply common rule combinations to all columns at once (Clean text, Dates only, Numbers only)
- **Live data preview** — inspect the first 10 rows of normalized output before downloading
- **Dark / Light theme** — toggleable with system preference detection and `localStorage` persistence
- **Auto-scroll** — result card appears at the top of the page after conversion

---

## 🛠️ Tech Stack

### Backend

| Package | Purpose |
|---------|---------|
| **Node.js** + **Express** | HTTP server and REST API |
| **multer** | Multipart file upload handling |
| **xlsx** | Excel file parsing |
| **csv-writer** | CSV generation |
| **cors** | Cross-origin resource sharing |

### Frontend

| Package | Purpose |
|---------|---------|
| **React 18** | UI framework |
| **Vite 5** | Dev server and build tool |
| **Axios** | HTTP client |

---

## 📁 Project Structure

```
xlstocsv/
├── backend/
│   ├── src/
│   │   ├── index.js                  # Express entry point
│   │   ├── controllers/
│   │   │   └── convertController.js  # Request handlers (analyze, convert)
│   │   ├── services/
│   │   │   └── conversionService.js  # Excel parsing & CSV generation logic
│   │   ├── utils/
│   │   │   └── normalizer.js         # Normalization functions
│   │   ├── routes/
│   │   │   └── convertRoutes.js      # API route definitions
│   │   └── middlewares/
│   │       └── uploadMiddleware.js   # Multer config (disk storage, file filter)
│   ├── uploads/                      # Temporary uploaded files
│   ├── outputs/                      # Generated CSV files
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # React entry point
│   │   ├── styles.css                # Full stylesheet (light + dark themes)
│   │   ├── components/
│   │   │   ├── FileUploader.jsx      # Drag & drop upload zone
│   │   │   ├── NormalizationOptions.jsx  # Global toggle switches
│   │   │   ├── ColumnRulesEditor.jsx # Per-column rule chips & presets
│   │   │   ├── DataPreview.jsx       # Post-conversion data table
│   │   │   ├── ResultCard.jsx        # Success card with download link
│   │   │   └── ThemeToggle.jsx       # Dark/light theme switcher
│   │   ├── pages/
│   │   │   └── HomePage.jsx          # Main page (state & layout)
│   │   └── services/
│   │       └── api.js                # Axios API client
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── LICENSE
├── PROJECT_CONTEXT.md
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (v20 LTS recommended)
- **npm** v9+

### 1. Clone the repository

```bash
git clone https://github.com/DanielEpinosaAlberti/xlstocsv.git
cd xlstocsv
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install
mkdir -p uploads outputs

# Frontend
cd ../frontend
npm install
```

### 3. Run in development mode

Open two terminals:

```bash
# Terminal 1 — Backend (port 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 API Reference

### `POST /api/analyze`

Analyzes an Excel file and returns its structure.

**Request:** `multipart/form-data` with a `file` field.

**Response:**

```json
{
  "success": true,
  "headers": ["Name", "Date", "Amount"],
  "sampleRows": [{ "Name": "José", "Date": "25/03/2026", "Amount": "1.234,56" }],
  "totalRows": 150
}
```

### `POST /api/convert`

Converts an Excel file to normalized CSV.

**Request:** `multipart/form-data` with:

| Field | Type | Description |
|-------|------|-------------|
| `file` | File | `.xls` or `.xlsx` file |
| `options` | JSON string | Global normalization flags |
| `columnRules` | JSON string | Per-column rule overrides |

**Options object:**

```json
{
  "removeAccents": true,
  "normalizeHeaders": true,
  "standardizeDates": true,
  "normalizeNumbers": true,
  "trimLowercase": true
}
```

**Column rules object:**

```json
{
  "Column Name": ["removeAccents", "trimLowercase"],
  "Date Column": ["standardizeDates"],
  "ID Column": ["none"]
}
```

Available rules: `removeAccents`, `trimLowercase`, `uppercase`, `standardizeDates`, `normalizeNumbers`, `none`

**Response:**

```json
{
  "success": true,
  "downloadUrl": "/outputs/filename_1711180800000.csv",
  "preview": {
    "headers": ["name", "date", "amount"],
    "rows": [{ "name": "jose", "date": "2026-03-25", "amount": "1234.56" }],
    "totalRows": 150
  }
}
```

---

## 🌐 Production Deployment

The backend serves the compiled frontend in production. No separate web server is needed for the React app.

```bash
# Build the frontend
cd frontend
npm run build

# Start the backend (serves API + static frontend)
cd ../backend
npm start
```

For a full deployment with **Nginx** as a reverse proxy and **PM2** as a process manager:

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the app
cd backend
pm2 start src/index.js --name xlstocsv
pm2 save
pm2 startup
```

Nginx config:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    client_max_body_size 15M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🗺️ Roadmap

- [x] **v1** — Excel to CSV conversion with automatic normalization
- [x] **v2 (partial)** — Drag & drop, data preview, per-column rules, dark theme
- [ ] **v2 (remaining)** — Advanced validations, error recovery
- [ ] **v3** — User authentication (JWT), conversion history, public API
- [ ] **v4** — Async processing (job queues), large file support, SaaS features

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request