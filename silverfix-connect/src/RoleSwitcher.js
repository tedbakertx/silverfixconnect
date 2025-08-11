import React from 'react';
import { useRole } from './RoleContext';
import { useNavigate } from 'react-router-dom';

const RoleSwitcher = () => {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    navigate('/dashboard/work-requests'); // Navigate to work requests after role change
  };

  return (
    <div>
      <button onClick={() => handleRoleChange('user')}>Switch to User</button>
      <button onClick={() => handleRoleChange('admin')}>Switch to Admin</button>
      <div>Current Role: {role}</div>
    </div>
  );
};

export default RoleSwitcher;