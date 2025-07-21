import React from 'react';

function StatusDropdown({ currentStatus, onChange }) {
  const statuses = [
    { value: 'open', label: 'Open', icon: '🟢' },
    { value: 'bidding', label: 'Bidding', icon: '🟡' },
    { value: 'awarded', label: 'Awarded', icon: '🔵' },
    { value: 'completed', label: 'Completed', icon: '🔴' }
  ];

  return (
    <select value={currentStatus} onChange={onChange} style={{ color: '#000', backgroundColor: '#fff' }}>
      {statuses.map((status) => (
        <option key={status.value} value={status.value}>
          {status.icon} {status.label}
        </option>
      ))}
    </select>
  );
}

export default StatusDropdown;