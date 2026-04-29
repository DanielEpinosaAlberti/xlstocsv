# XLS to CSV Normalizer Wiki

Welcome to the project wiki for XLS to CSV Normalizer.

This wiki explains how the application works, how to run it locally, how the normalization pipeline behaves, and how to extend or deploy the project.

## Sections

- [Getting Started](Getting-Started)
- [Project Structure](Project-Structure)
- [API Reference](API-Reference)
- [Normalization Rules](Normalization-Rules)
- [Deployment](Deployment)
- [Security Notes](Security-Notes)
- [Contribution Guide](Contribution-Guide)

## What the project does

The application converts Excel spreadsheets (`.xls` and `.xlsx`) into normalized CSV files. It provides a backend API for upload and conversion, plus a React frontend for file upload, normalization settings, previews, and downloads.

## Main goals

- Standardize spreadsheet data before it enters databases or ETL pipelines.
- Reduce manual cleanup and formatting work.
- Give users a clear preview before they download the result.
- Keep the workflow simple and accessible through a web interface.
