import React from 'react';
import { useRole } from './RoleContext';
const RoleDisplay = () => {
  const { role } = useRole();
  return <div>Current Role: {role}</div>;
};
export default RoleDisplay;