import React from 'react';
import { Users } from 'lucide-react';

// Student Info Card Component
const StudentInfoCard = ({ student }) => {
  console.log('StudentInfoCard student object:', student);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Users className="text-white w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{student.name}</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Class: {student.class_name} | Student ID: {student.studentId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;