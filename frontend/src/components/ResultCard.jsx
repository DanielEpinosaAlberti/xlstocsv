import React from 'react';

function ResultCard({ result, onReset }) {
  return (
    <div className="card result-card">
      <div className="card-body">
        <div className="result-success">
          <div className="check-icon">✓</div>
          <div className="result-title">Conversion completed!</div>
          <div className="result-subtitle">
            Your normalized CSV file is ready to download
          </div>
          <a className="download-btn" href={result.downloadUrl} download>
            📥 Download CSV
          </a>
          <button
            className="quick-action-btn"
            onClick={onReset}
            style={{ marginTop: '.25rem' }}
          >
            Convert another file
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
