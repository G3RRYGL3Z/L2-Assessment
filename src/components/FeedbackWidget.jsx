import { useState } from 'react'

/**
 * FeedbackWidget - Allows users to provide feedback on urgency analysis
 * This creates a feedback loop for continuous improvement of the triage system
 */
const FeedbackWidget = ({ messageId, message, urgency, category }) => {
    const [feedbackGiven, setFeedbackGiven] = useState(false)
    const [feedbackType, setFeedbackType] = useState(null)

    const handleFeedback = (isCorrect) => {
        // Store feedback in localStorage for now (can be sent to API later)
        const feedback = {
            messageId,
            message,
            urgency,
            category,
            isCorrect,
            timestamp: new Date().toISOString()
        }

        // Get existing feedback
        const existingFeedback = JSON.parse(localStorage.getItem('triageFeedback') || '[]')
        existingFeedback.push(feedback)
        localStorage.setItem('triageFeedback', JSON.stringify(existingFeedback))

        // In production, this would send to your backend API:
        // fetch('/api/feedback', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(feedback)
        // });

        setFeedbackGiven(true)
        setFeedbackType(isCorrect)

        // Show success message
        console.log('Feedback recorded:', feedback)
    }

    if (feedbackGiven) {
        return (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-green-800 font-medium">
                    {feedbackType
                        ? "Thanks! Your feedback helps improve accuracy."
                        : "Thanks! We'll review this case to improve our system."}
                </span>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Was this urgency correct?</span>
            <div className="flex gap-2">
                <button
                    onClick={() => handleFeedback(true)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    title="Yes, this urgency is correct"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>Yes</span>
                </button>
                <button
                    onClick={() => handleFeedback(false)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="No, this urgency is incorrect"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                    <span>No</span>
                </button>
            </div>
        </div>
    )
}

export default FeedbackWidget
