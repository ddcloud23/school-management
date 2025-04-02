import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';
import { useState ,useEffect} from 'react';
const AddEditEmployeeLoan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loan, setLoan] = useState({
    id: '',
    employee_id: '',
    loan_amount: '',
    interest_rate: '',
    monthly_installments: '',
    remaining_balance: '',
    start_date: '',
    end_date: '',
    created_at: '',
    updated_at: '',
    deleted_at: ''
  });

  useEffect(() => {
    if (location.state?.loan) {
      setLoan(location.state.loan);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("employeeLoans")) || [];
    if (loan.id) {
      const updatedData = storedData.map((l) => (l.id === loan.id ? loan : l));
      localStorage.setItem("employeeLoans", JSON.stringify(updatedData));
    } else {
      loan.id = Date.now();
      localStorage.setItem("employeeLoans", JSON.stringify([...storedData, loan]));
    }
    navigate('/employee-loans');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h4 className='text-primary'>{loan.id ? 'Edit' : 'Add'} Employee Loan</h4>
          <form onSubmit={handleSubmit} className="row g-3">
            {Object.keys(loan).map((key) => (
              <div className="col-md-6" key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/_/g, ' ').toUpperCase()}
                  name={key}
                  value={loan[key]}
                  onChange={handleChange}
                  className="mb-3"
                />
              </div>
            ))}
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate('/employee-loans')}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditEmployeeLoan;
