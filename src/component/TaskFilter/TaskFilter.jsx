import React from 'react';

const TaskFilter = ({ filter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex justify-between items-center border-t pt-4">
      <div className="space-x-2">
        {filters.map(({ value, label }) => (
          <button 
            key={value}
            onClick={() => onFilterChange(value)}
            className={`
              px-3 py-1 rounded transition
              ${filter === value 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
      <button 
        className="text-red-500 hover:bg-red-100 px-3 py-1 rounded"
        onClick={() => {/* Clear completed todos */}}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TaskFilter;