import React, { useState } from "react";

const MemberForm = ({ onSubmit, member }) => {
  const [name, setName] = useState(member ? member.name : "");
  const [role, setRole] = useState(member ? member.role : "Developer");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = { id: member ? member.id : Date.now(), name, role };

    // Retrieve existing members from localStorage
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];

    if (member) {
      // Update existing member
      const updatedMembers = storedMembers.map((m) => (m.id === member.id ? newMember : m));
      localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
    } else {
      // Add new member
      storedMembers.push(newMember);
      localStorage.setItem("teamMembers", JSON.stringify(storedMembers));
    }

    // Pass new member to the parent component (if needed)
    if (onSubmit) {
      onSubmit(newMember);
    }

    // Clear form fields after submission
    setName("");
    setRole("Developer");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">{member ? "Edit Member" : "Add New Member"}</h2>

          <div className="mb-3">
            <label className="form-label w-100">
              Name:
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label w-100">
              Role:
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Developer">Developer</option>
                <option value="Manager">Manager</option>
                <option value="Designer">Designer</option>
                <option value="QA">QA</option>
                <option value="Tester">Tester</option>
              </select>
            </label>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Save Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberForm;
