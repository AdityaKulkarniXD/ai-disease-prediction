"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, FileText, Heart, Stethoscope } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const storedSymptoms = localStorage.getItem("userSymptoms");
        if (!storedSymptoms || storedSymptoms === "[]") {
            setError("No symptoms found. Please make a new prediction.");
            setLoading(false);
            return;
        }
        

        const symptoms = JSON.parse(storedSymptoms);

        const response = await fetch("http://127.0.0.1:8000/predict",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symptoms }),
        });

        if (!response.ok) throw new Error("Failed to fetch predictions");

        const data = await response.json();

        // ✅ Check if response is valid
        if (!data.predicted_disease) {
          throw new Error("Invalid response from API");
        }

        setResults([
          {
            disease: data.predicted_disease,
            description: data.description || "No description available.",
            precautions: data.precautions || ["No specific precautions available."],
          },
        ]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="container max-w-4xl py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Prediction Results</h1>
          <Link href="/predict">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Prediction
            </Button>
          </Link>
        </div>

        {loading && <p>Loading results...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-6">
          {results.map((result, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{result.disease}</h2>
                </div>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Save Report
                </Button>
              </div>

              {/* ✅ Disease Description */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Description:</h3>
                <p className="text-gray-600">{result.description}</p>
              </div>

              {/* ✅ Precautions */}
              <Accordion type="single" collapsible>
                <AccordionItem value="precautions">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      Precautions
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1">
                      {result.precautions.map((precaution: string, i: number) => (
                        <li key={i}>{precaution}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Consult a Doctor
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
