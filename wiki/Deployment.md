# Deployment

## Production behavior

In production, the backend serves the compiled frontend as static content, so the application can run behind a single Node.js process.

## Build the frontend

```bash
cd frontend
npm run build
```

## Start the backend

```bash
cd backend
npm start
```

## Suggested deployment setup

For a more robust deployment, the project can be placed behind a reverse proxy such as Nginx and managed with a process manager such as PM2.

## Notes

- Make sure upload and output directories are writable.
- Confirm that the backend can access the generated CSV files.
- Review file retention and cleanup behavior for production use.
