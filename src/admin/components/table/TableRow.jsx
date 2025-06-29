import { Edit, Trash2, Save, X } from 'lucide-react';
import { getTableConfig } from '../../utils/tableConfig';
import React, { useState } from 'react';

// Table Row Component
const TableRow = ({ item, section, onEdit, onDelete }) => {
  const config = getTableConfig(section);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...item });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(editData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...item });
  };

  // Helper for responsive cell classes
  const responsiveCell = (header) => (
    (header === 'Notes' || header === 'Updated At' || header === 'Created At' || header === 'Description' || header === 'Planned Events' || header === 'Holidays' || header === 'Parent Contact' || header === 'Middle Name' || header === 'Address') ? 'hidden md:table-cell' : ''
  );

  if (section === 'Academic Years' || section === 'Students' || section === 'Departments' || section === 'Classes') {
    // For Departments, use the schema fields
    if (section === 'Departments') {
      return (
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="text" name="name" value={editData.name || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="text" name="description" value={editData.description || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.description}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.created_at}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.updated_at}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                    <Save className="w-4 h-4" />
                  </button>
                  <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50">
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </td>
        </tr>
      );
    }
    // For Students, use the schema fields
    if (section === 'Students') {
      return (
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="text" name="first_name" value={editData.first_name || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.first_name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="text" name="middle_name" value={editData.middle_name || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.middle_name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="text" name="last_name" value={editData.last_name || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.last_name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="text" name="parent_contact" value={editData.parent_contact || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.parent_contact}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="date" name="date_of_birth" value={editData.date_of_birth || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.date_of_birth}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="text" name="address" value={editData.address || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.address}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="number" name="department_id" value={editData.department_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.department_id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="number" name="class_id" value={editData.class_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.class_id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="date" name="enrollment_date" value={editData.enrollment_date || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.enrollment_date}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <select name="status" value={editData.status || 'active'} onChange={handleInputChange} className="border rounded px-2 py-1 w-full">
                <option value="active">active</option>
                <option value="inactive">inactive</option>
                <option value="graduated">graduated</option>
                <option value="transferred">transferred</option>
              </select>
            ) : item.status}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="checkbox" name="new_admission" checked={!!editData.new_admission} onChange={e => setEditData(prev => ({ ...prev, new_admission: e.target.checked }))} />
            ) : (item.new_admission ? 'Yes' : 'No')}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.created_at}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.updated_at}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                    <Save className="w-4 h-4" />
                  </button>
                  <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50">
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </td>
        </tr>
      );
    }
    // For Classes, use the schema fields
    if (section === 'Classes') {
      return (
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="text" name="name" value={editData.name || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {isEditing ? (
              <input type="number" name="department_id" value={editData.department_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
            ) : item.department_id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.created_at}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.updated_at}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                    <Save className="w-4 h-4" />
                  </button>
                  <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50">
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </td>
        </tr>
      );
    }
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          ) : (
            item.name
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input
              type="date"
              name="from_date"
              value={editData.from_date}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          ) : (
            item.from_date
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input
              type="date"
              name="to_date"
              value={editData.to_date}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          ) : (
            item.to_date
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                  <Save className="w-4 h-4" />
                </button>
                <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50">
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }

  // For Academic Periods, use the schema fields
  if (section === 'Academic Periods') {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="text" name="term" value={editData.term || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.term}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="academic_year_id" value={editData.academic_year_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.academic_year_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="date" name="from_date" value={editData.from_date || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.from_date}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="date" name="to_date" value={editData.to_date || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.to_date}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="text" name="holidays" value={Array.isArray(editData.holidays) ? editData.holidays.join(',') : ''} onChange={e => setEditData(prev => ({ ...prev, holidays: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} className="border rounded px-2 py-1 w-full" />
          ) : (Array.isArray(item.holidays) ? item.holidays.join(', ') : '')}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="text" name="planned_event_dates" value={Array.isArray(editData.planned_event_dates) ? editData.planned_event_dates.join(',') : ''} onChange={e => setEditData(prev => ({ ...prev, planned_event_dates: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} className="border rounded px-2 py-1 w-full" />
          ) : (Array.isArray(item.planned_event_dates) ? item.planned_event_dates.join(', ') : '')}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="date" name="exams_from" value={editData.exams_from || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.exams_from}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="date" name="exams_to" value={editData.exams_to || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.exams_to}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="date" name="vacation_date" value={editData.vacation_date || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.vacation_date}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <select name="period_status" value={editData.period_status || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full">
              <option value="">Select</option>
              <option value="current">current</option>
              <option value="old">old</option>
            </select>
          ) : item.period_status}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.created_at}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.updated_at}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                  <Save className="w-4 h-4" />
                </button>
                <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50">
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }

  // For School Fees, use the schema fields
  if (section === 'School Fees') {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="department_id" value={editData.department_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.department_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="class_id" value={editData.class_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.class_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="academic_period_id" value={editData.academic_period_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.academic_period_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" step="0.01" name="required_amount" value={editData.required_amount || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.required_amount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.created_at}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.updated_at}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                  <Save className="w-4 h-4" />
                </button>
                <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50">
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }

  // For Exam Fees, use the schema fields
  if (section === 'Exam Fees') {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="department_id" value={editData.department_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.department_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="class_id" value={editData.class_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.class_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="academic_period_id" value={editData.academic_period_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.academic_period_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" step="0.01" name="required_amount" value={editData.required_amount || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.required_amount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.created_at}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.updated_at}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                  <Save className="w-4 h-4" />
                </button>
                <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50">
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }

  // For Other Bills, use the schema fields
  if (section === 'Other Bills') {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="text" name="name" value={editData.name || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="text" name="description" value={editData.description || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.description}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="academic_period_id" value={editData.academic_period_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.academic_period_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" step="0.01" name="required_amount" value={editData.required_amount || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.required_amount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="student_id" value={editData.student_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.student_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="class_id" value={editData.class_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.class_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {isEditing ? (
            <input type="number" name="department_id" value={editData.department_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />
          ) : item.department_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.created_at}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.updated_at}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                  <Save className="w-4 h-4" />
                </button>
                <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50">
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }

  // For Payments, use the schema fields
  if (section === 'Payments') {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{isEditing ? (<input type="number" name="student_id" value={editData.student_id || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />) : item.student_id}</td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{isEditing ? (<input type="text" name="fee_type" value={editData.fee_type || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />) : item.fee_type}</td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{isEditing ? (<input type="text" name="fee_bracket" value={editData.fee_bracket || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />) : item.fee_bracket}</td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{isEditing ? (<input type="text" name="payment_method" value={editData.payment_method || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />) : item.payment_method}</td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{isEditing ? (<input type="text" name="payment_made_by" value={editData.payment_made_by || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />) : item.payment_made_by}</td>
        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-900 ${responsiveCell('Contact')}`}>{isEditing ? (<input type="text" name="contact_of_person_paying" value={editData.contact_of_person_paying || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />) : item.contact_of_person_paying}</td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{isEditing ? (<input type="number" step="0.01" name="invoice_amount" value={editData.invoice_amount || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />) : item.invoice_amount}</td>
        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-900 ${responsiveCell('Notes')}`}>{isEditing ? (<input type="text" name="notes" value={editData.notes || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" />) : item.notes}</td>
        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-900 ${responsiveCell('Created At')}`}>{item.created_at}</td>
        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-900 ${responsiveCell('Updated At')}`}>{item.updated_at}</td>
        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50" aria-label="Save"><Save className="w-4 h-4" /></button>
                <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50" aria-label="Cancel"><X className="w-4 h-4" /></button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50" aria-label="Edit"><Edit className="w-4 h-4" /></button>
                <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }

  // Default for other sections
  const rowData = config.getRowData(item, section);
  return (
    <tr className="hover:bg-gray-50">
      {rowData.map((cellData, cellIndex) => (
        <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {cellData}
        </td>
      ))}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onEdit(item)}
            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(item)}
            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;