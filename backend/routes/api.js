/**
 * SmartLab Equipment Manager — API Routes
 * CADMech Full Stack Assessment
 *
 * TODO: Implement all the routes below.
 *
 * Each route handler should:
 * 1. Validate input data
 * 2. Perform the database operation
 * 3. Return appropriate HTTP status codes
 * 4. Return meaningful error messages
 *
 * Refer to README.md for request/response examples.
 */

const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db/database');

// ─── GET /api/equipment ────────────────────────────────────
router.get('/equipment', async (req, res) => {
  try {
    const db = await getDatabase();
    let query = 'SELECT * FROM equipment WHERE 1=1';
    const params = [];

    if (req.query.search) {
      query += ' AND name LIKE ?';
      params.push(`%${req.query.search}%`);
    }
    if (req.query.type) {
      query += ' AND type = ?';
      params.push(req.query.type);
    }
    if (req.query.status) {
      query += ' AND status = ?';
      params.push(req.query.status);
    }

    query += ' ORDER BY created_at DESC';

    const data = await db.all(query, params);
    res.json({ data });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

// ─── GET /api/equipment/:id ────────────────────────────────
router.get('/equipment/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const data = await db.get('SELECT * FROM equipment WHERE id = ?', [req.params.id]);
    
    if (!data) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

// ─── POST /api/equipment ───────────────────────────────────
router.post('/equipment', async (req, res) => {
  try {
    const { name, type, status, location, serial_number, description, installed_date } = req.body;

    if (!name || !type || !status) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'name, type, and status are required fields',
      });
    }

    const db = await getDatabase();
    const result = await db.run(
      `INSERT INTO equipment (name, type, status, location, serial_number, description, installed_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, type, status, location, serial_number, description, installed_date]
    );

    const newEquipment = await db.get('SELECT * FROM equipment WHERE id = ?', [result.lastID]);
    res.status(201).json(newEquipment);
  } catch (error) {
    console.error('Error creating equipment:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Serial number must be unique' });
    }
    res.status(500).json({ error: 'Failed to create equipment' });
  }
});

// ─── PUT /api/equipment/:id ────────────────────────────────
router.put('/equipment/:id', async (req, res) => {
  try {
    const { name, type, status, location, serial_number, description, installed_date } = req.body;

    if (!name || !type || !status) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'name, type, and status are required fields',
      });
    }

    const db = await getDatabase();
    const existing = await db.get('SELECT id FROM equipment WHERE id = ?', [req.params.id]);
    
    if (!existing) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    await db.run(
      `UPDATE equipment 
       SET name = ?, type = ?, status = ?, location = ?, serial_number = ?, description = ?, installed_date = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, type, status, location, serial_number, description, installed_date, req.params.id]
    );

    const updatedEquipment = await db.get('SELECT * FROM equipment WHERE id = ?', [req.params.id]);
    res.json(updatedEquipment);
  } catch (error) {
    console.error('Error updating equipment:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Serial number must be unique' });
    }
    res.status(500).json({ error: 'Failed to update equipment' });
  }
});

// ─── DELETE /api/equipment/:id ─────────────────────────────
router.delete('/equipment/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const result = await db.run('DELETE FROM equipment WHERE id = ?', [req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    res.json({ message: 'Equipment deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
});

// ─── GET /api/stats ────────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const db = await getDatabase();
    
    const totalResult = await db.get('SELECT COUNT(*) as count FROM equipment');
    const activeResult = await db.get("SELECT COUNT(*) as count FROM equipment WHERE status = 'Active'");
    const maintenanceResult = await db.get("SELECT COUNT(*) as count FROM equipment WHERE status = 'Under Maintenance'");
    const decommissionedResult = await db.get("SELECT COUNT(*) as count FROM equipment WHERE status = 'Decommissioned'");

    res.json({
      stats: {
        total: totalResult.count,
        active: activeResult.count,
        underMaintenance: maintenanceResult.count,
        decommissioned: decommissionedResult.count,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
