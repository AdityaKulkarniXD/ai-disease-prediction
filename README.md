# 🏥 Disease Prediction API

A **FastAPI-based Disease Prediction API** that predicts diseases based on symptoms. The API uses a **TF-IDF vectorizer**, a **trained machine learning model**, and a **label encoder** to classify diseases. Additionally, it provides a **disease description** and **precautionary measures**.

---

## 🚀 Features

- Accepts **symptoms** as input and predicts the most likely disease.
- Returns **disease description** and **precautions**.
- **FastAPI-based** with auto-generated interactive documentation.
- Supports **real-time** disease prediction.
- Ready for **deployment on cloud platforms**.

---

## 🛠️ Setup & Installation

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-username/disease-prediction-api.git
cd disease-prediction-api
```

### **2️⃣ Create a Virtual Environment (Optional)**

```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
```

### **3️⃣ Install Dependencies**

```bash
pip install -r requirements.txt
```

> Ensure you have all required dependencies installed. The key ones include:
>
> - `fastapi`
> - `uvicorn`
> - `joblib`
> - `pandas`
> - `numpy`

### **4️⃣ Place Model Files in the Correct Directory**

Ensure the following model files are in the **backend/** directory:

- `disease_prediction_model.pkl`
- `tfidf_vectorizer.pkl`
- `label_encoder.pkl`
- Datasets:
  - `dataset/symptom_Description.csv`
  - `dataset/symptom_precaution.csv`

---

## 🏃 Running the API

Start the FastAPI server using:

```bash
uvicorn main:app --reload
```

Once the server is running, the API will be accessible at:

```
http://127.0.0.1:8000/
```

### **🔹 API Endpoints**

| Method | Endpoint   | Description                         |
| ------ | ---------- | ----------------------------------- |
| `GET`  | `/`        | Checks if the API is running.       |
| `POST` | `/predict` | Predicts disease based on symptoms. |

---

## 📡 API Usage

### **1️⃣ Test with cURL**

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/predict' \
  -H 'Content-Type: application/json' \
  -d '{"symptoms": ["fever", "cough"]}'
```

### **2️⃣ Test with Postman**

- Open **Postman**.
- Set method to **POST**.
- Enter URL: `http://127.0.0.1:8000/predict`
- Go to **Body** → **raw** → **JSON**.
- Enter:
  ```json
  {
    "symptoms": ["fever", "cough"]
  }
  ```
- Click **Send**.

### **3️⃣ Test with Swagger UI**

Visit:

```
http://127.0.0.1:8000/docs
```

Try out the `/predict` endpoint interactively.

---

## 🏗️ Deployment

### **Deploy on Cloud (Railway, Render, or AWS)**

To deploy on **Render**, follow these steps:

1. Create a **new service** on [Render](https://render.com).
2. Select **FastAPI** as the framework.
3. Add a `requirements.txt` file if not present.
4. Set the **start command**:
   ```
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
5. Deploy 🚀.

---

## 📌 Future Enhancements

- ✅ Improve model accuracy using **BERT embeddings**.
- ✅ Add **confidence scores** with predictions.
- ✅ Support **multiple disease predictions** with probability scores.
- ✅ Build a **frontend (React/Next.js) for better UI**.

---

## 🙌 Contribution

Feel free to **fork** the repo, create a **new branch**, and submit a **pull request**.

---

## 📜 License

This project is **MIT Licensed**.

---

### 🎯 **Author**: Aditya Kulkarni



