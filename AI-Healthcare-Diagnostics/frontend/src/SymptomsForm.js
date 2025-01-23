import React, { useState } from 'react';
import axios from 'axios';

function SymptomsForm() {
  const [symptoms, setSymptoms] = useState('');
  const [disease, setDisease] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const symptomsArray = symptoms.split(',').map(symptom => symptom.trim());
    try {
      const response = await axios.post('http://localhost:5000/predict', { symptoms: symptomsArray });
      setDisease(response.data.predicted_disease);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter symptoms, separated by commas"
        />
        <button type="submit">Predict</button>
      </form>
      {disease && <p>Predicted Disease: {disease}</p>}
    </div>
  );
}

export default SymptomsForm;
