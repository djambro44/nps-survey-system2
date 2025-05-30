// Standalone JavaScript widget for embedding
;(() => {
  // Widget configuration
  let config = {
    apiKey: "",
    position: "bottom-right",
    primaryColor: "#3b82f6",
    delay: 0,
    showOnce: false,
  }

  // Check if widget should be shown
  function shouldShowWidget() {
    if (config.showOnce && localStorage.getItem("nps-widget-shown")) {
      return false
    }
    return true
  }

  // Create widget HTML
  function createWidget() {
    const positions = {
      "bottom-right": "bottom: 20px; right: 20px;",
      "bottom-left": "bottom: 20px; left: 20px;",
      "top-right": "top: 20px; right: 20px;",
      "top-left": "top: 20px; left: 20px;",
    }

    const widgetHTML = `
      <div id="nps-widget" style="
        position: fixed;
        ${positions[config.position]}
        z-index: 10000;
        width: 320px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        border: 1px solid #e5e7eb;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        animation: slideIn 0.3s ease-out;
      ">
        <div style="padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div>
              <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 600; color: #111827;">Quick feedback</h3>
              <p style="margin: 0; font-size: 14px; color: #6b7280;" id="nps-description">How likely are you to recommend us?</p>
            </div>
            <button id="nps-close" style="
              background: none;
              border: none;
              font-size: 20px;
              cursor: pointer;
              color: #9ca3af;
              padding: 0;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">&times;</button>
          </div>
          
          <div id="nps-content">
            <div id="nps-score-step">
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 12px; color: #6b7280;">
                <span>Not likely</span>
                <span>Very likely</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(11, 1fr); gap: 4px; margin-bottom: 16px;" id="nps-scores">
                ${Array.from(
                  { length: 11 },
                  (_, i) => `
                  <button class="nps-score-btn" data-score="${i}" style="
                    background: white;
                    border: 1px solid ${config.primaryColor};
                    border-radius: 4px;
                    padding: 8px 4px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                  ">${i}</button>
                `,
                ).join("")}
              </div>
              <div id="nps-score-label" style="text-align: center; font-size: 14px; font-weight: 500; min-height: 20px;"></div>
            </div>
            
            <div id="nps-feedback-step" style="display: none;">
              <div style="text-align: center; margin-bottom: 16px;">
                <span id="nps-selected-score" style="font-size: 24px; font-weight: bold; color: ${config.primaryColor};"></span>
                <div id="nps-selected-label" style="font-size: 14px; margin-top: 4px;"></div>
              </div>
              <textarea id="nps-feedback" placeholder="What's the main reason for your score? (optional)" style="
                width: 100%;
                min-height: 80px;
                padding: 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                font-family: inherit;
                resize: none;
                margin-bottom: 16px;
                box-sizing: border-box;
              "></textarea>
              <div style="display: flex; gap: 8px;">
                <button id="nps-back" style="
                  flex: 1;
                  padding: 8px 16px;
                  background: white;
                  border: 1px solid #d1d5db;
                  border-radius: 6px;
                  font-size: 14px;
                  cursor: pointer;
                ">Back</button>
                <button id="nps-submit" style="
                  flex: 1;
                  padding: 8px 16px;
                  background: ${config.primaryColor};
                  color: white;
                  border: none;
                  border-radius: 6px;
                  font-size: 14px;
                  cursor: pointer;
                ">Submit</button>
              </div>
            </div>
            
            <div id="nps-thanks-step" style="display: none; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 12px;">🎉</div>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                Your feedback helps us improve our service.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .nps-score-btn:hover {
          background: ${config.primaryColor} !important;
          color: white !important;
        }
        
        .nps-score-btn.selected {
          background: ${config.primaryColor} !important;
          color: white !important;
        }
      </style>
    `

    document.body.insertAdjacentHTML("beforeend", widgetHTML)
    initializeWidget()
  }

  // Initialize widget functionality
  function initializeWidget() {
    let selectedScore = null

    // Score selection
    document.querySelectorAll(".nps-score-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        selectedScore = Number.parseInt(this.dataset.score)

        // Update button styles
        document.querySelectorAll(".nps-score-btn").forEach((b) => b.classList.remove("selected"))
        this.classList.add("selected")

        // Update label
        const label = getScoreLabel(selectedScore)
        document.getElementById("nps-score-label").textContent = label
        document.getElementById("nps-score-label").style.color = getScoreColor(selectedScore)

        // Move to feedback step after a short delay
        setTimeout(() => {
          document.getElementById("nps-score-step").style.display = "none"
          document.getElementById("nps-feedback-step").style.display = "block"
          document.getElementById("nps-description").textContent = "Tell us more about your experience"
          document.getElementById("nps-selected-score").textContent = selectedScore
          document.getElementById("nps-selected-label").textContent = label
          document.getElementById("nps-selected-label").style.color = getScoreColor(selectedScore)
        }, 500)
      })
    })

    // Back button
    document.getElementById("nps-back").addEventListener("click", () => {
      document.getElementById("nps-feedback-step").style.display = "none"
      document.getElementById("nps-score-step").style.display = "block"
      document.getElementById("nps-description").textContent = "How likely are you to recommend us?"
    })

    // Submit button
    document.getElementById("nps-submit").addEventListener("click", () => {
      const feedback = document.getElementById("nps-feedback").value
      submitResponse(selectedScore, feedback)
    })

    // Close button
    document.getElementById("nps-close").addEventListener("click", () => {
      closeWidget()
    })
  }

  // Helper functions
  function getScoreLabel(score) {
    if (score <= 6) return "Not likely"
    if (score <= 8) return "Neutral"
    return "Very likely"
  }

  function getScoreColor(score) {
    if (score <= 6) return "#dc2626"
    if (score <= 8) return "#d97706"
    return "#16a34a"
  }

  // Submit response to API
  function submitResponse(score, feedback) {
    fetch("/api/nps-responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        score: score,
        feedback: feedback,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showThanks()
          if (config.showOnce) {
            localStorage.setItem("nps-widget-shown", "true")
          }
        }
      })
      .catch((error) => {
        console.error("Error submitting NPS response:", error)
      })
  }

  // Show thanks message
  function showThanks() {
    document.getElementById("nps-feedback-step").style.display = "none"
    document.getElementById("nps-thanks-step").style.display = "block"
    document.getElementById("nps-description").textContent = "Thank you for your feedback!"

    // Auto-close after 3 seconds
    setTimeout(() => {
      closeWidget()
    }, 3000)
  }

  // Close widget
  function closeWidget() {
    const widget = document.getElementById("nps-widget")
    if (widget) {
      widget.style.animation = "slideOut 0.3s ease-in"
      setTimeout(() => {
        widget.remove()
      }, 300)
    }
  }

  // Public API
  window.NPSWidget = {
    init: (options) => {
      config = Object.assign(config, options)

      if (!shouldShowWidget()) {
        return
      }

      if (config.delay > 0) {
        setTimeout(createWidget, config.delay)
      } else {
        createWidget()
      }
    },
  }

  // Add slideOut animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes slideOut {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(100%);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
})()
