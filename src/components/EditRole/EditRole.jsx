// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import  './EditRole.css'
// const EditRole = ({role,editPermissions,onSave,onClose}) => {
//   const location = useLocation();


//   const [roleName, setRoleName] = useState(role || '');
//   const [permissions, setPermissions] = useState(editPermissions || []);

//   const handlePermissionChange = (index, value) => {
//     const updatedPermissions = [...permissions];
//     updatedPermissions[index] = value;
//     setPermissions(updatedPermissions);
//   };

//   const handleSave = () => {
//     onSave(roleName,permissions)

//   };

//   return (
//     <div className="overlay">
//           <div className="container mt-4 edit-form">
//       <h3>Edit Role</h3>
//       <div className="mb-3">
//         <label className="form-label">Role Name</label>
//         <input
//           type="text"
//           className="form-control"
//           value={roleName}
//           onChange={(e) => setRoleName(e.target.value)}
//         />
//       </div>

//       <h5>Permissions</h5>
//       <ul className="list-group list-group-flush">
//         {permissions.map((permission, index) => (
//           <li key={index} className="list-group-item">
//             <input
//               type="text"
//               className="form-control"
//               value={permission}
//               onChange={(e) => handlePermissionChange(index, e.target.value)}
//             />
//           </li>
//         ))}
//       </ul>

//       <button className="btn btn-success mt-3" onClick={handleSave}>Save</button>
//       <button className="btn btn-secondary mt-3 ms-2" onClick={onClose}>Cancel</button>
//     </div>
//     </div>

//   );
// };

// export default EditRole;
import React, { useState } from 'react';
import './EditRole.css';

const EditRole = ({ role, editPermissions, onSave, onClose }) => {
  const [editedTitle, setEditedTitle] = useState(role);
  const [editedPermissions, setEditedPermissions] = useState([...editPermissions]);

  // Available permissions
  const allPermissions = [
    "Read", "Create", "Update", "Delete"
  ];

  // Handle permission toggle
  const handlePermissionChange = (permission) => {
    if (editedPermissions.includes(permission)) {
      setEditedPermissions(editedPermissions.filter(p => p !== permission));
    } else {
      setEditedPermissions([...editedPermissions, permission]);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSave(editedTitle, editedPermissions)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditRole;
