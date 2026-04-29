# Getting Started

## Requirements

- Node.js 18 or later
- npm 9 or later

## Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run locally

Open two terminals:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

The frontend usually runs at `http://localhost:5173` and the backend at `http://localhost:3000`.

## Recommended workflow

1. Upload an Excel file.
2. Configure global normalization options.
3. Adjust per-column rules if needed.
4. Review the preview.
5. Download the generated CSV.
