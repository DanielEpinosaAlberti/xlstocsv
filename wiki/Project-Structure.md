# Project Structure

## Root

- `README.md`: Public project documentation.
- `CONTRIBUTING.md`: Contribution guidelines.
- `preguntas.md`: English Q&A document for project evaluation.
- `backend/`: Server-side conversion logic.
- `frontend/`: React user interface.
- `wiki/`: Internal wiki pages for the project.

## Backend

- `backend/src/index.js`: Express entry point.
- `backend/src/controllers/convertController.js`: Request handlers for analyze and convert endpoints.
- `backend/src/routes/convertRoutes.js`: API route definitions.
- `backend/src/services/conversionService.js`: Excel parsing and CSV generation logic.
- `backend/src/utils/normalizer.js`: Normalization helpers.
- `backend/src/middlewares/uploadMiddleware.js`: Multer configuration.
- `backend/uploads/`: Temporary uploaded files.
- `backend/outputs/`: Generated CSV files.

## Frontend

- `frontend/src/main.jsx`: React entry point.
- `frontend/src/App.jsx`: Root application component.
- `frontend/src/pages/HomePage.jsx`: Main page and state orchestration.
- `frontend/src/components/`: UI components for upload, options, previews, results, and theme control.
- `frontend/src/services/api.js`: HTTP client used to call the backend.
