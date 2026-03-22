# 📊 XLS to CSV Normalizer

Convierte archivos **.xls / .xlsx a CSV limpio y listo para bases de datos**, aplicando normalización automática de datos.

---

## 🚀 Demo (local)

1. Ejecuta backend y frontend
2. Abre: http://localhost:5173
3. Sube un Excel
4. Descarga el CSV normalizado

---

## 🎯 Objetivo del proyecto

Este proyecto nace como una herramienta para:

* Preparar datos para bases de datos (ETL básico)
* Limpiar inconsistencias comunes en Excel
* Automatizar tareas repetitivas de transformación

---

## ⚙️ Características

### ✅ Normalización automática

* Eliminación de tildes (`José → jose`)
* Conversión de encabezados (`Nombre Completo → nombre_completo`)
* Formato de fechas estándar (`YYYY-MM-DD`)
* Normalización de números (`1.234,56 → 1234.56`)
* Limpieza de strings (trim, lowercase)

---

### 📂 Soporte de archivos

* `.xls`
* `.xlsx`

---

### 📤 Salida

* Archivo `.csv` listo para:

  * PostgreSQL
  * MySQL
  * Excel
  * pipelines ETL

---

## 🧱 Stack tecnológico

### Backend

* Node.js
* Express
* xlsx
* csv-writer

### Frontend

* React
* Vite
* Axios

---

## 📁 Estructura del proyecto

```
xls-to-csv-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── routes/
│   │   └── middlewares/
│   ├── uploads/
│   ├── outputs/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
```

---

## 🛠️ Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/xls-to-csv-app.git
cd xls-to-csv-app
```

---

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Crear carpetas necesarias

Dentro de `backend/`:

```bash
mkdir uploads outputs
```

---

## 🔌 API

### POST `/api/convert`

Sube un archivo Excel y devuelve un CSV.

#### Request

* FormData:

  * `file`: archivo `.xls` o `.xlsx`

#### Response

```json
{
  "success": true,
  "downloadUrl": "/outputs/file.csv"
}
```

---

## 🧠 Roadmap

### 🔹 v1 (actual)

* Conversión básica Excel → CSV
* Normalización de datos

### 🔹 v2

* Drag & drop
* Preview de datos
* Validaciones avanzadas

### 🔹 v3

* Sistema de usuarios (JWT)
* Historial de conversiones
* API pública

### 🔹 v4 (SaaS)

* Procesamiento asíncrono (colas)
* Soporte archivos grandes
* Planes de pago

---

## 💰 Monetización (futuro)

* API de pago por uso
* SaaS con límites de conversión
* Integración con herramientas ETL

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas.

1. Fork del proyecto
2. Crea una rama (`feature/nueva-funcionalidad`)
3. Commit
4. Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.

Puedes usarlo, modificarlo y distribuirlo libremente.

---

## 👨‍💻 Autor

Proyecto desarrollado como aplicación de DAW (Desarrollo de Aplicaciones Web), con enfoque en escalabilidad hacia producto real.

---

## ⭐ Motivación

Los datos en Excel suelen ser inconsistentes y difíciles de importar directamente a bases de datos.

Este proyecto busca convertir ese proceso en algo:

* automático
* fiable
* reutilizable

---

## 🚀 Futuro

El objetivo es evolucionar este proyecto hacia:

* herramienta profesional de transformación de datos
* API escalable
* producto SaaS

---

Si te resulta útil, ⭐ dale una estrella al repo.
