from fastapi import FastAPI
from pydantic import BaseModel
import pickle

# Define request body format
class InputData(BaseModel):
    features: list[float]

# Load model once
model = pickle.load(open("model.pkl", "rb"))

# Initialize FastAPI app
app = FastAPI()

@app.post("/predict")
def predict(data: InputData):
    prediction = model.predict([data.features])
    return {"prediction": prediction.tolist()}
