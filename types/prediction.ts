export interface Prediction {
  id: string
  disease: string
  probability: number
  risk: 'low' | 'moderate' | 'high'
  symptoms: string[]
  recommendations: string[]
}

export interface PredictionResponse {
  predictions: Prediction[]
}

export interface PredictionError {
  error: string
}