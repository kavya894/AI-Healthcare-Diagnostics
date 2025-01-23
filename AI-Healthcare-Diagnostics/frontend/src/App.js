import React from 'react';
import SymptomsForm from './SymptomsForm';
import DiagnosisHistory from './DiagnosisHistory';

function App() {
  return (
    <div className="App">
      <h1>AI-Powered Healthcare Diagnostics</h1>
      <SymptomsForm />
      <DiagnosisHistory />
    </div>
  );
}

export default App;
