import React, { useState } from 'react';
import { useTodo } from '../hooks/useTodoReducer';
import TaskInput from '../component/TaskInput/TaskInput';
import { TaskList } from '../component/TaskList/TaskItem';
import { 
  ListTodo, 
  CheckSquare, 
  Clock, 
  X, 
  Columns, 
  Menu,
  XCircle
} from 'lucide-react';

const App = () => {
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    updateTaskPriority,
    clearCompletedTasks
  } = useTodo();

  const [filter, setFilter] = useState('all');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active': return !task.completed;
      case 'completed': return task.completed;
      default: return true;
    }
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  const navItems = [
    { name: 'All Tasks', icon: Columns, count: stats.total, filter: 'all' },
    { name: 'Active', icon: Clock, count: stats.active, filter: 'active' },
    { name: 'Completed', icon: CheckSquare, count: stats.completed, filter: 'completed' }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className={`md:w-72 w-full md:flex flex-col bg-white p-6 shadow-md ${showMobileSidebar ? 'fixed inset-0 z-50' : 'hidden md:block'}`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <ListTodo className="h-8 w-8 text-emerald-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">TaskFlow</h1>
          </div>
          {showMobileSidebar && (
            <button onClick={() => setShowMobileSidebar(false)} className="md:hidden">
              <XCircle className="h-6 w-6 text-gray-600" />
            </button>
          )}
        </div>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setFilter(item.filter);
                setShowMobileSidebar(false);
              }}
              className={`flex items-center p-3 rounded-lg w-full transition-all ${filter === item.filter ? 'bg-emerald-500 text-white' : 'hover:bg-gray-200 text-gray-700'}`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
              <span className="ml-auto bg-gray-300 text-gray-700 px-3 py-1 rounded-full">{item.count}</span>
            </button>
          ))}
        </nav>
        {stats.completed > 0 && (
          <button onClick={clearCompletedTasks} className="mt-6 w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-all">
            <X className="h-5 w-5 mr-2" /> Clear Completed
          </button>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white shadow-md p-6">
        <header className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center md:hidden">
            <button onClick={() => setShowMobileSidebar(true)} className="mr-3">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">TaskFlow</h1>
          </div>
        </header>
        
        <TaskInput onAddTask={addTask} />
        
        <section className="flex-1 overflow-y-auto mt-6">
          {filteredTasks.length > 0 ? (
            <TaskList 
              tasks={filteredTasks}
              onDeleteTask={deleteTask}
              onToggleTaskCompletion={toggleTaskCompletion}
              onUpdateTaskPriority={updateTaskPriority}
            />
          ) : (
            <div className="text-center text-gray-400 py-16">
              <ListTodo className="mx-auto h-14 w-14 mb-4 text-gray-300" />
              <p className="text-lg">No tasks available</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;