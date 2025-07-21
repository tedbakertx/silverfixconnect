import React from 'react';
import StatusDropdown from './StatusDropdown';

function WorkRequestCard({ id, category, status, urgency, onStatusChange }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>Work Request #{id}</h3>
      <p>Category: {category}</p>
      <p>Urgency: {urgency}</p>
      <StatusDropdown currentStatus={status} onChange={onChange => onStatusChange(id, onChange)} />
    </div>
  );
}

export default WorkRequestCard;