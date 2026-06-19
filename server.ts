import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy_key",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Healthy proof checks
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Server-side AI quiz generation endpoint
app.post("/api/generate-quiz", async (req, res) => {
  const { topic, difficulty, questionCount } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Please input a valid quiz topic/subject." });
  }

  // Fallback if no API key is set
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
    return res.status(400).json({
      error: "Gemini API key is unconfigured. Please configure it in the Secrets panel."
    });
  }

  const prompt = `Create a fully functional gamified quiz about '${topic}' with exactly ${questionCount || 5} questions targeting a difficulty of '${difficulty || "Intermediate"}'. All options must be clear, engaging, and unique. Formulate questions cleanly containing multiple-choice ('mc') or true/false ('tf').`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the ultimate quiz creation engine. Craft engaging questions and comprehensive options. Format your output strictly matching the provided JSON schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Visually exciting title of the quiz" },
            category: { type: Type.STRING, description: "General category name (e.g., Computer Science, Biology, Pop Culture)" },
            description: { type: Type.STRING, description: "Polished, inspiring marketing description (max 20 words)" },
            duration: { type: Type.INTEGER, description: "A balanced time duration in seconds (e.g., 120 or 150)" },
            xpReward: { type: Type.INTEGER, description: "XP reward proportional to questions (e.g., multiplier of 30 or 40 per question)" },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING, description: "The clear quiz question" },
                  type: { type: Type.STRING, description: "Question type: 'mc' or 'tf'" },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "For 'mc' provide exactly 4 items. For 'tf' list exactly: ['True', 'False']"
                  },
                  correctAnswer: { type: Type.STRING, description: "The correct option value, string-matching one of the options elements exactly." }
                },
                required: ["text", "type", "options", "correctAnswer"]
              }
            }
          },
          required: ["title", "category", "description", "duration", "xpReward", "questions"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({
      error: "Failed to generate AI quiz. Please verify search credentials.",
      details: error?.message || String(error)
    });
  }
});

async function startServer() {
  // Vite integration middleware
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
    console.log(`[Qyzz Server] Running at http://localhost:${PORT}`);
  });
}

startServer();
