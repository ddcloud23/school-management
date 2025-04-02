import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditRolePage = () => {
  const navigate = useNavigate();
  const [editedTitle, setEditedTitle] = useState("Administrator");
  const [editedPermissions, setEditedPermissions] = useState(["Read", "Create", "Update"]);

  const allPermissions = ["Read", "Create", "Update", "Delete"];

  const handlePermissionChange = (permission) => {
    setEditedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = () => {
    console.log("Saved Role:", editedTitle, editedPermissions);
    navigate(-1);
  };

  return (
    <div className="edit-role-container">
      <div className="edit-role-content">
        <h5>Edit Role</h5>
        <label>Role Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={editedTitle} 
          onChange={(e) => setEditedTitle(e.target.value)}
        />

        <h6>Role Permissions</h6>
        <div className="permissions-list">
          {allPermissions.map((permission) => (
            <div key={permission} className="permission-item">
              <input 
                type="checkbox" 
                checked={editedPermissions.includes(permission)}
                onChange={() => handlePermissionChange(permission)}
              />
              <label>{permission}</label>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditRolePage;