import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize
} from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditInstitute = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isAddMode = !id;

  // Sample data - in a real app, this would come from an API
  const [countries, setCountries] = useState([
    { id: 'US', name: 'United States' },
    { id: 'UK', name: 'United Kingdom' },
    { id: 'CA', name: 'Canada' },
    { id: 'AU', name: 'Australia' },
    { id: 'IN', name: 'India' }
  ]);
  
  const [states, setStates] = useState([
    { id: 'CA', name: 'California', country_id: 'US' },
    { id: 'TX', name: 'Texas', country_id: 'US' },
    { id: 'NY', name: 'New York', country_id: 'US' },
    { id: 'LO', name: 'London', country_id: 'UK' },
    { id: 'ON', name: 'Ontario', country_id: 'CA' }
  ]);

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    school_name: '',
    email: '',
    fax: '',
    website: '',
    phone: '',
    mobile_number: '',
    address_1: '',
    address_2: '',
    city: '',
    state_id: '',
    country_id: '',
    postal_code: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null
  });

  // Filtered states based on selected country
  const [filteredStates, setFilteredStates] = useState([]);

  useEffect(() => {
    // If editing, populate form with existing data
    if (!isAddMode && location.state?.institute) {
      setFormData(location.state.institute);
    }
  }, [isAddMode, id, location.state]);

  // Update filtered states when country changes
  useEffect(() => {
    if (formData.country_id) {
      setFilteredStates(states.filter(state => state.country_id === formData.country_id));
    } else {
      setFilteredStates([]);
    }
  }, [formData.country_id, states]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If country changes, reset state
    if (name === 'country_id' && value !== formData.country_id) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        state_id: '' // Reset state when country changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        updated_at: new Date().toISOString() // Update the timestamp
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.school_name || !formData.email) {
      alert('School name and email are required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Generate a unique ID if adding a new record
    const instituteData = {
      ...formData,
      id: isAddMode ? Date.now().toString() : formData.id,
      created_at: isAddMode ? new Date().toISOString() : formData.created_at,
      updated_at: new Date().toISOString()
    };

    // Save to localStorage
    const currentInstitutes = JSON.parse(localStorage.getItem("institutes")) || [];
    
    if (isAddMode) {
      localStorage.setItem("institutes", JSON.stringify([...currentInstitutes, instituteData]));
    } else {
      const updatedInstitutes = currentInstitutes.map(institute => 
        institute.id === instituteData.id ? instituteData : institute
      );
      localStorage.setItem("institutes", JSON.stringify(updatedInstitutes));
    }

    navigate('/institutes');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" className="mb-4">
                {isAddMode ? 'Add New Institute' : 'Edit Institute'}
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="School Name"
                      name="school_name"
                      value={formData.school_name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Fax"
                      name="fax"
                      value={formData.fax}
                      onChange={handleChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </Grid>
                  
                  <Grid item xs={6}>
                    <TextareaAutosize
                      aria-label="Address Line 1"
                      name="address_1"
                      placeholder="Address Line 1"
                      value={formData.address_1}
                      onChange={handleChange}
                      minRows={2}
                      style={{ width: '100%', padding: '10px' }}
                    />
                  </Grid>
                  
                  <Grid item xs={6}>
                    <TextareaAutosize
                      aria-label="Address Line 2"
                      name="address_2"
                      placeholder="Address Line 2"
                      value={formData.address_2}
                      onChange={handleChange}
                      minRows={2}
                      style={{ width: '100%', padding: '10px' }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="country-select-label">Country</InputLabel>
                      <Select
                        labelId="country-select-label"
                        id="country_id"
                        name="country_id"
                        value={formData.country_id}
                        label="Country"
                        onChange={handleChange}
                      >
                        <MenuItem value="">Select a country</MenuItem>
                        {countries.map(country => (
                          <MenuItem key={country.id} value={country.id}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth disabled={!formData.country_id}>
                      <InputLabel id="state-select-label">State/Province</InputLabel>
                      <Select
                        labelId="state-select-label"
                        id="state_id"
                        name="state_id"
                        value={formData.state_id}
                        label="State/Province"
                        onChange={handleChange}
                      >
                        <MenuItem value="">Select a state</MenuItem>
                        {filteredStates.map(state => (
                          <MenuItem key={state.id} value={state.id}>
                            {state.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Postal Code"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12} className="mt-3 d-flex justify-content-end">
                    <Button 
                      type="button" 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => navigate('/institutes')}
                      className="me-2"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      {isAddMode ? 'Create Institute' : 'Update Institute'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddEditInstitute;