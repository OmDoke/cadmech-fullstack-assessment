import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Archive, Wrench, Package } from 'lucide-react';
import { API_BASE } from '../App';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchEquipment();
  }, [search, type, status]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      const data = await res.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (type) queryParams.append('type', type);
      if (status) queryParams.append('status', status);

      const res = await fetch(`${API_BASE}/equipment?${queryParams.toString()}`);
      const data = await res.json();
      setEquipment(data.data || []);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        const res = await fetch(`${API_BASE}/equipment/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchEquipment();
          fetchStats();
        }
      } catch (error) {
        console.error('Error deleting equipment', error);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <header className="header">
        <h1>Dashboard Overview</h1>
      </header>

      {/* Stats Cards */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ color: 'var(--primary)', backgroundColor: 'rgba(59,130,246,0.1)' }}>
              <Package size={24} />
            </div>
            <div className="stat-info">
              <h3>Total Equipment</h3>
              <div className="stat-value">{stats.total}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ color: 'var(--success)', backgroundColor: 'rgba(16,185,129,0.1)' }}>
              <Activity size={24} />
            </div>
            <div className="stat-info">
              <h3>Active</h3>
              <div className="stat-value">{stats.active}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ color: 'var(--warning)', backgroundColor: 'rgba(245,158,11,0.1)' }}>
              <Wrench size={24} />
            </div>
            <div className="stat-info">
              <h3>Under Maintenance</h3>
              <div className="stat-value">{stats.underMaintenance}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ color: 'var(--danger)', backgroundColor: 'rgba(239,68,68,0.1)' }}>
              <Archive size={24} />
            </div>
            <div className="stat-info">
              <h3>Decommissioned</h3>
              <div className="stat-value">{stats.decommissioned}</div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment List */}
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Equipment Inventory</h2>
      
      <div className="filter-bar">
        <input 
          type="text" 
          placeholder="Search by name..." 
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="CNC Machine">CNC Machine</option>
          <option value="IoT Sensor">IoT Sensor</option>
          <option value="Automation Trainer">Automation Trainer</option>
          <option value="PLC Module">PLC Module</option>
          <option value="Hydraulic System">Hydraulic System</option>
          <option value="Pneumatic System">Pneumatic System</option>
          <option value="Electrical Panel">Electrical Panel</option>
        </select>
        <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Under Maintenance">Under Maintenance</option>
          <option value="Decommissioned">Decommissioned</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading...</td></tr>
            ) : equipment.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>No equipment found.</td></tr>
            ) : (
              equipment.map((item) => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td><strong>{item.name}</strong><br/><small style={{ color: 'var(--text-muted)' }}>{item.serial_number}</small></td>
                  <td>{item.type}</td>
                  <td>
                    <span className={`badge ${
                      item.status === 'Active' ? 'badge-active' :
                      item.status === 'Under Maintenance' ? 'badge-maintenance' :
                      'badge-decommissioned'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.location || 'N/A'}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => navigate(`/edit/${item.id}`)}
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => handleDelete(item.id)}
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
