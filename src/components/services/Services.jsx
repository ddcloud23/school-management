import React, { useState } from 'react';
import './services.css';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import EditRole from '../EditRole/EditRole';



const Services = () => {
  // Initial Roles Data
  const initialRoles = [
    {
      id: 1,
      title: "Super Administrator",
      permissions: [
        "All contents to Order Management",
        "All contents to Projects",
        "All contents to Warehouses",
        "All contents to Item Activity",
      ],
      time: "Only 25 mins.",
    },
    {
      id: 2,
      title: "Test Role",
      permissions: ["View to Order Management", "View to Warehouse"],
    },
    {
      id: 3,
      title: "Administrator",
      permissions: [
        "View to Order Management",
        "View to Projects",
        "View and call to Item Activity",
        "View to Items",
      ],
    },
    {
      id: 4,
      title: "Role & Permissions Test",
      permissions: ["View to Order Management", "View to Projects", "View to Warehouse"],
    },
  ];
  const [roles, setRoles] = useState(initialRoles);
const [editingId, setEditingId] = useState(null);
const [editedTitle, setEditedTitle] = useState("");
const [editedPermissions, setEditedPermissions] = useState([]);
const [newRoleTitle, setNewRoleTitle] = useState("");
const [newRolePermissions, setNewRolePermissions] = useState([""]);
const [showModal, setShowModal] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [titleError, setTitleError] = useState(false);
const [permissionsError, setPermissionsError] = useState(false);


  // Start Editing
  const handleEditClick = (id, title, permissions) => {
    setEditingId(id);
    setEditedTitle(title);
    setEditedPermissions([...permissions]);
    setIsEditing(true)
  };

  // Handle Permission Change in Edit Mode
  const handlePermissionChange = (index, value) => {
    const updatedPermissions = [...editedPermissions];
    updatedPermissions[index] = value;
    setEditedPermissions(updatedPermissions);
  };

  // Save Edited Title & Permissions
  const handleSave = (title,permissions) => {
    setRoles(roles.map(role =>
      role.id === editingId ? { ...role, title:title, permissions:permissions } : role
    ));
   handleCancel()
  };

  // Cancel Editing
  const handleCancel = () => {
    setEditingId(null);
    setEditedTitle("");
    setEditedPermissions([]);
    setIsEditing(false)

  };

  // Add New Role Function with Validation
  const handleAddRole = () => {
    setTitleError(false);
    setPermissionsError(false);

    if (!newRoleTitle.trim()) {
      setTitleError(true);
      return;
    }

    const filteredPermissions = newRolePermissions.filter(p => p.trim() !== "");
    if (filteredPermissions.length === 0) {
      setPermissionsError(true);
      return;
    }

    const newRole = {
      id: roles.length + 1,
      title: newRoleTitle,
      permissions: filteredPermissions,
    };

    setRoles([...roles, newRole]);
    setShowModal(false);
    setNewRoleTitle("");
    setNewRolePermissions([""]);
  };

  return (
    <div className="container-fluid ">
      {/* Navbar with Add New Role Button */}

      <div className="main">
        <Sidebar />
        <div className="content">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <div className="position-relative w-50">
                <input
                  className="form-control pe-4"
                  type="search"
                  placeholder="Search roles..."
                  aria-label="Search"
                />
              </div>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add New Role</button>
            </div>
          </nav>
          <div className="row g-4 content ">
            {roles.map((role) => (
              <div className="col-md-6" key={role.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      {/* {editingId === role.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                      ) : (
                        <h5 className="card-title mb-0 text-primary">{role.title}</h5>
                      )} */}
                        <h5 className="card-title mb-0 text-primary">{role.title}</h5>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleEditClick(role.id, role.title, role.permissions)}
                        >
                          Edit
                        </button>

                      {/* 
                      {editingId === role.id ? (
                        <div className="d-flex gap-2">
                          <button className="btn btn-success btn-sm" onClick={() => handleSave(role.id)}>Save</button>
                          <button className="btn btn-danger btn-sm" onClick={handleCancel}>Cancel</button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleEditClick(role.id, role.title, role.permissions)}
                        >
                          Edit
                        </button>
                      )} */}
                    </div>

                    <h6 className="card-subtitle mb-2 text-muted small">Resources & Permissions</h6>

                
                    <ul className="list-group list-group-flush">
                      {/* {editingId === role.id ? (
                        editedPermissions.map((permission, index) => (
                          <li key={index} className="list-group-item small py-2 px-0 border-0">
                            <input
                              type="text"
                              className="form-control"
                              value={permission}
                              onChange={(e) => handlePermissionChange(index, e.target.value)}
                            />
                          </li>
                        ))
                      ) : (
                        role.permissions.map((permission, index) => (
                          <li key={index} className="list-group-item small py-2 px-0 border-0">
                            {permission}
                          </li>
                        ))
                      )}
                        */
                         role.permissions.map((permission, index) => (
                          <li key={index} className="list-group-item small py-2 px-0 border-0">
                            {permission}
                          </li>
                        ))
                      }
                    </ul> 

                    {role.time && <div className="text-muted small mt-2 fst-italic">{role.time}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>

      </div>

      {
        isEditing && (         
           <EditRole role={editedTitle} editPermissions={editedPermissions} onSave={handleSave} onClose={handleCancel}/>
         )
      }

      {/* Add New Role Modal */}
      {showModal && (
        <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Role</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Please enter below details to create a role</p>
                <label className="form-label">Role Title</label>
                <input
                  type="text"
                  className={`form-control mb-1 ${titleError ? 'is-invalid' : ''}`}
                  value={newRoleTitle}
                  onChange={(e) => setNewRoleTitle(e.target.value)}
                  autoFocus
                />
                {titleError && <div className="text-danger small">Role title is required</div>}


                {permissionsError && <div className="text-danger small">At least one permission is required</div>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAddRole}>Save Role</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
