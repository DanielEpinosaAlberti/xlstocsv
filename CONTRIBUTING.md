# Contributing to XLS to CSV Normalizer

Thanks for contributing. This project converts Excel files into normalized CSV using a Node.js backend and a React + Vite frontend.

## Before You Start

- Use Node.js 18 or later and npm 9 or later.
- Work from the repository root.
- Do not commit temporary files generated in `backend/uploads/` or `backend/outputs/`.

## Local Setup

1. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

3. Start both services in development mode:

   ```bash
   # Terminal 1
   cd backend
   npm run dev

   # Terminal 2
   cd frontend
   npm run dev
   ```

The frontend usually runs at `http://localhost:5173` and the backend at `http://localhost:3000`.

## Workflow

- Create a descriptive branch for each change.
- Keep changes focused on one improvement or fix.
- If you change the API, update the frontend and the README when needed.
- If you add or adjust normalization, review both the backend logic and the frontend preview.

## Code Style

- Follow the existing style in the file you are touching.
- Prefer small, readable functions.
- Avoid adding new dependencies unless they provide clear value.
- Use explicit names for options, rules, and transformations.

## Validation

There is no documented automated test suite in this repository, so validate manually before opening a PR:

- Run the backend and frontend in development mode.
- Test with a real `.xls` or `.xlsx` file.
- Verify that the preview matches the generated CSV.
- Confirm the download works and that changes do not break dark mode or the per-column rules editor.

If your change affects the frontend build, run:

```bash
cd frontend
npm run build
```

## Pull Requests

Include the following in your PR:

- What problem the change solves.
- Which part of the flow it affects: analysis, conversion, normalization, UI, or download.
- How you validated it.
- Screenshots or examples if you changed the interface.

## Commit Guidance

- Use short and concrete commit messages.
- Keep one commit per intent when possible.
- Avoid mixing large refactors with functional changes unless necessary.

## Questions or Issues

If you find a bug, include:

- Steps to reproduce it.
- A sample input file, if applicable.
- Expected result and actual result.
- Console or browser messages, if any.