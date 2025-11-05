import React, { useEffect, useState } from "react";
import "./dfirst.css";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export const StudentDashboard = () => {
  const [studentList, setStudentList] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    degree: "",
    specilization: "",
    phone_no: "",
    address: "",
  });

  const [newForm, setNewForm] = useState({
    reg: "",
    name: "",
    degree: "",
    specilization: "",
    phone_no: "",
    address: "",
  });

  const [showMobileMenu, setShowMobileMenu] = useState(false); // Mobile menu state

  const navigate = useNavigate();
  const url = "https://backend-stud-ws6b.vercel.app";

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    let ignore = false;
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${url}/stud_data`, authHeaders());
        if (!ignore) setStudentList(res.data);
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        setStudentList([]);
      }
    };
    fetchStudents();
    return () => {
      ignore = true;
    };
  }, [navigate]);

  const filteredStudents = studentList.filter((stud) => {
    const searchMatch =
      searchText === "" ||
      stud.name.toLowerCase().includes(searchText.toLowerCase()) ||
      stud.reg.toString().includes(searchText) ||
      stud.degree.toLowerCase().includes(searchText.toLowerCase()) ||
      stud.specilization.toLowerCase().includes(searchText.toLowerCase());

    const filterMatch = filterType === "" || stud.degree === filterType;
    return searchMatch && filterMatch;
  });

  const deleteStudent = async () => {
    try {
      await axios.delete(`${url}/del/${selectedStudent.reg}`, authHeaders());
      setStudentList((prev) =>
        prev.filter((s) => s.reg !== selectedStudent.reg)
      );
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Delete Failed:", err.response?.data || err.message);
    }
  };

  const updateStudent = async () => {
    try {
      await axios.put(
        `${url}/update/${selectedStudent.reg}`,
        editForm,
        authHeaders()
      );
      setStudentList((prev) =>
        prev.map((s) =>
          s.reg === selectedStudent.reg ? { ...editForm, reg: s.reg } : s
        )
      );
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const addStudent = async () => {
    try {
      await axios.post(`${url}/insert_data`, newForm, authHeaders());
      setStudentList((prev) => [...prev, newForm]);
      setShowNewModal(false);
      setNewForm({
        reg: "",
        name: "",
        degree: "",
        specilization: "",
        phone_no: "",
        address: "",
      });
    } catch (err) {
      console.error("Add Failed:", err.response?.data || err.message);
    }
  };

  const handleEdit = (stud) => {
    setSelectedStudent(stud);
    setEditForm(stud);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleNewChange = (e) => {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };

  const handleViewProfile = (stud) => {
    navigate("/shortlist", { state: stud });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="student-container">
      {/* 🔝 Top Bar */}
      <div className="top-bar">
        <h2>Student Dashboard</h2>

        {/* Desktop Right */}
        <div className="top-right">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by Name, Reg, Degree..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="logout-btn" onClick={handleLogout}>
            <LogoutIcon /> Logout
          </button>
        </div>

        {/* Mobile 3-dot */}
        <div
          className="mobile-menu-icon"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          ⋮
        </div>
      </div>

      {/* Mobile dropdown */}
      {showMobileMenu && (
        <div className="mobile-dropdown">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="logout-btn" onClick={handleLogout}>
            <LogoutIcon /> Logout
          </button>
        </div>
      )}

      {/* Buttons */}
      <div className="top-btns">
        <button className="stbtn1" onClick={() => setShowNewModal(true)}>
          <PersonAddIcon /> New Student
        </button>

        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Degrees</option>
          <option value="BSC">BSC</option>
          <option value="MSC">MSC</option>
          <option value="MCA">MCA</option>
        </select>
      </div>

      <hr className="hr2" />

      {/* 🧾 Student Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="thead-tr">
              <th>S.No</th>
              <th>Reg No</th>
              <th>Name</th>
              <th>Degree</th>
              <th>Specialization</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((stud, idx) => (
              <tr key={stud.reg}>
                <td>{idx + 1}</td>
                <td>{stud.reg}</td>
                <td
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  onClick={() => handleViewProfile(stud)}
                >
                  {stud.name}
                </td>
                <td>{stud.degree}</td>
                <td>{stud.specilization}</td>
                <td>{stud.phone_no}</td>
                <td>{stud.address}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(stud)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      setSelectedStudent(stud);
                      setShowDeleteModal(true);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="popup-overlay">
          <div className="popup-card">
            <p>
              Delete student <b>{selectedStudent?.name}</b>?
            </p>
            <div className="popup-buttons">
              <button onClick={deleteStudent}>Delete</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="popup-overlay">
          <div className="popup-card">
            <p>Edit Student</p>
            <input
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Name"
            />
            <input
              name="degree"
              value={editForm.degree}
              onChange={handleEditChange}
              placeholder="Degree"
            />
            <input
              name="specilization"
              value={editForm.specilization}
              onChange={handleEditChange}
              placeholder="Specialization"
            />
            <input
              name="phone_no"
              value={editForm.phone_no}
              onChange={handleEditChange}
              placeholder="Phone"
            />
            <input
              name="address"
              value={editForm.address}
              onChange={handleEditChange}
              placeholder="Address"
            />
            <div className="popup-buttons">
              <button onClick={updateStudent}>Update</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* New Student Modal */}
      {showNewModal && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Add New Student</h3>
            <input
              name="reg"
              value={newForm.reg}
              onChange={handleNewChange}
              placeholder="Reg No"
            />
            <input
              name="name"
              value={newForm.name}
              onChange={handleNewChange}
              placeholder="Name"
            />
            <input
              name="degree"
              value={newForm.degree}
              onChange={handleNewChange}
              placeholder="Degree"
            />
            <input
              name="specilization"
              value={newForm.specilization}
              onChange={handleNewChange}
              placeholder="Specialization"
            />
            <input
              name="phone_no"
              value={newForm.phone_no}
              onChange={handleNewChange}
              placeholder="Phone"
            />
            <input
              name="address"
              value={newForm.address}
              onChange={handleNewChange}
              placeholder="Address"
            />
            <div className="popup-buttons">
              <button onClick={addStudent}>Add</button>
              <button onClick={() => setShowNewModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
