# PROJECT CONTEXT — XLS to CSV Normalizer

## Descripción
Aplicación web que convierte archivos Excel (.xls/.xlsx) a CSV normalizado, listo para bases de datos.

## Stack
- **Backend:** Node.js, Express, multer, xlsx, csv-writer
- **Frontend:** React 18, Vite 5, Axios

## Estructura

```
xlstocsv/
├── backend/
│   ├── src/
│   │   ├── index.js              # Entry point Express
│   │   ├── controllers/
│   │   │   └── convertController.js
│   │   ├── services/
│   │   │   └── conversionService.js
│   │   ├── utils/
│   │   │   └── normalizer.js     # Funciones de normalización
│   │   ├── routes/
│   │   │   └── convertRoutes.js
│   │   └── middlewares/
│   │       └── uploadMiddleware.js
│   ├── uploads/                   # Archivos subidos (temporal)
│   ├── outputs/                   # CSV generados
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   └── FileUploader.jsx
│   │   ├── pages/
│   │   │   └── HomePage.jsx
│   │   └── services/
│   │       └── api.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── PROJECT_CONTEXT.md
├── README.md
└── LICENSE
```

## API

### POST `/api/convert`
- **Body:** FormData con campo `file` (archivo .xls/.xlsx)
- **Response:** `{ success: true, downloadUrl: "/outputs/file.csv" }`

## Normalización aplicada
- Tildes eliminadas (`José → jose`)
- Encabezados: `Nombre Completo → nombre_completo`
- Fechas: `DD/MM/YYYY → YYYY-MM-DD`
- Números: `1.234,56 → 1234.56`
- Strings: trim + lowercase

## Comandos
- Backend: `cd backend && npm run dev` (puerto 3000)
- Frontend: `cd frontend && npm run dev` (puerto 5173)
