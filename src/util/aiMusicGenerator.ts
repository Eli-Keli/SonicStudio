import OpenAI from "openai";

// Types for music generation results
interface MusicGenerationResult {
  code: string;
  explanation: string;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: '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'
});

/**
 * Generates Sonic Pi code from natural language description
 * @param prompt - User's description of desired music
 * @returns Promise with generated code and explanation
 */
export async function generateMusicCode(prompt: string): Promise<MusicGenerationResult> {
  try {
    validatePrompt(prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a Sonic Pi expert. Generate valid Ruby code for Sonic Pi based on natural language descriptions. Include only code, no explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    return {
      code: response.choices[0].message.content || "",
      explanation: "Generated using GPT-4"
    };
  } catch (error) {
    console.error("Music generation error:", error);
    throw new Error(`Failed to generate music code: ${error.message}`);
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

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a Sonic Pi expert. Modify the given Ruby code according to the user's request. Return only the modified code, no explanations."
        },
        {
          role: "user",
          content: `Current code:\n${existingCode}\n\nRequested modification:\n${modification}`
        }
      ],
      temperature: 0.7
    });

    return {
      code: response.choices[0].message.content || "",
      explanation: "Modified using GPT-4"
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