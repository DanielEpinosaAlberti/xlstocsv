# API Reference

## POST /api/analyze

Analyzes an uploaded spreadsheet and returns its structure.

### Request

- Content type: `multipart/form-data`
- Field: `file`

### Response example

```json
{
  "success": true,
  "headers": ["Name", "Date", "Amount"],
  "sampleRows": [
    { "Name": "José", "Date": "25/03/2026", "Amount": "1.234,56" }
  ],
  "totalRows": 150
}
```

## POST /api/convert

Converts an uploaded spreadsheet into a normalized CSV file.

### Request

- Content type: `multipart/form-data`
- Fields:
  - `file`: `.xls` or `.xlsx` file
  - `options`: JSON string with global normalization settings
  - `columnRules`: JSON string with per-column overrides

### Options example

```json
{
  "removeAccents": true,
  "normalizeHeaders": true,
  "standardizeDates": true,
  "normalizeNumbers": true,
  "trimLowercase": true
}
```

### Column rules example

```json
{
  "Column Name": ["removeAccents", "trimLowercase"],
  "Date Column": ["standardizeDates"],
  "ID Column": ["none"]
}
```

### Response example

```json
{
  "success": true,
  "downloadUrl": "/outputs/filename_1711180800000.csv",
  "preview": {
    "headers": ["name", "date", "amount"],
    "rows": [
      { "name": "jose", "date": "2026-03-25", "amount": "1234.56" }
    ],
    "totalRows": 150
  }
}
```
