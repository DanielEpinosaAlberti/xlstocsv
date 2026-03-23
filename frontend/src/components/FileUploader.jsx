import React, { useState } from 'react';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function FileUploader({ file, onFileChange, onRemove }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileChange(dropped);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleChange = (e) => {
    if (e.target.files[0]) onFileChange(e.target.files[0]);
  };

  return (
    <div>
      <div
        className={`dropzone${dragOver ? ' drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleChange}
        />
        <div className="dropzone-icon">📄</div>
        <div className="dropzone-title">
          Drag your file here or click to browse
        </div>
        <div className="dropzone-subtitle">
          Accepted formats: .xls, .xlsx — Max. 10 MB
        </div>
      </div>

      {file && (
        <div className="file-selected">
          <span className="file-icon">📎</span>
          <div className="file-info">
            <div className="file-name">{file.name}</div>
            <div className="file-size">{formatSize(file.size)}</div>
          </div>
          <button className="remove-btn" onClick={onRemove} title="Remove file">✕</button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
