/**
 * SmartLab Equipment Manager — Backend API Server
 * CADMech Full Stack Assessment
 *
 * This is your starting point for the backend.
 *
 * TODO:
 * 1. Set up your database connection (MySQL / PostgreSQL / SQLite)
 * 2. Implement the API endpoints in routes/api.js
 * 3. Add proper error handling
 * 4. Add input validation
 *
 * Endpoints to implement:
 *   GET    /api/equipment      — List all equipment (with search/filter)
 *   GET    /api/equipment/:id  — Get single equipment
 *   POST   /api/equipment      — Create new equipment
 *   PUT    /api/equipment/:id  — Update equipment
 *   DELETE /api/equipment/:id  — Delete equipment
 *   GET    /api/stats          — Dashboard statistics
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ─────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Request Logging (simple) ──────────────────────────────
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
  next();
});

// ─── Routes ────────────────────────────────────────────────
app.use('/api', apiRoutes);

// ─── Health Check ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CADMech Equipment Manager API is running',
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`,
  });
});

// ─── Error Handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// ─── Start Server ──────────────────────────────────────────
const { getDatabase } = require('./db/database');

app.listen(PORT, async () => {
  try {
    await getDatabase();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }

  console.log(`
  ╔════════════════════════════════════════════════╗
  ║  🏭 CADMech Equipment Manager API             ║
  ║  Server running on http://localhost:${PORT}       ║
  ║  Health: http://localhost:${PORT}/api/health      ║
  ╚════════════════════════════════════════════════╝
  `);
});

module.exports = app;
