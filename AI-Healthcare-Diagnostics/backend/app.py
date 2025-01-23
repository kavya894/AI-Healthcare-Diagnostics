from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import tensorflow as tf
import numpy as np
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'health_diagnostics'
mysql = MySQL(app)

# Load pre-trained TensorFlow model
model = tf.keras.models.load_model('health_diagnostic_model.h5')

# LabelEncoder for symptom preprocessing
encoder = LabelEncoder()
encoder.classes_ = np.load('classes.npy', allow_pickle=True)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    symptoms = data['symptoms']

    # Encode symptoms
    symptoms_array = encoder.transform(symptoms).reshape(1, -1)

    # Predict disease
    prediction = model.predict(symptoms_array)
    disease = encoder.inverse_transform([np.argmax(prediction)])[0]

    # Store result in the database
    cursor = mysql.connection.cursor()
    cursor.execute(
        '''INSERT INTO diagnosis_history (symptoms, predicted_disease) VALUES (%s, %s)''',
        (', '.join(symptoms), disease),
    )
    mysql.connection.commit()

    return jsonify({'predicted_disease': disease})

@app.route('/history', methods=['GET'])
def history():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM diagnosis_history")
    results = cursor.fetchall()

    history_data = [
        {'symptoms': row[1], 'predicted_disease': row[2]} for row in results
    ]
    return jsonify(history_data)

if __name__ == '__main__':
    app.run(debug=True)
