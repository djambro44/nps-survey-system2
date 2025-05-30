"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface NPSWidgetProps {
  apiKey?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  primaryColor?: string
  onClose?: () => void
  onSubmit?: (score: number, feedback: string) => void
}

export function NPSWidget({
  apiKey = "demo-key",
  position = "bottom-right",
  primaryColor = "#3b82f6",
  onClose,
  onSubmit,
}: NPSWidgetProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState<"score" | "feedback" | "thanks">("score")

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  }

  const handleScoreSelect = (score: number) => {
    setSelectedScore(score)
    setStep("feedback")
  }

  const handleSubmit = async () => {
    if (selectedScore === null) return

    try {
      // In a real implementation, this would send to your API
      const response = await fetch("/api/nps-responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          score: selectedScore,
          feedback,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      })

      if (response.ok) {
        setStep("thanks")
        onSubmit?.(selectedScore, feedback)

        // Auto-close after 3 seconds
        setTimeout(() => {
          setIsVisible(false)
          onClose?.()
        }, 3000)
      }
    } catch (error) {
      console.error("Failed to submit NPS response:", error)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const getScoreLabel = (score: number) => {
    if (score <= 6) return "Not likely"
    if (score <= 8) return "Neutral"
    return "Very likely"
  }

  const getScoreColor = (score: number) => {
    if (score <= 6) return "text-red-600"
    if (score <= 8) return "text-yellow-600"
    return "text-green-600"
  }

  if (!isVisible) return null

  return (
    <div className={`fixed ${positionClasses[position]} z-50 w-80 animate-in slide-in-from-bottom-2`}>
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Quick feedback</CardTitle>
              <CardDescription className="text-sm">
                {step === "score" && "How likely are you to recommend us?"}
                {step === "feedback" && "Tell us more about your experience"}
                {step === "thanks" && "Thank you for your feedback!"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {step === "score" && (
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not likely</span>
                <span>Very likely</span>
              </div>

              <div className="grid grid-cols-11 gap-1">
                {Array.from({ length: 11 }, (_, i) => (
                  <Button
                    key={i}
                    variant={selectedScore === i ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0 text-xs"
                    style={{
                      backgroundColor: selectedScore === i ? primaryColor : undefined,
                      borderColor: primaryColor,
                    }}
                    onClick={() => handleScoreSelect(i)}
                  >
                    {i}
                  </Button>
                ))}
              </div>

              {selectedScore !== null && (
                <div className="text-center">
                  <span className={`text-sm font-medium ${getScoreColor(selectedScore)}`}>
                    {getScoreLabel(selectedScore)}
                  </span>
                </div>
              )}
            </div>
          )}

          {step === "feedback" && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-2xl font-bold" style={{ color: primaryColor }}>
                  {selectedScore}
                </span>
                <span className={`block text-sm ${getScoreColor(selectedScore!)}`}>
                  {getScoreLabel(selectedScore!)}
                </span>
              </div>

              <Textarea
                placeholder="What's the main reason for your score? (optional)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[80px] resize-none"
              />

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setStep("score")} className="flex-1">
                  Back
                </Button>
                <Button size="sm" onClick={handleSubmit} className="flex-1" style={{ backgroundColor: primaryColor }}>
                  Submit
                </Button>
              </div>
            </div>
          )}

          {step === "thanks" && (
            <div className="text-center space-y-3">
              <div className="text-4xl">🎉</div>
              <p className="text-sm text-muted-foreground">Your feedback helps us improve our service.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
