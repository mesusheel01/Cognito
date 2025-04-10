import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from 'openai';
import axios from 'axios';
import dotenv from 'dotenv';
import { TwitterApi, TweetV2SingleResult } from 'twitter-api-v2';


dotenv.config();
const token = process.env.GITHUB_TOKEN;

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: token
});

let twitterClient: TwitterApi | null = null;
try {
  if (process.env.X_BEARER_TOKEN) {
    console.log("Using Twitter OAuth 2.0 with bearer token");
    twitterClient = new TwitterApi(process.env.X_BEARER_TOKEN);
  }
  else if (process.env.X_API_KEY &&
           process.env.X_API_SECRET &&
           process.env.X_ACCESS_TOKEN &&
           process.env.X_ACCESS_SECRET) {
    console.log("Using Twitter OAuth 1.0a with consumer keys");
    twitterClient = new TwitterApi({
      appKey: process.env.X_API_KEY,
      appSecret: process.env.X_API_SECRET,
      accessToken: process.env.X_ACCESS_TOKEN,
      accessSecret: process.env.X_ACCESS_SECRET,
    });
  } else {
    console.log("No valid Twitter credentials found, will use fallback method");
  }
} catch (error) {
  if (error instanceof Error) {
    console.error("Error initializing Twitter client:", error.message);
  } else {
    console.error("Unknown error initializing Twitter client");
  }
}

interface Content {
  createdAt: string;
  link: string;
  tags: string[];
  title: string;
  type: string;
  description?: string;
}

export default async function getAiResultFromContent(content: Content, userPrompt: string = ""): Promise<string> {
  try {
    let prompt = "";
    let contentData = "";

    switch(content.type.toLowerCase()) {
      case 'video':
        contentData = await getVideoContent(content.link);
        contentData = contentData.slice(0, 3000);
        prompt = `${userPrompt || "Generate a comprehensive summary of this video content."}\n\nVideo Title: ${content.title}\nVideo Content: ${contentData}`;
        break;

      case 'twitter':
        contentData = await getTwitterContent(content.link);
        prompt = `${userPrompt || "Analyze this Twitter content and provide key insights."}\n\nTwitter Post: ${content.title}\nContent: ${contentData}`;
        break;

      case 'docs':
        contentData = content.description || content.link;
        contentData = contentData.slice(0, 4000);
        prompt = `${userPrompt || "Summarize the main points from this document."}\n\nDocument Title: ${content.title}\nDocument Content: ${contentData}`;
        break;

      case 'links':
        contentData = await getWebpageContent(content.link);
        contentData = contentData.slice(0, 3000);
        prompt = `${userPrompt || "Extract the key information from this webpage."}\n\nWebpage Title: ${content.title}\nURL: ${content.link}\nContent: ${contentData}`;
        break;

      default:
        contentData = JSON.stringify(content);
        prompt = `${userPrompt || "Analyze this content and provide insights."}\n\nContent Title: ${content.title}\nContent: ${contentData}`;
    }

    const maxChars = 10000;
    const truncatedContent = prompt.slice(0, maxChars);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: truncatedContent }
      ],
      temperature: 0.7,
      max_tokens: 10000,
      top_p: 1
    });

    const aiContent = response.choices[0]?.message?.content;
    if (!aiContent) {
      throw new Error("AI response is empty or malformed");
    }

    console.log(aiContent);
    return aiContent;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error processing content:", error.message);
    } else {
      console.error("Unknown error processing content");
    }
    return "Sorry, I encountered an error analyzing this content. Please try again later.";
  }
}

async function getVideoContent(videoUrl: string): Promise<string> {
  try {
    let videoId = videoUrl;

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      if (videoUrl.includes('v=')) {
        videoId = videoUrl.split('v=')[1].split('&')[0];
      } else if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
      }
    }
    console.log(videoId)
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    const limitedTranscript = transcript.slice(0, 30);
    const transcriptText = limitedTranscript.map(item => item.text).join(' ');
    console.log(transcriptText)
    return transcriptText;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "YoutubeTranscriptDisabledError") {
        return "Transcript is disabled for this video.";
      }
      return `Could not extract video content: ${error.message}`;
    }
    return "An unknown error occurred while extracting video content.";
  }
}

async function getTwitterContent(twitterUrl: string): Promise<string> {
  if (!twitterClient) {
    return `Tweet URL: ${twitterUrl}\n(Could not initialize Twitter API client. Please check your credentials.)`;
  }

  try {
    let tweetId: string | null = null;

    if (twitterUrl.includes('twitter.com') || twitterUrl.includes('x.com')) {
      const urlParts = twitterUrl.split('/');
      const statusIndex = urlParts.indexOf('status');

      if (statusIndex !== -1 && statusIndex + 1 < urlParts.length) {
        tweetId = urlParts[statusIndex + 1];
        tweetId = tweetId.split('?')[0];
      }
    }

    if (!tweetId) {
      return `Could not extract Tweet ID from URL: ${twitterUrl}`;
    }

    console.log(`Fetching tweet with ID: ${tweetId}`);

    const readOnlyClient = twitterClient.readOnly;

    const tweet: TweetV2SingleResult = await readOnlyClient.v2.singleTweet(tweetId, {
      expansions: [
        'author_id',
        'attachments.media_keys',
        'referenced_tweets.id',
        'referenced_tweets.id.author_id'
      ],
      'tweet.fields': [
        'created_at',
        'public_metrics',
        'text'
      ],
      'user.fields': [
        'name',
        'username',
        'verified'
      ]
    });

    let formattedTweet = '';

    const author = tweet.includes?.users?.find(user => user.id === tweet.data.author_id);
    if (author) {
      formattedTweet += `Author: ${author.name} (@${author.username})`;
      if (author.verified) formattedTweet += ' ✓\n';
      formattedTweet += '\n';
    }

    formattedTweet += `Tweet: ${tweet.data.text}\n`;

    if (tweet.data.public_metrics) {
      const metrics = tweet.data.public_metrics;
      formattedTweet += `\nMetrics: ${metrics.like_count} likes · ${metrics.retweet_count} retweets · ${metrics.reply_count} replies\n`;
    }

    return formattedTweet;

  } catch (error) {
    if (error instanceof Error) {
      console.error('Twitter API Error:', error.message);
      return `Error fetching tweet: ${error.message}. URL: ${twitterUrl}`;
    }
    return "An unknown error occurred while fetching tweet content.";
  }
}

async function getWebpageContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const htmlText = response.data;
    const paragraphs = htmlText.match(/<p[^>]*>(.*?)<\/p>/g);

    if (paragraphs && paragraphs.length > 0) {
      const limitedParagraphs = paragraphs.slice(0, 10).join(' ');
      const textContent = limitedParagraphs.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      return textContent.slice(0, 2000);
    }

    const textContent = htmlText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return textContent.slice(0, 2000);
  } catch (error) {
    if (error instanceof Error) {
      return `Could not extract webpage content: ${error.message}`;
    }
    return "An unknown error occurred while extracting webpage content.";
  }
}
const content: Content = {
    createdAt: "2025-03-09T20:08:59.069Z",
    link: "https://x.com/inkdrop_app/status/1909493045697167864",
    tags: ['67cdf55ac174dd0fe6db336b'],
    title: "youtube",
    type: "twitter"
  };
getAiResultFromContent(content,"")
