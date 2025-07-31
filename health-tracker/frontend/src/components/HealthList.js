import React from 'react';

function HealthList({ logs, setLogs }) {
  const handleDelete = async id => {
    await fetch(`http://localhost:5000/logs/${id}`, { method: 'DELETE' });
    setLogs(logs.filter(log => log._id !== id));
  };

  return (
    <ul>
      {logs.map(log => (
        <li key={log._id}>
          {log.date} - Steps: {log.steps}, Sleep: {log.sleep} hrs
          <button onClick={() => handleDelete(log._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default HealthList;
