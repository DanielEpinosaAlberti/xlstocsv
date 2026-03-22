import React, { useState } from 'react';

function DataPreview({ headers, sampleRows, totalRows }) {
  const [expanded, setExpanded] = useState(true);
  const displayRows = sampleRows || [];

  return (
    <div className="card preview-card">
      <div className="card-header">
        <span className="icon">👁️</span>
        Vista previa de datos
        <span className="preview-badge">{displayRows.length} de {totalRows} filas</span>
        <button
          className="preview-toggle-btn"
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? '▲ Ocultar' : '▼ Mostrar'}
        </button>
      </div>
      {expanded && (
        <div className="preview-table-wrapper">
          <table className="preview-table">
            <thead>
              <tr>
                <th className="preview-row-num">#</th>
                {headers.map(h => (
                  <th key={h} title={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayRows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="preview-row-num">{rowIdx + 1}</td>
                  {headers.map(h => {
                    const val = row[h];
                    const display = val === null || val === undefined || val === '' ? '' : String(val);
                    const cellType = typeof val === 'number' ? 'number'
                      : /^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/.test(display) ? 'date'
                      : 'text';

                    return (
                      <td key={h} className={`preview-cell preview-cell-${cellType}`} title={display}>
                        {display || <span className="preview-empty">vacío</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {totalRows > displayRows.length && (
            <div className="preview-footer">
              +{totalRows - displayRows.length} filas más no mostradas
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DataPreview;
