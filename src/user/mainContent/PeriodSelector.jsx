import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { getAcademicPeriodDetails, getAcademicYearDetails } from '../../services/api';

// Period Selector Component
const PeriodSelector = ({ selectedPeriod, onPeriodChange, periods }) => {
  const [periodOptions, setPeriodOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generate fee bracket labels for periods
  useEffect(() => {
    const generatePeriodLabels = async () => {
      if (!periods || periods.length === 0) return;

      try {
        setLoading(true);
        const options = await Promise.all(
          periods.map(async (period) => {
            try {
              // Get academic period details
              const periodDetails = await getAcademicPeriodDetails(period.id);
              
              // Get academic year details
              const yearDetails = await getAcademicYearDetails(periodDetails.academic_year_id);
              
              // Generate fee bracket format
              const label = `${periodDetails.term} ${yearDetails.name}`;
              
              return {
                id: period.id,
                label: label,
                originalPeriod: period
              };
            } catch (error) {
              console.error(`Error generating label for period ${period.id}:`, error);
              // Fallback to original name or ID
              return {
                id: period.id,
                label: period.name || `Period ${period.id}`,
                originalPeriod: period
              };
            }
          })
        );
        
        setPeriodOptions(options);
      } catch (error) {
        console.error('Error generating period labels:', error);
        // Fallback to original periods
        setPeriodOptions(periods.map(period => ({
          id: period.id,
          label: period.name || `Period ${period.id}`,
          originalPeriod: period
        })));
      } finally {
        setLoading(false);
      }
    };

    generatePeriodLabels();
  }, [periods]);

  return (
    <div className="flex items-center gap-2">
      <Calendar className="text-gray-500" size={20} />
      <select
        value={selectedPeriod}
        onChange={(e) => onPeriodChange(e.target.value)}
        className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
        disabled={loading}
      >
        {loading ? (
          <option value="">Loading periods...</option>
        ) : periodOptions && periodOptions.length > 0 ? (
          periodOptions.map(period => (
            <option key={period.id} value={period.id}>
              {period.label}
            </option>
          ))
        ) : (
          <option value="">No periods available</option>
        )}
      </select>
    </div>
  );
};

export default PeriodSelector;