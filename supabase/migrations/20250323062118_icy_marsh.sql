/*
  # Create predictions table for storing ML predictions

  1. New Tables
    - `predictions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `symptoms` (text[])
      - `age` (integer)
      - `gender` (text)
      - `predictions` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `predictions` table
    - Add policies for authenticated users to:
      - Read their own predictions
      - Create new predictions
*/

CREATE TABLE IF NOT EXISTS predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  symptoms text[],
  age integer,
  gender text,
  predictions jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own predictions
CREATE POLICY "Users can read own predictions"
  ON predictions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to create predictions
CREATE POLICY "Users can create predictions"
  ON predictions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);