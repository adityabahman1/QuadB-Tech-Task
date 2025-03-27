import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import {AuthProvider} from '../src/component/AuthContext'
import ProtectedRoute from '../src/component/ProtectRoute';
import Login from '../src/component/Login';
// import TodoList from '../src/component/TodoAuth';
import TodoApp from './component/todo';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <div className="bg-gray-100 flex items-center justify-center">

                    <TodoApp />
                  </div>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;