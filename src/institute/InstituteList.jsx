import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InstitutesList = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchInstitutes();
  }, [currentPage, searchTerm]);

  const fetchInstitutes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/institutes', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm
        }
      });
      
      setInstitutes(response.data.data);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      setError(null);
    } catch (err) {
      setError('Failed to fetch institutes. Please try again later.');
      console.error('Error fetching institutes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this institute?')) {
      try {
        await axios.delete(`/api/institutes/${id}`);
        // Refresh the list
        fetchInstitutes();
      } catch (err) {
        setError('Failed to delete institute. Please try again.');
        console.error('Error deleting institute:', err);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && institutes.length === 0) {
    return <div className="text-center p-8">Loading institutes...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Institutes</h1>
        <Link 
          to="/institutes/add" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Institute
        </Link>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="flex">
          <input
            type="text"
            placeholder="Search institutes..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-l w-full"
          />
          <button 
            onClick={() => fetchInstitutes()}
            className="px-4 py-2 bg-gray-200 rounded-r border border-gray-300 border-l-0"
          >
            Search
          </button>
        </div>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}

      {/* Institutes table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {institutes.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No institutes found
                </td>
              </tr>
            ) : (
              institutes.map((institute) => (
                <tr key={institute.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {institute.department_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {institute.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {institute.phone || institute.mobile_number || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {institute.city || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {institute.country_name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link 
                      to={`/institutes/${institute.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </Link>
                    <Link 
                      to={`/institutes/edit/${institute.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(institute.id)}
                      className="text-red-600 hover:text-red-900"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l border ${
                currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border-t border-b ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r border ${
                currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default InstitutesList;