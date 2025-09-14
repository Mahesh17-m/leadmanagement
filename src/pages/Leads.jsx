import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchLeads();
  }, [currentPage, filters]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...filters
      }).toString();

      const response = await api.get(`/leads?${params}`);
      setLeads(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalLeads(response.data.total);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/leads/${id}`);
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Leads ({totalLeads})</h1>
        <Link to="/leads/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Add New Lead
        </Link>
      </div>

      <Filters 
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Source</th>
                  <th className="text-center">Score</th>
                  <th className="text-center">Value</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <div className="text-muted">
                        <i className="bi bi-inbox display-4 d-block mb-3"></i>
                        <h5>No leads found</h5>
                        <p className="mb-0">
                          <Link to="/leads/new" className="text-decoration-none">
                            Create your first lead
                          </Link>
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead._id}>
                      <td>{lead.first_name} {lead.last_name}</td>
                      <td>{lead.email}</td>
                      <td>{lead.company}</td>
                      <td>
                        <span className={`status-badge status-${lead.status}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="text-capitalize">{lead.source}</td>
                      <td className="text-center">{lead.score}</td>
                      <td className="text-center">${lead.lead_value}</td>
                      <td className="text-center">
                        <Link
                          to={`/leads/edit/${lead._id}`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(lead._id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Leads;