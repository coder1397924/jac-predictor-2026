# JAC Delhi 2026 Cutoff Predictor with AI Counselor

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18%2B-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/typescript-5%2B-3178C6.svg)
![JAC Delhi 2026 Prediction Engine](https://img.shields.io/badge/JAC%20Delhi-2026%20Predictions-cyan)

> 🎯 **Real-time JAC Delhi admission predictions** powered by historical data analysis and AI-assisted counseling. Get accurate cutoff forecasts for DTU, NSUT, IIIT-D, and IGDTUW across all categories.

### 🌐 Live Production Application
The web app is deployed and live at:  
👉 **[https://jac-delhi-cutoff-predictor-2026-with-ai-587323956845.asia-southeast1.run.app/](https://jac-delhi-cutoff-predictor-2026-with-ai-587323956845.asia-southeast1.run.app/)**

---

## 📖 About This Website

The **JAC Delhi 2026 Cutoff Predictor** is a comprehensive, open-source educational tool designed specifically for JEE Main aspirants participating in the Joint Admission Counseling (JAC) for Delhi-based engineering institutions. 

Navigating college admissions can be incredibly stressful, especially with volatile cutoff ranks. This website bridges the gap between raw data and actionable advice. By combining 5 years of historical cutoff data (2021-2025) with the official 2026 Round 1 actuals, it provides students with realistic admission probabilities. Furthermore, the integrated **Gemini AI Counselor** acts as a personal guide, answering specific queries, explaining cutoff trends, and suggesting the safest branches based on a student's unique rank and category.

### 🛠️ Tech Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Recharts (for data visualization), Lucide React (Icons).
- **Backend/AI:** Express.js, Node.js, Google Gemini 2.5 Flash API.
- **Build & Tooling:** Vite, ESLint, Prettier.
- **Deployment Platform:** Google Cloud Run (Asia-Southeast1 region).

---

## ⚙️ How It Works (Under the Hood)

This platform operates on two main engines:

### 1. The Prediction Engine (Data Modeling)
Instead of just showing past data, our algorithm dynamically calculates expected cutoffs for the upcoming rounds (R2 → R5 → Upgradation).
* **Baseline Data:** Uses official 2026 Round 1 actual cutoffs as the anchor.
* **Non-Linear Extrapolation:** Applies historical slide rates (how much ranks drop between rounds) specific to each category. For example, EWS categories historically slide differently than General or OBC categories.
* **Dual Scenarios:** Calculates a **"Worst Case"** (conservative estimate assuming high seat retention) and a **"True Outcome"** (optimistic estimate factoring in natural seat vacancies and withdrawals).
* **Regional Adjustments:** Applies strict mathematical modifiers for Outside Delhi (OS) candidates vs. Delhi Residents (HS) due to differing seat availability.

### 2. The AI Counselor Engine
* **Context Injection:** When you chat with the AI, the backend sends your current category, entered rank, and the complete, real-time prediction database for your specific demographic to the Gemini API.
* **Prompt Engineering:** The AI is instructed via system prompts to act as an expert JAC Delhi counselor. It doesn't guess; it reads the calculated data table we provide it in the background to give you tier-by-tier branch breakdowns.
* **Conversational Memory:** It remembers the last few messages of your conversation to maintain context (e.g., if you ask "What about NSUT?" after talking about DTU).

---

## 🌟 Key Features

- **12 Admission Categories Supported:** General, EWS, OBC × Delhi/Outside Delhi × Gender Neutral/Female-only.
- **53 Engineering Branches:** Complete coverage of DTU, NSUT, IIIT-D, and IGDTUW.
- **Interactive 5-Year Trend Charts:** Visualize how cutoffs for specific branches have moved since 2021.
- **AI Chatbot:** Real-time, data-grounded advice for your specific rank.
- **Mobile-First Design:** Fully responsive dark-themed dashboard.

---

## 🚀 How to Run & Local Setup (Installation)

Follow these steps to get a local copy up and running on your machine.

### Prerequisites
- Node.js (Version 16.0.0 or higher)
- npm or yarn installed
- A free Google Gemini API key (Get it from [Google AI Studio](https://aistudio.google.com/))

### Step-by-Step Installation

1. **Clone the repository**
```bash
git clone [https://github.com/kavyaGupta747/JAC-Delhi-cutoff-predictor-2026-with-AI.git](https://github.com/kavyaGupta747/JAC-Delhi-cutoff-predictor-2026-with-AI.git)
cd JAC-Delhi-cutoff-predictor-2026-with-AI
```
### 🕒 Latest Updates (July 2026)
- v2.0.0 (July 2026):
Integrated Official Round 2 Cutoff Data for all participating institutes (DTU, NSUT, IIIT-D, and IGDTUW).
Refined prediction engine logic to account for actual Round 2 closing ranks.
Updated UI labels to clearly distinguish between "Predicted" and "Actual" cutoff status.
- v1.0.0 (June 2026): Initial launch with historical data (2021-2025) and Round 1 integration.