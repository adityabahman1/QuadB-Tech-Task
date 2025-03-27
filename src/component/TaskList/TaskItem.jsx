import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Flag, 
  ChevronDown 
} from 'lucide-react';
import { PRIORITY_LEVELS } from '../../hooks/useTodoReducer';

const PriorityBadge = ({ priority, completed }) => {
  const badgeStyles = {
    'Low': completed ? 'bg-green-100 text-green-700' : 'bg-green-50 text-green-600',
    'Medium': completed ? 'bg-yellow-100 text-yellow-700' : 'bg-yellow-50 text-yellow-600',
    'High': completed ? 'bg-red-100 text-red-700' : 'bg-red-50 text-red-600'
  };

  return (
    <span 
      className={`
        inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
        ${badgeStyles[priority.label]}
      `}
    >
      <Flag className="w-3 h-3 mr-1" />
      {priority.label}
    </span>
  );
};

const PriorityDropdown = ({ 
  priority, 
  onUpdatePriority, 
  taskId, 
  completed 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const priorityOptions = Object.values(PRIORITY_LEVELS);

  const handlePriorityChange = (newPriority) => {
    onUpdatePriority(taskId, newPriority);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center text-sm 
          ${completed ? 'text-gray-400' : 'text-gray-700'}
        `}
      >
        <PriorityBadge priority={priority} completed={completed} />
        <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
      </button>

      {isOpen && (
        <div className="
          absolute z-10 mt-1 w-40 
          bg-white border rounded-lg shadow-lg
        ">
          {priorityOptions.map(p => (
            <button
              key={p.label}
              onClick={() => handlePriorityChange(p)}
              className={`
                w-full flex items-center p-2 text-left 
                hover:bg-gray-100
                ${priority.label === p.label ? 'bg-blue-50' : ''}
              `}
              disabled={completed}
            >
              <Flag className={`
                w-4 h-4 mr-2
                ${p.label === 'Low' ? 'text-green-500' : 
                  p.label === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                }
              `} />
              {p.label} Priority
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TaskItem = ({ 
  task, 
  onDelete, 
  onToggleComplete, 
  onUpdatePriority 
}) => {
  return (
    <div 
      className={`
        group flex items-center justify-between p-4 rounded-lg mb-3 
        transition-all duration-200 ease-in-out
        ${task.completed 
          ? 'bg-gray-100 hover:bg-gray-200' 
          : 'bg-white hover:bg-blue-50 hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-center space-x-4 flex-grow">
        <button 
          onClick={() => onToggleComplete(task.id)}
          className={`
            w-6 h-6 rounded-full flex items-center justify-center
            ${task.completed 
              ? 'bg-blue-500 text-white' 
              : 'border-2 border-gray-300 hover:border-blue-500'
            }
          `}
        >
          {task.completed ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Circle className="w-4 h-4 text-gray-300" />
          )}
        </button>

        <div className="flex-grow">
          <p 
            className={`
              ${task.completed 
                ? 'line-through text-gray-500' 
                : 'text-gray-800'
              } text-sm
            `}
          >
            {task.text}
          </p>
        </div>

        <PriorityDropdown 
          priority={task.priority}
          onUpdatePriority={onUpdatePriority}
          taskId={task.id}
          completed={task.completed}
        />

        <button 
          onClick={() => onDelete(task.id)}
          className="
            text-red-500 hover:bg-red-100 p-2 rounded-full 
            opacity-0 group-hover:opacity-100 transition-opacity
          "
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const TaskList = ({ 
  tasks, 
  onDeleteTask, 
  onToggleTaskCompletion,
  onUpdateTaskPriority
}) => {
  // Sort tasks by priority and completion status
  const sortedTasks = [...tasks].sort((a, b) => {
    // Uncompleted tasks first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by priority (High > Medium > Low)
    const priorityOrder = {
      'High': 3,
      'Medium': 2,
      'Low': 1
    };
    
    return priorityOrder[b.priority.label] - priorityOrder[a.priority.label];
  });

  return (
    <div className="space-y-2">
      {sortedTasks.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <Circle className="mx-auto h-12 w-12 mb-4 text-gray-300" />
          <p>No tasks yet. Start by adding a new task!</p>
        </div>
      ) : (
        sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onToggleComplete={onToggleTaskCompletion}
            onUpdatePriority={onUpdateTaskPriority}
          />
        ))
      )}
    </div>
  );
};

export { TaskList, TaskItem };