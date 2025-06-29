import React from 'react';
import { Users } from 'lucide-react';

// Student Info Card Component
const StudentInfoCard = ({ student }) => {
  console.log('StudentInfoCard student object:', student);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
          <Users className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-gray-600">Class: {student.class} | Student ID: {student.studentId}</p>
          <p className="text-gray-600 mt-1">Parent's Contact: {student.parentContact}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;