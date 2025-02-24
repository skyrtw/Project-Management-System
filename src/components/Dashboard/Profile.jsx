import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logged-in user details from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setEditUser(loggedInUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Handle input change in edit form
  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUser({ ...editUser, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ FIX: Save updated details & update localStorage
  const handleSave = () => {
    let users = JSON.parse(localStorage.getItem("users")) || []; // Get all users
  
    const updatedUsers = users.map((u) =>
      u.email === user.email ? editUser : u
    ); // Replace the matching user with updated data
  
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save updated users list
    localStorage.setItem("loggedInUser", JSON.stringify(editUser)); // Update logged-in user
    setUser(editUser); // Update UI state
    setShowModal(false); // Close modal
  };
  
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card shadow-lg text-center">
            <div className="card-body">
              {/* Display Profile Picture */}
              <img
                src={user.profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h2 className="card-title mb-4">{user.name}</h2>
              <p className="card-text"><strong>Email:</strong> {user.email}</p>
              <p className="card-text"><strong>Role:</strong> {user.role}</p>
              <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
              <p className="card-text"><strong>Company:</strong> {user.company}</p>
              <p className="card-text"><strong>Address:</strong> {user.address}</p>
              <p className="card-text"><strong>Bio:</strong> {user.bio}</p>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>Edit</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  {/* Profile Picture Upload */}
                  <div className="mb-3 text-center">
                    <label className="form-label">Profile Picture</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleProfilePicUpload} />
                    <img
                      src={editUser.profilePic || "https://via.placeholder.com/150"}
                      alt="Preview"
                      className="rounded-circle mt-2"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" value={editUser.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" value={editUser.email} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" name="phone" className="form-control" value={editUser.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Company</label>
                    <input type="text" name="company" className="form-control" value={editUser.company} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" name="address" className="form-control" value={editUser.address} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea name="bio" className="form-control" value={editUser.bio} onChange={handleChange}></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
