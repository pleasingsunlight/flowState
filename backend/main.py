from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
import joblib

app = Flask(__name__)

# Load trained Keras model and corresponding scalers
model = load_model("Ground Water Level_Trilokinathpura.keras")
scaler_X = joblib.load("scalar_X_Trilokinathpura.pkl")
scaler_y = joblib.load("scalar_y_Trilokinathpura.pkl")

# Define look-back period used during training
N_STEPS = 10

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Expecting input as: { "features": [[rain1, level1], ..., [rain10, level10]] }
        feature_sequence = data.get("features")

        if feature_sequence is None or len(feature_sequence) != N_STEPS:
            return jsonify({"error": f"Please provide 'features' as a list of {N_STEPS} time steps, each with 2 values (rainfall, level)."})

        # Convert to NumPy array
        X_input = np.array(feature_sequence).reshape(1, N_STEPS, 2)

        # Scale the features
        X_scaled = scaler_X.transform(X_input.reshape(-1, 2)).reshape(1, N_STEPS, 2)

        # Predict
        y_pred_scaled = model.predict(X_scaled)
        y_pred = scaler_y.inverse_transform(y_pred_scaled)

        return jsonify({"predicted_groundwater_level": float(y_pred[0][0])})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
