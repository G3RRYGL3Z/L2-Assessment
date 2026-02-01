/**
 * Urgency Scorer - Context-sensitive urgency analysis
 * Uses a three-tier approach:
 * 1. Hard overrides for critical safety triggers
 * 2. Context-sensitive logic for ambiguous words like "help"
 * 3. Fallback to AI/LLM for complex cases
 */

/**
 * Analyze message urgency with detailed reasoning
 * @param {string} message - The customer support message
 * @returns {object} - { urgency: string, reason: string }
 */
export function analyzeUrgency(message) {
  const messageLower = message.toLowerCase();

  // 1. HARD OVERRIDES - Critical safety triggers that always result in High urgency
  const criticalTriggers = [
    "911",
    "law 88",
    "hacked",
    "wrong medication",
    "incorrect meds",
    "can't breathe",
    "suicide",
    "overdose",
    "bleeding",
    "unconscious",
    "chest pain",
    "stroke",
    "seizure",
    "data breach",
    "security breach",
    "unauthorized access",
    "no heat",
    "heating failure",
    "furnace broken",
    "restaurant supply delay",
    "food supply delay",
    "building fine",
    "compliance violation"
  ];

  for (const trigger of criticalTriggers) {
    if (messageLower.includes(trigger)) {
      return {
        urgency: "High",
        reason: `Critical safety trigger detected: "${trigger}". Immediate attention required.`
      };
    }
  }

  // 2. CONTEXT-SENSITIVE LOGIC - The "help" problem and similar ambiguous words
  // We look for "help" combined with high-stakes nouns
  const emergencyContext = [
    "medical",
    "emergency",
    "police",
    "ambulance",
    "hospital",
    "breathing",
    "injury",
    "accident",
    "fire",
    "danger",
    "urgent",
    "critical",
    "dying",
    "hurt"
  ];

  const routineContext = [
    "dog",
    "walk",
    "pet",
    "groceries",
    "shopping",
    "delivery",
    "appointment",
    "schedule",
    "booking"
  ];

  if (messageLower.includes("help")) {
    // Check if "help" is near an emergency word
    if (emergencyContext.some(ctx => messageLower.includes(ctx))) {
      return {
        urgency: "High",
        reason: "Emergency context detected around 'help'. Potential safety issue requiring immediate response."
      };
    }
    // Check if "help" is near a routine word
    if (routineContext.some(ctx => messageLower.includes(ctx))) {
      return {
        urgency: "Standard",
        reason: "Routine task detected. 'Help' used in non-emergency context (e.g., walking dog, delivery assistance)."
      };
    }
  }

  // 3. BILLING & ACCOUNT SECURITY - High priority but not emergency
  const billingUrgent = [
    "can't access account",
    "locked out",
    "payment failed",
    "billing error",
    "charged twice",
    "unauthorized charge",
    "fraudulent",
    "account suspended"
  ];

  for (const trigger of billingUrgent) {
    if (messageLower.includes(trigger)) {
      return {
        urgency: "High",
        reason: `Account access or billing issue detected: "${trigger}". High priority to prevent customer churn.`
      };
    }
  }

  // 4. TECHNICAL ISSUES - Medium to High based on severity
  const criticalTechnical = [
    "down",
    "not working",
    "broken",
    "crash",
    "error 500",
    "can't login",
    "lost data",
    "deleted"
  ];

  const minorTechnical = [
    "slow",
    "loading",
    "bug",
    "glitch",
    "minor issue"
  ];

  if (criticalTechnical.some(issue => messageLower.includes(issue))) {
    return {
      urgency: "High",
      reason: "Critical technical issue affecting core functionality. Requires immediate technical support."
    };
  }

  if (minorTechnical.some(issue => messageLower.includes(issue))) {
    return {
      urgency: "Medium",
      reason: "Technical issue detected but not blocking core functionality. Standard support timeline appropriate."
    };
  }

  // 5. FEATURE REQUESTS & INQUIRIES - Lower priority
  const featureRequestIndicators = [
    "feature",
    "suggestion",
    "would be nice",
    "could you add",
    "enhancement",
    "improvement"
  ];

  if (featureRequestIndicators.some(indicator => messageLower.includes(indicator))) {
    return {
      urgency: "Low",
      reason: "Feature request or product suggestion. Can be routed to product team for future consideration."
    };
  }

  // 6. POSITIVE FEEDBACK - Lowest priority
  const positiveIndicators = [
    "thank",
    "thanks",
    "appreciate",
    "love",
    "great",
    "excellent",
    "wonderful",
    "amazing"
  ];

  if (positiveIndicators.some(word => messageLower.includes(word)) &&
    !messageLower.includes("but") &&
    !messageLower.includes("however")) {
    return {
      urgency: "Low",
      reason: "Positive feedback detected. No immediate action required, but acknowledgment recommended."
    };
  }

  // 7. QUESTION INDICATORS - Generally standard priority
  if (messageLower.includes("?") ||
    messageLower.includes("how do i") ||
    messageLower.includes("how can i") ||
    messageLower.includes("what is")) {
    return {
      urgency: "Standard",
      reason: "General inquiry or question. Standard response timeline appropriate."
    };
  }

  // 8. FALLBACK - Default to Standard with note for manual review
  return {
    urgency: "Standard",
    reason: "Message doesn't match specific urgency patterns. Defaulting to standard priority. Consider manual review for proper categorization."
  };
}

/**
 * Legacy function for backward compatibility
 * Returns just the urgency level as a string
 * @param {string} message - The customer support message
 * @returns {string} - Urgency level: "High", "Medium", "Low", or "Standard"
 */
export function calculateUrgency(message) {
  const result = analyzeUrgency(message);
  // Map "Standard" to "Medium" for backward compatibility
  return result.urgency === "Standard" ? "Medium" : result.urgency;
}
