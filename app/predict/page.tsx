"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PredictPage() {
  const [symptoms, setSymptoms] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const symptomList = symptoms.split(",").map((s) => s.trim());

      // ✅ Store symptoms in localStorage before API call
      localStorage.setItem("userSymptoms", JSON.stringify(symptomList));

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: symptomList }),
      });

      if (!response.ok) throw new Error("Failed to fetch prediction");

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-lg py-10">
      <h1 className="text-3xl font-bold mb-6">Enter Symptoms</h1>
      <Input
        placeholder="Enter symptoms (comma-separated)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <Button className="mt-4 w-full" onClick={handlePredict} disabled={loading}>
        {loading ? "Predicting..." : "Predict Disease"}
      </Button>

      {/* Display Prediction Results */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-6 border p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Predicted Disease: {result.predicted_disease}</h2>
          <p className="text-gray-600">{result.description}</p>
          <h3 className="mt-4 font-semibold">Precautions:</h3>
          <ul className="list-disc list-inside">
            {result.precautions.map((prec: string, i: number) => (
              <li key={i}>{prec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
