"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Clock, Lock, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative hero-gradient">
        <div className="container px-4 py-32 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
              AI-Powered Disease Prediction
              <br />
              <span className="gradient-text">at Your Fingertips!</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Advanced machine learning algorithms analyze your symptoms and medical data
              to provide accurate disease predictions and personalized health insights.
            </p>
            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/predict">
                <Button 
                  size="lg" 
                  className="text-lg group"
                >
                  Start Diagnosis
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#features">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/50">
        <div className="container px-4 mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">Why Choose Us?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div variants={itemVariants}>
                <FeatureCard
                  icon={Brain}
                  title="AI-Powered Accuracy"
                  description="Advanced algorithms provide highly accurate disease predictions based on your symptoms."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard
                  icon={Clock}
                  title="Instant Results"
                  description="Get immediate insights about potential health conditions without waiting."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard
                  icon={Shield}
                  title="Privacy First"
                  description="Your health data is encrypted and protected with industry-leading security."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard
                  icon={Lock}
                  title="Secure Storage"
                  description="Access your medical history and predictions securely anytime, anywhere."
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">What Our Users Say</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants}>
                <TestimonialCard
                  quote="The AI prediction helped me identify my condition early, leading to better treatment outcomes."
                  author="Sarah Johnson"
                  role="Patient"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <TestimonialCard
                  quote="As a healthcare provider, this tool has been invaluable in supporting my diagnostic process."
                  author="Dr. Michael Chen"
                  role="Medical Professional"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <TestimonialCard
                  quote="Quick, accurate, and user-friendly. It's like having a doctor's opinion at your fingertips."
                  author="James Wilson"
                  role="Regular User"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ icon: Icon, title, description }: {
  icon: any,
  title: string,
  description: string
}) {
  return (
    <Card className="p-6 feature-card border-2 hover:border-primary/50">
      <Icon className="h-12 w-12 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  )
}

function TestimonialCard({ quote, author, role }: {
  quote: string,
  author: string,
  role: string
}) {
  return (
    <Card className="p-6 testimonial-card border-2 hover:border-primary/50">
      <p className="text-lg mb-4 italic">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </Card>
  )
}