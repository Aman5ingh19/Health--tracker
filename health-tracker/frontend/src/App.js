import React, { useEffect, useState } from 'react';
import HealthForm from './components/HealthForm';
import HealthList from './components/HealthList';
import SymptomChecker from './components/SymptomChecker';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/logs')
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  const addLog = log => setLogs([...logs, log]);

  return (
    <div className="App">
      <h1>🩺 Health Tracker</h1>
      <HealthForm onAdd={addLog} />
      <HealthList logs={logs} setLogs={setLogs} />
      <SymptomChecker /> {/* ✅ Add Symptom Checker Component */}
    </div>
  );
}

export default App;
