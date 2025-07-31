import React, { useState } from 'react';

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    const payload = {
      symptoms: symptoms.split(',').map(s => s.trim()),
      ptInfo: {
        age: 30,
        gender: "male",
        height: 170,
        weight: 70,
        medicalHistory: [],
        currentMedications: [],
        allergies: [],
        lifestyle: {
          smoking: false,
          alcohol: "none",
          exercise: "moderate",
          diet: "balanced"
        },
        lang: "en"
      }
    };

    try {
      const res = await fetch('http://localhost:5000/api/symptoms/check-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('❌ Something went wrong. Please try again.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>🧠 Symptom Checker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter symptoms (comma separated)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          required
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Check</button>
      </form>

      {loading && <p>🔄 Analyzing symptoms...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>🩺 Diagnosis Result:</h3>
          <pre style={{ background: '#f4f4f4', padding: '10px' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default SymptomChecker;
