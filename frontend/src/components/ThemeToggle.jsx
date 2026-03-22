import React, { useState, useEffect } from 'react';

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      className="theme-toggle-btn"
      onClick={() => setDark(prev => !prev)}
      title={dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      aria-label={dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
