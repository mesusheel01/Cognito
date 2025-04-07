import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env["GITHUB_TOKEN"];

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: token
});

const content = {
  createdAt: "2025-03-09T20:08:59.069Z",
  link: "https://www.youtube.com/watch?v=4XVvbZj794o",
  tags: ['67cdf55ac174dd0fe6db336b'],
  title: "youtube",
  type: "video"
};

const videoId = content.link.split('v=')[1];

export async function main(videoId) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId)
    const maxChars = 10000; // ~2000 tokens
    const transcriptText = transcript.map(item => item.text).join(' ');
    const trimmedTranscript = transcriptText.slice(0, maxChars); // truncate extra
    // console.log(transcript);


    const prompt = `Here's the transcript of a YouTube video:\n${trimmedTranscript}\n\nGive a brief summary of what this video is about.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 10000,
      top_p: 1
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    if (error.name === "YoutubeTranscriptDisabledError") {
      console.error("Transcript is disabled for this video. Please try a different video.");
    } else {
      console.error("Error fetching transcript or generating response:", error);
    }
  }
}

main(videoId);
