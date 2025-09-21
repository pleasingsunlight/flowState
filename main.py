from fastapi import FastAPI
import pickle
import uvicorn

app = FastAPI()

# load model
model = pickle.load(open("model.pkl", "rb"))

@app.post("/predict")
def predict(data: dict):
    features = data["features"]
    prediction = model.predict([features])
    return {"prediction": prediction.tolist()}
