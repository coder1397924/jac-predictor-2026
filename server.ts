import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { getPredictionsForCategory, BRANCHES } from './src/data';
import { CategoryCode, BranchCode } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set!');
  }
  
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

app.post('/api/counselor', async (req, res) => {
  try {
    const { message, chatHistory, category } = req.body;
    
    console.log('📨 Request received:');
    console.log('  Category:', category);
    console.log('  Message:', message?.substring(0, 60));

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message required' });
    }

    // ✅ FIX #1: Strict category validation
    const validCategories: CategoryCode[] = [
      'GNGND','EWGND','OBGND','GNGNO','EWGNO','OBGNO',
      'GNGLD','EWGLD','OBGLD','GNGLO','EWGLO','OBGLO'
    ];
    
    if (!category || !validCategories.includes(category)) {
      console.error('❌ Invalid category:', category);
      return res.status(400).json({ 
        error: `Invalid category: ${category}`
      });
    }

    const activeCategory: CategoryCode = category;
    console.log('✅ Using category:', activeCategory);

    const ai = getAI();
    
    // ✅ FIX #2: Get fresh predictions for the ACTUAL category
    const predictions = getPredictionsForCategory(activeCategory);
    
    const allBranches = Object.entries(predictions)
      .filter(([_, v]) => v.actualR1 > 0)
      .sort((a, b) => a[1].actualR1 - b[1].actualR1);

    console.log(`✅ Found ${allBranches.length} branches for ${activeCategory}`);

    // ✅ FIX #3: Build COMPLETE branch database with all details
    let branchDatabase = `\n=== JAC DELHI BRANCH DATABASE FOR CATEGORY: ${activeCategory} ===\n`;
    branchDatabase += `Total Active Branches: ${allBranches.length}\n\n`;
    
    for (const [key, value] of allBranches) {
      const branch = BRANCHES[key as BranchCode];
      branchDatabase += `${branch.college} | ${branch.name}\n`;
      branchDatabase += `  Code: ${key}\n`;
      branchDatabase += `  R1 (Actual 2026): ${value.actualR1}\n`;
      branchDatabase += `  Worst Case R2: ${value.worstCase.r2} | R3: ${value.worstCase.r3} | R4: ${value.worstCase.r4} | R5: ${value.worstCase.r5} | Upgrad: ${value.worstCase.upgradation}\n`;
      branchDatabase += `  True Outcome R2: ${value.trueOutcome.r2} | R3: ${value.trueOutcome.r3} | R4: ${value.trueOutcome.r4} | R5: ${value.trueOutcome.r5} | Upgrad: ${value.trueOutcome.upgradation}\n\n`;
    }

    // ✅ FIX #4: Crystal clear instructions to AI
    const systemPrompt = `You are an expert JAC Delhi AI Counselor.

CURRENT CATEGORY: ${activeCategory}
BRANCH DATA BELOW:
${branchDatabase}

YOUR TASK:
1. Extract the candidate's JEE Main rank from their message
2. Group branches into these categories:
   - ✅ HIGH CHANCE (R1): Rank <= R1 value
   - ⚠️ LIKELY (R2-R3): R1 < Rank <= Worst Case R3
   - ⚠️ POSSIBLE (R4-R5): Worst Case R3 < Rank <= Worst Case R5
   - ⚠️ UPGRADATION: Worst Case R5 < Rank <= Worst Case Upgrad
   - ❌ NOT POSSIBLE: Rank > Worst Case Upgrad

3. ALWAYS provide the FULL breakdown in this format:

"At [RANK] in ${activeCategory}:

✅ HIGH CHANCE (R1):
[List colleges and branches where rank <= R1, with their R1 values]

⚠️ LIKELY (R2-R3):
[List colleges and branches in this range]

⚠️ POSSIBLE (R4-R5):
[List colleges and branches in this range]

⚠️ UPGRADATION POSSIBLE:
[List colleges and branches in this range]

❌ NOT POSSIBLE (Too High):
[List top 3-5 closest misses with their R1 values]

Summary: You have strong chances of securing [TIER 1 BRANCHES]. Branches in Tier 2-3 are achievable through subsequent rounds."

4. BE SPECIFIC: Always mention college name + branch name, never generic
5. BE COMPLETE: Show ALL matching branches in each tier
6. NEVER TRUNCATE: Always finish the response completely`;

    // ✅ FIX #5: Fresh conversation without stale context
    const conversationContents = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      {
        role: 'model',
        parts: [{ text: `Understood perfectly. I am now JAC Delhi AI Counselor for **${activeCategory}** category. I have the complete branch database with all R1, R2, R3, R4, R5, and Upgradation values. I will provide FULL breakdowns for any rank provided, grouped into clear tiers with specific college + branch names. Ready to analyze.` }]
      }
    ];

    // ✅ FIX #6: Add minimal chat history (only recent 2 messages to avoid context bloat)
    const safeHistory = Array.isArray(chatHistory) ? chatHistory.slice(-2) : [];
    for (const msg of safeHistory) {
      if (msg?.role && msg?.text) {
        conversationContents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }

    // ✅ FIX #7: Add current message
    conversationContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    console.log('🚀 Calling Gemini API...');
    
    // ✅ FIX #8: Increase token limit and remove streaming issues
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: conversationContents,
      config: { 
        temperature: 0.3,  // Lower temperature = more deterministic/complete responses
        maxOutputTokens: 2000,  // ✅ INCREASED from 500 to 2000
      }
    });

    console.log('✅ Response received from Gemini');
    
    // ✅ FIX #9: Properly extract text from response
    let responseText = '';
    if (typeof response.text === 'function') {
      responseText = response.text();
    } else if (typeof response.text === 'string') {
      responseText = response.text;
    } else {
      responseText = response.text || 'Unable to generate response';
    }

    // ✅ FIX #10: Ensure response is not empty
    if (!responseText || responseText.trim().length === 0) {
      console.error('❌ Empty response from Gemini');
      return res.status(500).json({ 
        error: 'Gemini returned empty response'
      });
    }

    console.log('✅ Response length:', responseText.length);
    res.json({ text: responseText });

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ 
      error: error.message || 'Unknown error',
      hint: 'Check GEMINI_API_KEY and category'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ JAC Delhi Predictor running on http://0.0.0.0:${PORT}`);
  });
}

startServer();