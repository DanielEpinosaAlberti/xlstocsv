# Normalization Rules

The application applies rule-based transformations to spreadsheet data before exporting it to CSV.

## Global normalization

- Remove accents: `José García` becomes `jose garcia`
- Normalize headers: `Full Name` becomes `full_name`
- Standardize dates: `25/03/2026` becomes `2026-03-25`
- Normalize numbers: `1.234,56` becomes `1234.56`
- Trim and lowercase text

## Per-column rules

Users can override the global behavior for each column using rules such as:

- `removeAccents`
- `trimLowercase`
- `uppercase`
- `standardizeDates`
- `normalizeNumbers`
- `none`

## Presets

The interface supports common presets that apply a set of rules to all columns, which helps speed up repetitive configuration.

## Preview behavior

The first rows of the transformed dataset are shown before download so the user can verify that the normalization result is correct.
