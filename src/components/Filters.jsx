import React, { useState } from 'react';

const Filters = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    status: '',
    source: '',
    search: '',
    is_qualified: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const queryFilters = { ...newFilters };
    if (queryFilters.search) {
      queryFilters.email = queryFilters.search;
      delete queryFilters.search;
    }
    
    onFilterChange(queryFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      status: '',
      source: '',
      search: '',
      is_qualified: ''
    };
    setFilters(emptyFilters);
    onClearFilters(emptyFilters);
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Lead Filters</h5>
        <button
          type="button"
          className="btn btn-advanced "
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
        </button>
      </div>
      
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          
          <div className="col-md-3">
            <label className="form-label">Source</label>
            <select
              className="form-select"
              value={filters.source}
              onChange={(e) => handleFilterChange('source', e.target.value)}
            >
              <option value="">All Sources</option>
              <option value="website">Website</option>
              <option value="facebook_ads">Facebook Ads</option>
              <option value="google_ads">Google Ads</option>
              <option value="referral">Referral</option>
              <option value="events">Events</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="col-md-3">
            <label className="form-label">Qualified</label>
            <select
              className="form-select"
              value={filters.is_qualified}
              onChange={(e) => handleFilterChange('is_qualified', e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
          <div className="col-md-3">
            <label className="form-label">Search Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by email"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {showAdvanced && (
            <>
              <div className="col-md-3">
                <label className="form-label">Company Contains</label>
                <input
                  type="text"
                  className="form-control"
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">City Contains</label>
                <input
                  type="text"
                  className="form-control"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">Min Score</label>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  max="100"
                  value={filters.score_min}
                  onChange={(e) => handleFilterChange('score_min', e.target.value)}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">Max Score</label>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  max="100"
                  value={filters.score_max}
                  onChange={(e) => handleFilterChange('score_max', e.target.value)}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">Min Value ($)</label>
                <input
                  type="number"
                  className="form-control"
                  step="0.01"
                  min="0"
                  value={filters.lead_value_min}
                  onChange={(e) => handleFilterChange('lead_value_min', e.target.value)}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">Max Value ($)</label>
                <input
                  type="number"
                  className="form-control"
                  step="0.01"
                  min="0"
                  value={filters.lead_value_max}
                  onChange={(e) => handleFilterChange('lead_value_max', e.target.value)}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">Created After</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.created_after}
                  onChange={(e) => handleFilterChange('created_after', e.target.value)}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">Created Before</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.created_before}
                  onChange={(e) => handleFilterChange('created_before', e.target.value)}
                />
              </div>
            </>
          )}
          
          <div className="col-12">
            <div className="d-flex gap-2">
             <button className="btn btn-clear-filters btn-icon" onClick={handleClearFilters}>
  <i className="bi bi-x-circle"></i>
  Clear All Filters
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;