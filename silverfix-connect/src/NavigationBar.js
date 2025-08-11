import React from 'react';
import { useRole } from './RoleContext';
import { NavLink } from 'react-router-dom'; // Change to NavLink
import './NavigationBar.css';

const NavigationBar = () => {
  const { role } = useRole();

  return (
    <nav>
      <ul>
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/role" className={({ isActive }) => isActive ? 'active' : ''}>Role Display</NavLink></li>
        {role === 'admin' && (
          <li><NavLink to="/dashboard/work-requests" className={({ isActive }) => isActive ? 'active' : ''}>Work Requests (Admin)</NavLink></li>
        )}
        <li><NavLink to="/switch-role" className={({ isActive }) => isActive ? 'active' : ''}>Switch Role</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;