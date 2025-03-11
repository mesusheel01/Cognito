import OpenAI from 'openai';

const client = new OpenAI({
<<<<<<< HEADgit 
  apiKey: OPEN_AI_API_KEY, // This is the default and can be omitted
=======
  apiKey: OPEN_AI_API_KEY // This is the default and can be omitted
>>>>>>> f4e1e80 (Research about some ai thing!)
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
