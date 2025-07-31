import React, { useState } from 'react';

function HealthForm({ onAdd }) {
  const [formData, setFormData] = useState({
    date: '',
    steps: '',
    calories: '',
    water: '',
    sleep: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log("Submitting data:", formData); // ✅ Debug log

    try {
      const res = await fetch('http://localhost:5000/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Response from backend:", data); // ✅ Debug log

      onAdd(data); // Add to list
      setFormData({ date: '', steps: '', calories: '', water: '', sleep: '' }); // Reset form
    } catch (error) {
      console.error("Error while submitting:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
      <input name="steps" value={formData.steps} onChange={handleChange} placeholder="Steps" />
      <input name="calories" value={formData.calories} onChange={handleChange} placeholder="Calories" />
      <input name="water" value={formData.water} onChange={handleChange} placeholder="Water (litres)" />
      <input name="sleep" value={formData.sleep} onChange={handleChange} placeholder="Sleep (hours)" />
      <button type="submit">Add Log</button>
    </form>
  );
}

export default HealthForm;
