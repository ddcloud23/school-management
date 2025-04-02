import React, { useEffect, useRef, useState } from 'react'
import * as bootstrap from 'bootstrap'
const NewRole = () => {
    const [roleName, setRoleName] = useState("");
    const modalRef = useRef(null);
  
    useEffect(() => {
      const modalElement = modalRef.current;
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modalRef.current.modalInstance = modal;
        modal.show()
      }
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Role Name:", roleName);
      setRoleName("");
      modalRef.current.modalInstance.hide(); // Properly close modal
    };
  
    return (
      <>
        {/* Trigger Button */}
        {/* <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addRoleModal"
        >
          Add Role
        </button> */}
  
        {/* Modal */}
        <div className="modal fade" id="addRoleModal" tabIndex="-1" ref={modalRef} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Role</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
  
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <p>Please enter below details to create a role</p>
                  <div className="mb-3">
                    <label htmlFor="roleName" className="form-label">
                      Role name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="roleName"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      placeholder="Enter role name"
                      required
                    />
                  </div>
                </div>
  
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default NewRole;