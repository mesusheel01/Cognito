import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: "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", // This is the default and can be omitted
});
async function getAiOutput(content, searchQuery){
  const response = await client.responses.create({
  model: 'gpt-4o',
  instructions: "You are provided with a url, doc, or twitter related thing act as a genuis and give the best and short output for the input}",
  input: `${content} ${searchQuery} `});

console.log(response)
}
const content = {
  createdAt: "2025-03-09T20:08:59.069Z",
  link: "https://www.youtube.com/watch?v=S2mkcXrYjT4",
  tags: ['67cdf55ac174dd0fe6db336b'],
  title: "youtube",
  type : "video"
}
getAiOutput(content, "Give the brief about this video")
