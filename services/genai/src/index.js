import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});

// DISABLED FOR NOW - TOO GENERIC
/*app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ result: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});*/

app.get("/translate", async (req, res) => {
  try {
    const { targetLocale, message } = req.query;

    if (!targetLocale || !message) {
      return res.status(400).json({
        error: "incorrect usage",
      });
    }

    const prompt = [
      "You are a translation engine.",
      "Your task is to translate text only.",
      "",
      "Rules:",
      "- Output ONLY the translated text.",
      "- Your entire response must be only the translated text and nothing else.",
      "- Do NOT add explanations, comments, notes, or alternatives.",
      "- Do NOT include quotes, prefixes, or labels.",
      "- Do NOT repeat the original message.",
      "- Do NOT say anything like 'Here is the translation'.",
      "- If the input is already in the target language, return it unchanged.",
      "",
      `Target language: ${targetLocale}`,
      `Input: ${message}`,
      "",
      "Output:"
    ].join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    res.json({ result: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

app.listen(3001, () => {
  console.log("GenAI service running on 3001");
});
