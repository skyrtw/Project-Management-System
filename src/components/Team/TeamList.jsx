import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const TeamList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    role: "Developer",
  });
  const [showModal, setShowModal] = useState(false);

  // Load members from localStorage when the component mounts
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];
    setTeamMembers(storedMembers);
  }, []);

  // Handle Edit Button Click (Open Modal)
  const handleEditClick = (member) => {
    setSelectedMember(member);
    setEditData(member);
    setShowModal(true);
  };

  // Handle Save Changes (Update Member in LocalStorage)
  const handleSaveChanges = () => {
    const updatedMembers = teamMembers.map((member) =>
      member.id === selectedMember.id ? editData : member
    );
    setTeamMembers(updatedMembers);
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
    setShowModal(false);
  };

  // Handle Delete Member
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this member?");
    
    if (isConfirmed) {
      const filteredMembers = teamMembers.filter((member) => member.id !== id);
      setTeamMembers(filteredMembers);
      localStorage.setItem("teamMembers", JSON.stringify(filteredMembers));
    }
  };
  

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Team Members</h2>

      {teamMembers.length === 0 ? (
        <div className="alert alert-warning text-center">No team members available.</div>
      ) : (
        <div className="row">
          {teamMembers.map((member) => (
            <div key={member.id} className="col-md-6 col-lg-12 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p><strong>Role:</strong> {member.role}</p>

                  <div className="d-flex justify-content-start gap-1">
                    <button className="btn btn-primary" onClick={() => handleEditClick(member)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(member.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Member Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Member</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-control"
                      value={editData.role}
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                    >
                    <option value="Developer">Developer</option>
                <option value="Manager">Manager</option>
                <option value="Designer">Designer</option>
                <option value="QA">QA</option>
                <option value="Tester">Tester</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-success" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamList;
