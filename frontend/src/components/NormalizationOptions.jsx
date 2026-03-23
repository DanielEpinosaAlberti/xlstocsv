import React from 'react';

const OPTIONS_CONFIG = [
  {
    key: 'removeAccents',
    label: 'Remove accents',
    description: 'Converts accented characters to their unaccented equivalent',
    example: 'José García → jose garcia',
  },
  {
    key: 'normalizeHeaders',
    label: 'Normalize headers',
    description: 'Converts column names to snake_case format',
    example: 'Full Name → full_name',
  },
  {
    key: 'standardizeDates',
    label: 'Standardize dates',
    description: 'Converts date formats to the ISO standard',
    example: '25/03/2026 → 2026-03-25',
  },
  {
    key: 'normalizeNumbers',
    label: 'Normalize numbers',
    description: 'Converts Spanish number format to international standard',
    example: '1.234,56 → 1234.56',
  },
  {
    key: 'trimLowercase',
    label: 'Clean text (trim + lowercase)',
    description: 'Removes extra spaces and converts to lowercase',
    example: '"  HELLO  " → "hello"',
  },
];

function NormalizationOptions({ options, onToggle }) {
  return (
    <div className="options-grid">
      {OPTIONS_CONFIG.map(({ key, label, description, example }) => (
        <label
          key={key}
          className={`option-item${options[key] ? ' active' : ''}`}
        >
          <div className="toggle">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => onToggle(key)}
            />
            <span className="slider" />
          </div>
          <div className="option-content">
            <div className="option-label">{label}</div>
            <div className="option-desc">{description}</div>
            <span className="option-example">{example}</span>
          </div>
        </label>
      ))}
    </div>
  );
}

export default NormalizationOptions;
