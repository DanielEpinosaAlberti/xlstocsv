import React from 'react';

function ResultCard({ result, onReset }) {
  return (
    <div className="card result-card">
      <div className="card-body">
        <div className="result-success">
          <div className="check-icon">✓</div>
          <div className="result-title">¡Conversión completada!</div>
          <div className="result-subtitle">
            Tu archivo CSV normalizado está listo para descargar
          </div>
          <a className="download-btn" href={result.downloadUrl} download>
            📥 Descargar CSV
          </a>
          <button
            className="quick-action-btn"
            onClick={onReset}
            style={{ marginTop: '.25rem' }}
          >
            Convertir otro archivo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
