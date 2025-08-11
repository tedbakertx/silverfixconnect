import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('user'); // Default to 'user'
  const [userId, setUserId] = useState(''); // Default to empty string

  const login = (userRole, userId) => {
    setRole(userRole);
    setUserId(userId);
  };

  const logout = () => {
    setRole('user');
    setUserId('');
  };

  return (
    <RoleContext.Provider value={{ role, userId, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useUser = () => {
  const { userId } = useContext(RoleContext);
  return { userId };
};