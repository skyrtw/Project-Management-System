import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]); // Load team members
  const [selectedTask, setSelectedTask] = useState(null);
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    deadline: "",
    priority: "",
    assignedTo: "", 
    project:"",// New field for assignment
  });
  const [showModal, setShowModal] = useState(false);

  // Load tasks and team members from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];
    setTeamMembers(storedMembers);
  }, []);

  // Handle Edit Button Click (Open Modal)
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditData(task);
    setShowModal(true);
  };

  const handleDelete = (task) =>{
    const isConfirmed = window.confirm("Are you sure you want to delete this member?");
    if(isConfirmed){
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };
  
  // Handle Save Changes (Update Task in LocalStorage)
  const handleSaveChanges = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? editData : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Tasks</h2>

      {tasks.length === 0 ? (
        <div className="alert alert-warning text-center">No tasks available.</div>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div key={task.id} className="col-md-6 col-lg-12 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text text-muted">{task.description}</p>
                  <p><strong>Project:</strong> {task.projectName || "Not Assigned"}</p>
                  <p><strong>Status:</strong> {task.status}</p>
                  <p><strong>Deadline:</strong> {task.deadline}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <p><strong>Assigned To:</strong> {task.assignedTo || "Not Assigned"}</p>
                  <div className="d-flex justify-content-start gap-1">
                    <button className="btn btn-primary" onClick={() => handleEditClick(task)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={()=>handleDelete(task)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Task Modal */}
      {showModal && ( 
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-control" value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })}>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      value={editData.deadline}
                      onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.priority}
                      onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Assign to Team Member</label>
                    <select
                      className="form-control"
                      value={editData.assignedTo}
                      onChange={(e) => setEditData({ ...editData, assignedTo: e.target.value })}
                    >
                      <option value="">Select Member</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name} - {member.role}
                        </option>
                      ))}
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

export default TaskList;
