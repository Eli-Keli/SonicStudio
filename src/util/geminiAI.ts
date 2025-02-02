import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCAnRZulVO_7v4wZzgPfob8ZKupJWiBWog");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface MusicGenerationResult {
  code: string;
  explanation: string;
}

/**
 * Generates Sonic Pi code from natural language description
 * @param prompt - User's description of desired music
 * @returns Promise with generated code and explanation
 */
export async function generateMusicCode(prompt: string): Promise<MusicGenerationResult> {
  try {
    validatePrompt(prompt);

    const response = await model.generateContent(prompt);

    return {
      code: response.response.text(),
      explanation: "Generated using Gemini AI"
    };
  } catch (error) {
    console.error("Music generation error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate music code: ${error.message}`);
    } else {
      throw new Error('Failed to generate music code: Unknown error');
    }
  }
}

/**
 * Modifies existing Sonic Pi code based on user request
 * @param existingCode - Current Sonic Pi code
 * @param modification - Requested changes
 * @returns Promise with modified code and explanation
 */
export async function modifyMusicCode(
  existingCode: string,
  modification: string
): Promise<MusicGenerationResult> {
  try {
    validatePrompt(modification);

    const response = await model.generateContent(`Current code:\n${existingCode}\n\nRequested modification:\n${modification}`
    );

    return {
      code: response.response.text(),
      explanation: "Modified using Gemini AI"
    };
  } catch (error) {
    console.error("Code modification error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to modify music code: ${error.message}`);
    } else {
      throw new Error('Failed to modify music code: Unknown error');
    }
  }
}

/**
 * Validates user prompt before sending to API
 * @param prompt - User input to validate
 * @returns boolean indicating if prompt is valid
 */
function validatePrompt(prompt: string): boolean {
  if (!prompt || prompt.trim().length < 3) {
    throw new Error('Prompt too short or empty');
  }

  if (prompt.length > 1000) {
    throw new Error('Prompt too long (max 1000 characters)');
  }

  return true;
}
