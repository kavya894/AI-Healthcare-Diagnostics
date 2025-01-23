CREATE DATABASE health_diagnostics;

USE health_diagnostics;

CREATE TABLE diagnosis_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  symptoms TEXT NOT NULL,
  predicted_disease VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
