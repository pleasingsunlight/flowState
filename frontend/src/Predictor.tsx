import React, { useState } from "react";
import axios from "axios";

const Predictor: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [prediction, setPrediction] = useState<string | null>(null);

  const handlePredict = async () => {
    const features = input.split(",").map(Number);
    const res = await axios.post("http://127.0.0.1:8000/predict", {
      features,
    });
    setPrediction(res.data.prediction);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter comma-separated features"
      />
      <button onClick={handlePredict}>Predict</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default Predictor;
