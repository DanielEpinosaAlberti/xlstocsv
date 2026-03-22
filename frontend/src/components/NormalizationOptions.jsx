import React from 'react';

const OPTIONS_CONFIG = [
  {
    key: 'removeAccents',
    label: 'Eliminar tildes y acentos',
    description: 'Convierte caracteres acentuados a su equivalente sin tilde',
    example: 'José García → jose garcia',
  },
  {
    key: 'normalizeHeaders',
    label: 'Normalizar encabezados',
    description: 'Convierte los nombres de columna a formato snake_case',
    example: 'Nombre Completo → nombre_completo',
  },
  {
    key: 'standardizeDates',
    label: 'Estandarizar fechas',
    description: 'Convierte formatos de fecha al estándar ISO',
    example: '25/03/2026 → 2026-03-25',
  },
  {
    key: 'normalizeNumbers',
    label: 'Normalizar números',
    description: 'Convierte formato numérico español al internacional',
    example: '1.234,56 → 1234.56',
  },
  {
    key: 'trimLowercase',
    label: 'Limpiar texto (trim + minúsculas)',
    description: 'Elimina espacios extra y convierte a minúsculas',
    example: '"  HOLA  " → "hola"',
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
