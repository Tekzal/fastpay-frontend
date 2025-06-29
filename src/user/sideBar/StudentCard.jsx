import React from 'react';

// Student Card Component
const StudentCard = ({ student, isSelected, onSelect }) => (
    <div
      onClick={() => onSelect(student)}
      className={`p-4 rounded-xl cursor-pointer transition-all hover:shadow-md ${
        isSelected
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <div className="font-semibold text-lg">{student.name}</div>
      <div className="text-sm opacity-80">
        Class: {student.class_name} | ID: {student.studentId}
      </div>
      <div className="text-sm opacity-80 mt-1">
        <b>Contact: {student.parentContact}</b>
      </div>
      <div className="text-xs mt-1">
        {student.newAdmission ? (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">New Admission</span>
        ) : (
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Continuing</span>
        )}
      </div>
    </div>
  );
  
  export default StudentCard;