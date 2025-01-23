import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DiagnosisHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/history')
      .then(response => setHistory(response.data))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h2>Diagnosis History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            Symptoms: {entry.symptoms}, Predicted Disease: {entry.predicted_disease}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiagnosisHistory;
