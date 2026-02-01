# L2 Assessment - AI-Powered Customer Triage System

**L2 Assessment for Pursuit - Enhanced Urgency Analysis Feature**

## 🎯 Project Overview

This project is an enhanced version of the Customer Inbox Triage app, featuring a sophisticated AI-powered triage system with context-sensitive urgency analysis. This was developed as an L2 assessment project to demonstrate advanced feature implementation and system design.

## ✨ Key Improvements (This Assignment)

### 1. **Context-Sensitive Urgency Analysis**
- Replaced simple rule-based scoring with sophisticated context-aware analysis
- Added 23 critical safety triggers (Law 88, wrong medication, security breaches, etc.)
- Implemented intelligent "help" detection that understands context
  - "My dog needs medical help" → High urgency ✅
  - "I need help walking my dogs" → Standard urgency ✅

### 2. **AI-Powered Categorization**
- Comprehensive system instructions for 90% accuracy goal
- Critical trigger guidelines for AI
- Temperature optimization (0.3) for consistent results
- New categories: Account Access, Emergency

### 3. **User Feedback Loop**
- Interactive thumbs up/down widget
- Stores feedback for continuous improvement
- Transparent reasoning for all decisions
- Ready for backend API integration

### 4. **Test Results**
- ✅ 100% accuracy on all test cases
- ✅ Emergency context detection
- ✅ Critical safety trigger detection
- ✅ Feature request categorization

## 🚀 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **AI**: Groq API (Llama 3.3 70B - Free tier)
- **Runtime**: Browser-based (local development)

## 📦 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Groq API key (FREE - get from https://console.groq.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/G3RRYGL3Z/L2-Assessment.git
   cd L2-Assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Groq API Key**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Groq API key:
   ```
   VITE_GROQ_API_KEY=gsk_your-actual-key-here
   ```
   
   Get your FREE API key from: https://console.groq.com/keys

4. **Run the application**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## 🎓 How It Works

### Three-Layer Urgency Analysis

1. **Layer 1: Hard-Coded Safety Triggers**
   - 23 critical keywords that always result in High urgency
   - Examples: "911", "hacked", "wrong medication", "law 88"

2. **Layer 2: Context-Sensitive Analysis**
   - Analyzes surrounding words to understand intent
   - Solves ambiguity (e.g., "help" in different contexts)

3. **Layer 3: Category-Based Prioritization**
   - Different issue types have different urgency levels
   - Billing/Account Access → High
   - Feature Requests → Low

### AI Categorization Process

1. **Paste Message**: User enters a customer support message
2. **Analyze**: Click "Analyze Message" to process
3. **Dual Analysis**:
   - **Urgency Analysis** (Rule-based + Context-sensitive)
   - **AI Categorization** (LLM with system instructions)
4. **Display Results**: Shows category, urgency, reasoning, and recommended action
5. **Feedback**: User can rate accuracy with thumbs up/down
6. **History**: All analyses saved to localStorage

## 🧪 Example Test Messages

### High Urgency Examples

```
There is a 10,000 fine on my building for Law 88 and I am panicking.
```
**Expected**: High urgency (Law 88 trigger)

```
My dog needs medical help
```
**Expected**: High urgency (Emergency context)

```
Patient received wrong medication
```
**Expected**: High urgency (Safety trigger)

### Standard/Low Urgency Examples

```
I need help walking my dogs
```
**Expected**: Standard urgency (Routine context)

```
Can you add a dark mode feature?
```
**Expected**: Low urgency (Feature request)

## 📊 Feature Comparison

| Feature | Before | After (This Project) |
|---------|--------|---------------------|
| Urgency Detection | Simple score-based | Context-sensitive with 23 triggers |
| AI Instructions | Basic prompt | Comprehensive system instructions |
| Feedback Loop | None | Interactive widget with storage |
| Reasoning | None | Detailed explanation for every decision |
| Accuracy Goal | N/A | 90% for high-urgency detection |

## 🔒 Security Note

⚠️ **Warning**: This application exposes the Groq API key in the browser (using `dangerouslyAllowBrowser: true`). This is acceptable for local development only but should **NEVER** be done in production. In a real application, API calls should be made from a secure backend server.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.jsx
│   └── FeedbackWidget.jsx          # NEW: User feedback component
├── pages/
│   ├── HomePage.jsx
│   ├── AnalyzePage.jsx             # MODIFIED: Integrated new features
│   └── HistoryPage.jsx
├── utils/
│   ├── llmHelper.js                # MODIFIED: Enhanced AI instructions
│   ├── urgencyScorer.js            # MODIFIED: Context-sensitive analysis
│   └── templates.js
└── App.jsx
```

## 🎯 Assignment Goals Achieved

- ✅ Implemented sophisticated urgency analysis
- ✅ Added AI-powered categorization with system instructions
- ✅ Created feedback loop for continuous improvement
- ✅ Achieved 100% test accuracy on sample cases
- ✅ Provided transparent reasoning for all decisions
- ✅ Designed for scalability and future enhancements

## 📝 License

This project is for educational purposes only (Pursuit L2 Assessment).

## 👨‍💻 Author

Gary Gonzalez - Pursuit Fellow
