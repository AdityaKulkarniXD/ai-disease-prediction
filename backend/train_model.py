import os
import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from xgboost import XGBClassifier

# Define absolute paths
BASE_DIR = r"E:\projects\AI-Disease\backend\dataset"

dataset_path = os.path.join(BASE_DIR, "dataset.csv")
severity_path = os.path.join(BASE_DIR, "Symptom-severity.csv")
description_path = os.path.join(BASE_DIR, "symptom_Description.csv")
precaution_path = os.path.join(BASE_DIR, "symptom_precaution.csv")

# Load datasets
df = pd.read_csv(dataset_path).fillna("")
severity_df = pd.read_csv(severity_path)
description_df = pd.read_csv(description_path)
precaution_df = pd.read_csv(precaution_path)

print("Datasets loaded successfully!")

# Merge all symptom columns into a single feature
symptom_columns = [col for col in df.columns if "Symptom" in col]
df["all_symptoms"] = df[symptom_columns].apply(lambda x: " ".join(x.dropna().astype(str)), axis=1)

# Keep only Disease & Symptoms
df = df[["Disease", "all_symptoms"]]

# Convert symptoms into TF-IDF features
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["all_symptoms"])

# Convert Disease labels to numbers
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df["Disease"])

# Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train XGBoost Classifier
xgb_model = XGBClassifier(use_label_encoder=False, eval_metric='mlogloss')
xgb_model.fit(X_train, y_train)

# Evaluate Model
y_pred = xgb_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save the Model and Encoders
model_dir = r"E:\projects\AI-Disease\backend"
joblib.dump(xgb_model, os.path.join(model_dir, "disease_prediction_model.pkl"))
joblib.dump(vectorizer, os.path.join(model_dir, "tfidf_vectorizer.pkl"))
joblib.dump(label_encoder, os.path.join(model_dir, "label_encoder.pkl"))

print("Model and vectorizer saved successfully in 'backend/' directory!")
