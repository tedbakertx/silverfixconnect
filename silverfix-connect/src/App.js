import React, { useState } from 'react';
import StatusDropdown from './StatusDropdown';

function App() {
  const [status, setStatus] = useState('open');

  const handleChange = (e) => {
    setStatus(e.target.value);
    alert(`Status changed to ${e.target.value}`); // Simulate transition
  };

  return (
    <div>
      <h1>SilverFix Connect Test</h1>
      <StatusDropdown currentStatus={status} onChange={handleChange} />
    </div>
  );
}

export default App;