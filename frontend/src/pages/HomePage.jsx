import React, { useState, useRef } from 'react';
import FileUploader from '../components/FileUploader';
import NormalizationOptions from '../components/NormalizationOptions';
import ColumnRulesEditor from '../components/ColumnRulesEditor';
import DataPreview from '../components/DataPreview';
import ResultCard from '../components/ResultCard';
import ThemeToggle from '../components/ThemeToggle';
import { analyzeFile, uploadFile } from '../services/api';

const DEFAULT_OPTIONS = {
  removeAccents: true,
  normalizeHeaders: true,
  standardizeDates: true,
  normalizeNumbers: true,
  trimLowercase: true,
};

function HomePage() {
  const [file, setFile] = useState(null);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Column data from analysis
  const [columns, setColumns] = useState(null);
  const [columnRules, setColumnRules] = useState({});
  const [useColumnRules, setUseColumnRules] = useState(false);
  const resultRef = useRef(null);

  const toggleOption = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAll = () => {
    const all = {};
    Object.keys(options).forEach(k => { all[k] = true; });
    setOptions(all);
  };

  const selectNone = () => {
    const none = {};
    Object.keys(options).forEach(k => { none[k] = false; });
    setOptions(none);
  };

  const handleFileChange = async (newFile) => {
    setFile(newFile);
    setResult(null);
    setError(null);
    setColumns(null);
    setColumnRules({});
    setUseColumnRules(false);

    if (newFile) {
      setAnalyzing(true);
      try {
        const data = await analyzeFile(newFile);
        setColumns(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error al analizar el archivo');
      } finally {
        setAnalyzing(false);
      }
    }
  };

  const handleColumnRuleChange = (header, rules) => {
    setColumnRules(prev => ({ ...prev, [header]: rules }));
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const rules = useColumnRules ? columnRules : {};
      const data = await uploadFile(file, options, rules);
      setResult(data);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error al convertir el archivo');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setColumns(null);
    setColumnRules({});
    setUseColumnRules(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <span className="logo-icon">📊</span>
        <h1>XLS to CSV</h1>
        <span className="badge">Normalizer</span>
        <ThemeToggle />
      </header>

      <main className="main-content">
        {/* Result */}
        {result && (
          <div ref={resultRef}>
            <ResultCard result={result} onReset={handleReset} />
          </div>
        )}

        {/* Preview of converted data */}
        {result?.preview && (
          <DataPreview
            headers={result.preview.headers}
            sampleRows={result.preview.rows}
            totalRows={result.preview.totalRows}
          />
        )}

        {/* Upload */}
        <div className="card">
          <div className="card-header">
            <span className="icon">📁</span>
            Archivo
          </div>
          <div className="card-body">
            <FileUploader file={file} onFileChange={handleFileChange} onRemove={handleReset} />
            {analyzing && (
              <div className="analyzing-banner">
                <span className="spinner spinner-sm" />
                Analizando estructura del archivo...
              </div>
            )}
          </div>
        </div>

        {/* Column info */}
        {columns && (
          <div className="card column-info-card">
            <div className="card-header">
              <span className="icon">📋</span>
              Estructura detectada
            </div>
            <div className="card-body">
              <div className="column-stats">
                <div className="stat">
                  <span className="stat-value">{columns.headers.length}</span>
                  <span className="stat-label">columnas</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{columns.totalRows}</span>
                  <span className="stat-label">filas</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Options */}
        <div className="card">
          <div className="card-header">
            <span className="icon">⚙️</span>
            Normalización global
          </div>
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={selectAll}>Activar todo</button>
            <button className="quick-action-btn" onClick={selectNone}>Desactivar todo</button>
          </div>
          <div className="card-body" style={{ paddingTop: 0 }}>
            <NormalizationOptions options={options} onToggle={toggleOption} />
          </div>
        </div>

        {/* Per-column rules */}
        {columns && (
          <div className="card">
            <div className="card-header">
              <span className="icon">🎯</span>
              Reglas por columna
              <label className="column-rules-toggle">
                <div className="toggle toggle-sm">
                  <input
                    type="checkbox"
                    checked={useColumnRules}
                    onChange={() => setUseColumnRules(prev => !prev)}
                  />
                  <span className="slider" />
                </div>
                <span className="column-rules-toggle-label">
                  {useColumnRules ? 'Activado' : 'Desactivado'}
                </span>
              </label>
            </div>
            {useColumnRules && (
              <div className="card-body card-body-flush">
                <p className="column-rules-hint">
                  Las reglas por columna reemplazan la normalización global para cada columna configurada.
                  Las columnas sin reglas usarán la normalización global.
                </p>
                <ColumnRulesEditor
                  headers={columns.headers}
                  sampleRows={columns.sampleRows}
                  columnRules={columnRules}
                  onColumnRulesChange={handleColumnRuleChange}
                />
              </div>
            )}
          </div>
        )}

        {/* Convert button */}
        <button
          className="convert-btn"
          disabled={!file || loading || analyzing}
          onClick={handleConvert}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Procesando...
            </>
          ) : (
            <>🚀 Convertir a CSV</>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

      </main>

      <footer className="app-footer">
        XLS to CSV Normalizer — Transforma tus datos de Excel en CSV limpio
      </footer>
    </div>
  );
}

export default HomePage;
