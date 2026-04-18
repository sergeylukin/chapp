import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  async translate(message: string, targetLocale = "en_US"): Promise<string> {
    const prompt = `
You are a real-time translator for a chat app.
Translate the message while preserving tone and intent.

Target language: ${targetLocale}
Message: ${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return response.text;
  }

}
