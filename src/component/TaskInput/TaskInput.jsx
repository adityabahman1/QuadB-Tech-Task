import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      console.log('Adding Task:', taskText);
      onAddTask(taskText);
      setTaskText('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="flex items-center bg-white shadow-sm rounded-lg border border-neutral-200 overflow-hidden">
          {/* Input Field */}
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="What needs to be done?"
            className="
              w-full p-4 text-lg border-none focus:ring-2 focus:ring-emerald-500
              focus:outline-none placeholder-neutral-400 text-neutral-700
            "
          />
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!taskText.trim()}
            className="
              bg-emerald-500 text-white px-6 py-4 hover:bg-emerald-600
              transition-all disabled:opacity-50 disabled:cursor-not-allowed 
              flex items-center justify-center rounded-r-lg
            "
          >
            <Plus className="w-6 h-6" />
            <span className="ml-2 hidden md:inline-block text-lg">Add Task</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
