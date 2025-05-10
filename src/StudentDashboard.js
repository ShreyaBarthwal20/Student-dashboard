import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import studentsData from './students.json';
import StudentList from './StudentList';
import StudentModal from './StudentModal';

function StudentDashboard() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : studentsData;
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [newStudent, setNewStudent] = useState({
    name: '',
    department: '',
    subject: '',
    enrollment: ''
  });

  const handleAddStudent = (e) => {
    e.preventDefault();
    const trimmedSubjects = newStudent.subject
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (
      newStudent.name &&
      newStudent.department &&
      trimmedSubjects.length &&
      newStudent.enrollment
    ) {
      setStudents([...students, { ...newStudent, subject: trimmedSubjects }]);
      setNewStudent({ name: '', department: '', subject: '', enrollment: '' });
    } else {
      alert("Please fill all the fields.");
    }
  };

  const handleRemoveStudent = (enrollment) => {
    const updated = students.filter((s) => s.enrollment !== enrollment);
    setStudents(updated);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleSort = (students) => {
    return [...students].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
  };

  const uniqueDepartments = ["All", ...new Set(students.map((s) => s.department))];

  const filteredStudents = students.filter((stu) => {
    const matchesDept = departmentFilter === "All" || stu.department === departmentFilter;
    const matchesSearch =
      stu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.enrollment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const sortedStudents = handleSort(filteredStudents);

  const handleExportCSV = () => {
    const headers = ["Name", "Department", "Subjects", "Enrollment"];
    const rows = students.map(s => [
      s.name,
      s.department,
      Array.isArray(s.subject) ? s.subject.join(" | ") : s.subject,
      s.enrollment
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(row => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>

      <form onSubmit={handleAddStudent}>
        <input type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
        <input type="text" placeholder="Department" value={newStudent.department} onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })} />
        <input type="text" placeholder="Subjects (comma separated)" value={newStudent.subject} onChange={(e) => setNewStudent({ ...newStudent, subject: e.target.value })} />
        <input type="text" placeholder="Enrollment" value={newStudent.enrollment} onChange={(e) => setNewStudent({ ...newStudent, enrollment: e.target.value })} />
        <button type="submit">Add Student</button>
      </form>

      <div className="filter">
        <label>Filter by Department: </label>
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
          {uniqueDepartments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>

        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="department">Department</option>
          <option value="enrollment">Enrollment</option>
        </select>

        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          style={{
            padding: '8px 12px',
            backgroundColor: '#0a5c25',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}
        >
          {viewMode === 'list' ? 'Grid View' : 'List View'}
        </button>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Search by name or enrollment"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            width: '100%'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px', textAlign: 'right' }}>
        <button
          onClick={handleExportCSV}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0a5c25',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Export CSV
        </button>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Total Students:</strong> {sortedStudents.length}
      </div>

      {sortedStudents.length > 0 ? (
        <StudentList
          students={sortedStudents}
          handleRemove={handleRemoveStudent}
          handleSelect={handleSelectStudent}
          viewMode={viewMode}
        />
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '30px 0',
          color: '#777',
          fontSize: '16px'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>📭</div>
          No students found matching your criteria.
        </div>
      )}

      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}

export default StudentDashboard;
