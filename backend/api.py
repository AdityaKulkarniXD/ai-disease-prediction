from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os
import pandas as pd
import numpy as np

# Define base directory dynamically
BASE_DIR = os.path.abspath("E:/projects/AI-Disease/backend")

# Check if required files exist before loading
model_path = os.path.join(BASE_DIR, "disease_prediction_model.pkl")
vectorizer_path = os.path.join(BASE_DIR, "tfidf_vectorizer.pkl")
label_encoder_path = os.path.join(BASE_DIR, "label_encoder.pkl")

if not all(map(os.path.exists, [model_path, vectorizer_path, label_encoder_path])):
    raise FileNotFoundError("One or more model files are missing in the specified path.")

# Load model, vectorizer, and label encoder
model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)
label_encoder = joblib.load(label_encoder_path)

# Load datasets safely
try:
    description_df = pd.read_csv(os.path.join(BASE_DIR, "dataset/symptom_Description.csv"))
    precaution_df = pd.read_csv(os.path.join(BASE_DIR, "dataset/symptom_precaution.csv"))
except FileNotFoundError:
    raise FileNotFoundError("Dataset files are missing in the specified path.")

# Convert CSV data to dictionaries
description_dict = dict(zip(description_df["Disease"], description_df["Description"]))
precaution_dict = {
    row["Disease"]: [row["Precaution_1"], row["Precaution_2"], row["Precaution_3"], row["Precaution_4"]]
    for _, row in precaution_df.iterrows()
}

# Initialize FastAPI app
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class SymptomInput(BaseModel):
    symptoms: list  # Avoid list[str] for compatibility with older Python versions

@app.post("/predict")
def predict_disease(input_data: SymptomInput):
    if not input_data.symptoms:
        raise HTTPException(status_code=400, detail="At least one symptom must be provided.")

    symptoms_text = " ".join(input_data.symptoms)
    symptoms_vectorized = vectorizer.transform([symptoms_text])
    
    # Predict disease
    prediction = model.predict(symptoms_vectorized)
    predicted_disease = label_encoder.inverse_transform(prediction)[0]
    
    # Get disease details
    disease_description = description_dict.get(predicted_disease, "No description available.")
    disease_precautions = precaution_dict.get(predicted_disease, ["No precautions available."])
    
    return {
        "predicted_disease": predicted_disease,
        "description": disease_description,
        "precautions": disease_precautions
    }

# Root endpoint
@app.get("/")
def home():
    return {"message": "Disease Prediction API is running!"}
