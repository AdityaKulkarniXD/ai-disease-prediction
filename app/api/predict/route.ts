import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Mock ML model prediction function
function predictDisease(symptoms: string[], age: number, gender: string) {
  // This is a mock implementation. In production, this would call your actual ML model API
  const diseases = [
    {
      name: "Common Cold",
      probability: 0.85,
      risk: "low",
      symptoms: ["Runny nose", "Sore throat", "Cough"],
      recommendations: [
        "Rest and stay hydrated",
        "Over-the-counter cold medications",
        "Monitor symptoms for 7-10 days",
      ]
    },
    {
      name: "Seasonal Allergies",
      probability: 0.65,
      risk: "moderate",
      symptoms: ["Sneezing", "Itchy eyes", "Nasal congestion"],
      recommendations: [
        "Antihistamines",
        "Avoid allergen exposure",
        "Consider seeing an allergist",
      ]
    }
  ]

  return diseases
}

export async function POST(req: Request) {
  try {
    const { symptoms, age, gender, userId } = await req.json()

    // Call ML model (mock implementation)
    const predictions = predictDisease(symptoms, age, gender)

    // Store prediction in database
    if (userId) {
      const { error } = await supabase
        .from('predictions')
        .insert([
          {
            user_id: userId,
            symptoms,
            age,
            gender,
            predictions,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error
    }

    return NextResponse.json({ predictions })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}