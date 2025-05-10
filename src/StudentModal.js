import React from 'react';

const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Student Details</h3>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Enrollment:</strong> {student.enrollment}</p>
        <p><strong>Department:</strong> {student.department}</p>
        <p><strong>Subjects:</strong></p>
        <ul>
          {(Array.isArray(student.subject) ? student.subject : [student.subject]).map((subj, idx) => (
            <li key={idx}>{subj}</li>
          ))}
        </ul>
        <button onClick={onClose} style={styles.button}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    textAlign: 'left'
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#0a5c25',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default StudentModal;
