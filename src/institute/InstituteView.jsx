import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InstituteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [institute, setInstitute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/institutes/${id}`);
        setInstitute(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch institute details. Please try again later.');
        console.error('Error fetching institute details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitute();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this institute?')) {
      try {
        await axios.delete(`/api/institutes/${id}`);
        navigate('/institutes');
      } catch (err) {
        setError('Failed to delete institute. Please try again.');
        console.error('Error deleting institute:', err);
      }
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading institute details...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded m-4">
        {error}
        <div className="mt-4">
          <Link to="/institutes" className="text-blue-600 hover:underline">
            Return to institutes list
          </Link>
        </div>
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="bg-yellow-100 text-yellow-700 p-4 rounded m-4">
        Institute not found.
        <div className="mt-4">
          <Link to="/institutes" className="text-blue-600 hover:underline">
            Return to institutes list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{institute.department_name}</h1>
        <div className="flex space-x-2">
          <Link
            to={`/institutes/edit/${id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
          <Link
            to="/institutes"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Back to List
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded border">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Contact Information</h2>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{institute.email}</p>
            </div>
            
            {institute.phone && (
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{institute.phone}</p>
              </div>
            )}
            
            {institute.mobile_number && (
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium">{institute.mobile_number}</p>
              </div>
            )}
            
            {institute.fax && (
              <div>
                <p className="text-sm text-gray-500">Fax</p>
                <p className="font-medium">{institute.fax}</p>
              </div>
            )}
            
            {institute.website && (
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="font-medium">
                  <a 
                    href={institute.website.startsWith('http') ? institute.website : `https://${institute.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {institute.website}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded border">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Address</h2>
          
          <div className="space-y-3">
            {institute.address_1 && (
              <div>
                <p className="text-sm text-gray-500">Address Line 1</p>
                <p className="font-medium">{institute.address_1}</p>
              </div>
            )}
            
            {institute.address_2 && (
              <div>
                <p className="text-sm text-gray-500">Address Line 2</p>
                <p className="font-medium">{institute.address_2}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {institute.city && (
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="font-medium">{institute.city}</p>
                </div>
              )}
              
              {institute.postal_code && (
                <div>
                  <p className="text-sm text-gray-500">Postal Code</p>
                  <p className="font-medium">{institute.postal_code}</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {institute.state_name && (
                <div>
                  <p className="text-sm text-gray-500">State/Province</p>
                  <p className="font-medium">{institute.state_name}</p>
                </div>
              )}
              
              {institute.country_name && (
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium">{institute.country_name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded border">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Record Information</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="font-medium">
              {new Date(institute.created_at).toLocaleString()}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-medium">
              {new Date(institute.updated_at).toLocaleString()}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">ID</p>
            <p className="font-medium">{institute.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteView;