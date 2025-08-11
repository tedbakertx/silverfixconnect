import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoleProvider, useRole } from './RoleContext';
import WorkRequestCard from './WorkRequestCard';

const AppRoutes = () => {
  const { login } = useRole();

  useEffect(() => {
    login('admin', 'testUser123');
  }, [login]);

  return (
    <Router>
      <Routes>
        <Route path="/dashboard/work-requests" element={<WorkRequestCard />} />
        <Route path="/" element={<WorkRequestCard />} />
      </Routes>
    </Router>
  );
};

const App = () => (
  <RoleProvider>
    <AppRoutes />
  </RoleProvider>
);

export default App;