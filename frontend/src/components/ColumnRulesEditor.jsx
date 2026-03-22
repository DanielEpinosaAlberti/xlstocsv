import React from 'react';

const AVAILABLE_RULES = [
  { id: 'removeAccents', label: 'Quitar tildes', icon: 'Â→A' },
  { id: 'trimLowercase', label: 'Minúsculas', icon: 'a↓' },
  { id: 'uppercase', label: 'Mayúsculas', icon: 'A↑' },
  { id: 'standardizeDates', label: 'Fechas ISO', icon: '📅' },
  { id: 'normalizeNumbers', label: 'Números', icon: '#' },
  { id: 'none', label: 'Sin cambios', icon: '—' },
];

function ColumnRulesEditor({ headers, sampleRows, columnRules, onColumnRulesChange }) {
  const toggleRule = (header, ruleId) => {
    const current = columnRules[header] || [];

    // "none" es exclusivo
    if (ruleId === 'none') {
      onColumnRulesChange(header, current.includes('none') ? [] : ['none']);
      return;
    }

    // "uppercase" y "trimLowercase" son mutuamente exclusivos
    let updated = current.filter(r => r !== 'none');
    if (ruleId === 'uppercase') {
      updated = updated.filter(r => r !== 'trimLowercase');
    } else if (ruleId === 'trimLowercase') {
      updated = updated.filter(r => r !== 'uppercase');
    }

    if (updated.includes(ruleId)) {
      updated = updated.filter(r => r !== ruleId);
    } else {
      updated.push(ruleId);
    }

    onColumnRulesChange(header, updated);
  };

  const applyPresetToAll = (ruleIds) => {
    headers.forEach(h => onColumnRulesChange(h, [...ruleIds]));
  };

  return (
    <div>
      <div className="column-rules-presets">
        <span className="preset-label">Aplicar a todas:</span>
        <button className="preset-btn" onClick={() => applyPresetToAll(['removeAccents', 'trimLowercase'])}>
          Texto limpio
        </button>
        <button className="preset-btn" onClick={() => applyPresetToAll(['standardizeDates'])}>
          Solo fechas
        </button>
        <button className="preset-btn" onClick={() => applyPresetToAll(['normalizeNumbers'])}>
          Solo números
        </button>
        <button className="preset-btn" onClick={() => applyPresetToAll([])}>
          Limpiar todo
        </button>
      </div>

      <div className="column-rules-table-wrapper">
        <table className="column-rules-table">
          <thead>
            <tr>
              <th className="col-name-th">Columna</th>
              <th className="col-sample-th">Muestra</th>
              <th className="col-rules-th">Reglas</th>
            </tr>
          </thead>
          <tbody>
            {headers.map((header, idx) => {
              const sampleValue = sampleRows[0]?.[header] ?? '';
              const rules = columnRules[header] || [];
              const isNone = rules.includes('none');

              return (
                <tr key={header} className="column-rule-row">
                  <td className="col-name">
                    <span className="col-index">{idx + 1}</span>
                    <span className="col-header-name" title={header}>{header}</span>
                  </td>
                  <td className="col-sample">
                    <span className="sample-value" title={String(sampleValue)}>
                      {String(sampleValue) || '—'}
                    </span>
                  </td>
                  <td className="col-rules">
                    <div className="rule-chips">
                      {AVAILABLE_RULES.map(rule => {
                        const isActive = rules.includes(rule.id);
                        const isDisabled = isNone && rule.id !== 'none';
                        return (
                          <button
                            key={rule.id}
                            className={`rule-chip${isActive ? ' active' : ''}${isDisabled ? ' disabled' : ''}`}
                            onClick={() => !isDisabled && toggleRule(header, rule.id)}
                            title={rule.label}
                          >
                            <span className="rule-chip-icon">{rule.icon}</span>
                            <span className="rule-chip-label">{rule.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ColumnRulesEditor;
