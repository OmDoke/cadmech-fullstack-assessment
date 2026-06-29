import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE } from '../App';

export default function EquipmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    type: 'CNC Machine',
    status: 'Active',
    location: '',
    serial_number: '',
    description: '',
    installed_date: ''
  });

  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchEquipment();
    }
  }, [id]);

  const fetchEquipment = async () => {
    try {
      const res = await fetch(`${API_BASE}/equipment/${id}`);
      if (!res.ok) throw new Error('Failed to fetch equipment');
      const data = await res.json();
      setFormData({
        name: data.name || '',
        type: data.type || 'CNC Machine',
        status: data.status || 'Active',
        location: data.location || '',
        serial_number: data.serial_number || '',
        description: data.description || '',
        installed_date: data.installed_date ? data.installed_date.split('T')[0] : ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const url = isEdit ? `${API_BASE}/equipment/${id}` : `${API_BASE}/equipment`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to save equipment');
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="animate-fade-in">
      <header className="header">
        <h1>{isEdit ? 'Edit Equipment' : 'Add New Equipment'}</h1>
      </header>

      <div className="form-card">
        {error && (
          <div style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Equipment Name *</label>
              <input 
                type="text" 
                name="name"
                className="form-control" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Serial Number</label>
              <input 
                type="text" 
                name="serial_number"
                className="form-control" 
                value={formData.serial_number}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Type *</label>
              <select name="type" className="form-control" value={formData.type} onChange={handleChange} required>
                <option value="CNC Machine">CNC Machine</option>
                <option value="IoT Sensor">IoT Sensor</option>
                <option value="Automation Trainer">Automation Trainer</option>
                <option value="PLC Module">PLC Module</option>
                <option value="Hydraulic System">Hydraulic System</option>
                <option value="Pneumatic System">Pneumatic System</option>
                <option value="Electrical Panel">Electrical Panel</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status *</label>
              <select name="status" className="form-control" value={formData.status} onChange={handleChange} required>
                <option value="Active">Active</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Decommissioned">Decommissioned</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location</label>
              <input 
                type="text" 
                name="location"
                className="form-control" 
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Installed Date</label>
              <input 
                type="date" 
                name="installed_date"
                className="form-control" 
                value={formData.installed_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              name="description"
              className="form-control" 
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
