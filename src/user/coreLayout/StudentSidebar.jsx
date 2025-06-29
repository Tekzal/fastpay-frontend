import React from 'react';
import Logo from '../sideBar/Logo';
import SearchInput from '../sideBar/SearchInput';
import StudentCard from '../sideBar/StudentCard';

// Student Sidebar Component
const StudentSidebar = ({ students, selectedStudent, searchTerm, onSearchChange, onStudentSelect, isOpen }) => {
    const lowerSearchTerm = (searchTerm || '').toLowerCase();
    const filteredStudents = (students || []).filter(student =>
      (student?.name?.toLowerCase() || '').includes(lowerSearchTerm) ||
      (student?.studentId?.toLowerCase() || '').includes(lowerSearchTerm)
    );
  
    return (
      <aside 
        className={`fixed inset-y-0 left-0 z-20 w-80 bg-white shadow-lg border-r border-gray-200 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-auto`}
      >
        <div className="p-6">
          <Logo />
          <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>
        <div className="px-6 pb-6 overflow-y-auto flex-1 h-[calc(100vh-150px)]">
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                isSelected={selectedStudent?.id === student.id}
                onSelect={onStudentSelect}
              />
            ))}
          </div>
        </div>
      </aside>
    );
  };

  export default StudentSidebar;