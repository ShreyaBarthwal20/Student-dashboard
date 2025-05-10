import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const getInitials = (name) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const StudentList = ({ students, handleRemove, handleSelect, viewMode }) => {
  const isGrid = viewMode === "grid";

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    padding: 0,
    listStyle: 'none'
  };

  return (
    <TransitionGroup component="ul" className="student-list" style={isGrid ? gridStyles : {}}>
      {students.map((student) => {
        const nodeRef = React.createRef();
        return (
          <CSSTransition
            key={student.enrollment}
            timeout={300}
            classNames="fade-slide"
            nodeRef={nodeRef}
          >
            <li
              className="student-item"
              ref={nodeRef}
              onClick={() => handleSelect(student)}
              style={isGrid ? { cursor: 'pointer', flexDirection: 'column' } : { display: 'flex', alignItems: 'center' }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#cfe9ce',
                  color: '#0a5c25',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginRight: isGrid ? 0 : '15px',
                  marginBottom: isGrid ? '10px' : 0,
                  alignSelf: isGrid ? 'center' : 'flex-start'
                }}
              >
                {getInitials(student.name)}
              </div>

              {/* Info */}
              <div className="student-info" style={{ flex: 1, width: '100%' }}>
                <div className="student-name">{student.name}</div>
                <div className="student-subject"><strong>Enrollment:</strong> {student.enrollment}</div>
                <div className="student-subject"><strong>Department:</strong> {student.department}</div>
                <div className="student-subject">
                  <strong>Subjects:</strong>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {(Array.isArray(student.subject) ? student.subject : [student.subject]).map((subj, idx) => (
                      <span key={idx} className="subject-badge">
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(student.enrollment);
                }}
                className="remove-button"
                style={{ marginTop: isGrid ? '10px' : 0 }}
              >
                Remove
              </button>
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default StudentList;
