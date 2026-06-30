import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Server, PlusCircle, Settings } from 'lucide-react';
import './App.css';

import Dashboard from './components/Dashboard';
import EquipmentForm from './components/EquipmentForm';

// Use the deployed backend URL
export const API_BASE = 'https://cadmech-api.onrender.com/api';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Server className="stat-icon" style={{ color: 'var(--primary)' }} />
        <h2>SmartLab</h2>
      </div>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <LayoutDashboard size={20} />
          Dashboard & Equipment
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <PlusCircle size={20} />
          Add Equipment
        </NavLink>
      </nav>
      <div style={{ marginTop: 'auto', padding: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        CADMech Assessment
      </div>
    </aside>
  );
}

function App() {
  return (
    <BrowserRouter basename="/cadmech-fullstack-assessment/">
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<EquipmentForm />} />
            <Route path="/edit/:id" element={<EquipmentForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
