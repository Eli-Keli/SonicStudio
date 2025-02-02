import OpenAI from "openai";

// Types for our speech recognition results
interface TranscriptionResult {
  text: string;
  confidence: number;
}

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: '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'
});

/**
 * Converts audio file to text using OpenAI's Whisper API
 * @param audioFile - The audio file buffer to transcribe
 * @returns Promise containing transcribed text and confidence score
 */
export async function transcribeAudio(
  audioFile: File | Buffer
): Promise<TranscriptionResult> {
  try {
    // Call Whisper API to convert speech to text
    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "en" // Can be changed based on needs
    });

    return {
      text: response.text,
      confidence: 0.95 // Whisper API currently doesn't return confidence scores
    };
  } catch (error) {
    console.error("Transcription error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to transcribe audio: ${error.message}`);
    } else {
      throw new Error('Failed to transcribe audio: Unknown error');
    }
  }
}

/**
 * Validates audio file before sending to API
 * @param file - The audio file to validate
 * @returns boolean indicating if file is valid
 */
export function validateAudioFile(file: File): boolean {
  const validTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/webm, audio/caf'];
  const maxSize = 25 * 1024 * 1024; // 25MB limit for Whisper API

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid audio file type');
  }

  if (file.size > maxSize) {
    throw new Error('Audio file too large (max 25MB)');
  }

  return true;
}