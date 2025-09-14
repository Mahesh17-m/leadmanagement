import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

const LeadForm = () => {
  const [lead, setLead] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    state: '',
    source: 'website',
    status: 'new',
    score: 0,
    lead_value: 0,
    is_qualified: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchLead();
    }
  }, [id]);

  const fetchLead = async () => {
    try {
      const response = await api.get(`/leads/${id}`);
      setLead(response.data);
    } catch (err) {
      setError('Failed to fetch lead');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLead({
      ...lead,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (id) {
        await api.put(`/leads/${id}`, lead);
      } else {
        await api.post('/leads', lead);
      }
      navigate('/leads');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">
          {id ? 'Edit Lead' : 'New Lead'}
        </h1>
        <button 
          onClick={() => navigate('/leads')} 
          className="btn btn-primary btn-sm"
        >
          Back to Leads
        </button>
      </div>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="card lead-form-card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    value={lead.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    value={lead.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={lead.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={lead.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    name="company"
                    value={lead.company}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={lead.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    value={lead.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Source</label>
                  <select
                    className="form-select"
                    name="source"
                    value={lead.source}
                    onChange={handleChange}
                  >
                    <option value="website">Website</option>
                    <option value="facebook_ads">Facebook Ads</option>
                    <option value="google_ads">Google Ads</option>
                    <option value="referral">Referral</option>
                    <option value="events">Events</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={lead.status}
                    onChange={handleChange}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="lost">Lost</option>
                    <option value="won">Won</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Score (0-100)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="score"
                    min="0"
                    max="100"
                    value={lead.score}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Lead Value ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="lead_value"
                    step="0.01"
                    min="0"
                    value={lead.lead_value}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="col-12">
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="is_qualified"
                    checked={lead.is_qualified}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Is Qualified
                  </label>
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => navigate('/leads')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    {id ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  id ? 'Update Lead' : 'Create Lead'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;