import React, { useState, createContext, useContext } from 'react';

// Authentication Context
const AuthContext = createContext(null);

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // In a real app, this would involve server-side authentication
    const mockUsers = [
      { id: 1, username: 'john', password: 'password123', tasks: [] },
      { id: 2, username: 'jane', password: 'password456', tasks: [] }
    ];

    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Login Component
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// Todo List Component
const TodoList = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState(user?.tasks || []);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  // Filtered tasks based on selected filter
  const filteredTodos = todos.filter(todo => {
    switch(filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTodoItem = { 
        id: Date.now(), 
        text: newTodo, 
        completed: false,
        userId: user.id
      };
      
      const updatedTodos = [...todos, newTodoItem];
      setTodos(updatedTodos);
      
      // In a real app, you'd update the user's tasks in the backend
      user.tasks = updatedTodos;
      
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    user.tasks = updatedTodos;
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    user.tasks = updatedTodos;
  };

  const clearCompletedTasks = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
    user.tasks = updatedTodos;
  };

  // If no user is logged in, show login page
  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="container mx-auto max-w-md p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header with username and logout */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{user.username}'s Todo List</h2>
          <button 
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Task Input */}
        <form onSubmit={handleAddTodo} className="mb-4 flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a new todo"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
        </form>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-4">
          {['all', 'active', 'completed'].map(filterOption => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`
                capitalize px-3 py-1 rounded-lg transition
                ${filter === filterOption 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
                }
              `}
            >
              {filterOption}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {filteredTodos.map((todo) => (
            <div 
              key={todo.id} 
              className="flex items-center bg-gray-100 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-3"
              />
              <span 
                className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Clear Completed Tasks */}
        {todos.some(task => task.completed) && (
          <div className="mt-4 text-center">
            <button
              onClick={clearCompletedTasks}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Clear Completed Tasks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
// const App = () => {
//   return (
//     <AuthProvider>
//       <TodoList />
//     </AuthProvider>
//   );
// };

export default {TodoList,LoginPage};