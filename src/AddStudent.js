// src/components/AddStudent.js import React, { useState } from "react"; import "../styles/AddStudent.css";

const AddStudent = ({ onAdd }) => { const [student, setStudent] = useState({ name: "", department: "", subject: "", enrollment: "", });

const handleChange = (e) => { setStudent({ ...student, [e.target.name]: e.target.value }); };

const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSubjects = student.subject
      .split(',')
      .map(sub => sub.trim())
      .filter(Boolean);
  
    if (
      student.name &&
      student.department &&
      trimmedSubjects.length &&
      student.enrollment
    ) {
      onAdd({
        ...student,
        subject: trimmedSubjects, // store as array
      });
      setStudent({
        name: '',
        department: '',
        subject: '',
        enrollment: ''
      });
    } else {
      alert("Please fill all fields correctly.");
    }
  };
  

return ( <form className="add-student-form" onSubmit={handleSubmit}> <input
type="text"
name="name"
value={student.name}
onChange={handleChange}
placeholder="Student Name"
/> <input
type="text"
name="department"
value={student.department}
onChange={handleChange}
placeholder="Department"
/> <input
  type="text"
  name="subject"
  value={student.subject}
  onChange={handleChange}
  placeholder="Subjects (comma separated)"
/>
 <input
type="text"
name="enrollment"
value={student.enrollment}
onChange={handleChange}
placeholder="Enrollment No."
/> <button type="submit">Add Student</button> </form> ); };

export default AddStudent;