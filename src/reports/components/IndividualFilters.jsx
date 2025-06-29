import React from 'react';

const IndividualFilters = ({
  filters,
  setFilters,
  classOptions = [],
  departmentOptions = [],
  feeTypeOptions = [],
  periodOptions = [],
  periodStartDate,
  periodEndDate
}) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.periodId || ''}
          onChange={e => setFilters(f => ({ ...f, periodId: e.target.value }))}
        >
          <option value="">Select Period</option>
          {periodOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Fee Type</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.feeType || ''}
          onChange={e => setFilters(f => ({ ...f, feeType: e.target.value }))}
        >
          <option value="">Select Fee Type</option>
          {feeTypeOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
        <input
          type="date"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.fromDate || ''}
          min={periodStartDate || ''}
          max={periodEndDate || ''}
          onChange={e => setFilters(f => ({ ...f, fromDate: e.target.value }))}
          disabled={!periodStartDate || !periodEndDate}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
        <input
          type="date"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.toDate || ''}
          min={periodStartDate || ''}
          max={periodEndDate || ''}
          onChange={e => setFilters(f => ({ ...f, toDate: e.target.value }))}
          disabled={!periodStartDate || !periodEndDate}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.classId || ''}
          onChange={e => setFilters(f => ({ ...f, classId: e.target.value }))}
        >
          <option value="">All Classes</option>
          {classOptions.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.departmentId || ''}
          onChange={e => setFilters(f => ({ ...f, departmentId: e.target.value }))}
        >
          <option value="">All Departments</option>
          {departmentOptions.map(dep => (
            <option key={dep.id} value={dep.id}>{dep.name}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Paid Below (%)</label>
        <input
          type="number"
          placeholder="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.paidBelow || ''}
          onChange={e => setFilters(f => ({ ...f, paidBelow: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Paid ≥ (%)</label>
        <input
          type="number"
          placeholder="100"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.paidGte || ''}
          onChange={e => setFilters(f => ({ ...f, paidGte: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.status || ''}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
        >
          <option value="">All Statuses</option>
          <option value="Fully Paid">Fully Paid</option>
          <option value="Almost Paid">Almost Paid</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Not Paid">Not Paid</option>
        </select>
      </div>
    </div>
  </>
);

export default IndividualFilters; 