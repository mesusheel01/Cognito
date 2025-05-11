import dotenv from 'dotenv'
dotenv.config()
import { OpenAI } from 'openai'
import { TwitterApi } from 'twitter-api-v2'

const credentialCheckStatus = async () => {
    try {
        const credentials = {
            // OpenAI/GitHub credentials
            hasOpenAICredentials: !!(process.env.OPENAI_API_KEY || process.env.GITHUB_TOKEN),

            // Twitter credentials
            hasTwitterCredentials: !!(
                process.env.X_BEARER_TOKEN ||
                (process.env.X_API_KEY &&
                 process.env.X_API_SECRET &&
                 process.env.X_ACCESS_TOKEN &&
                 process.env.X_ACCESS_SECRET)
            ),

            // JWT credentials
            hasJWTSecret: !!process.env.JWT_SECRET,

            // Database credentials
            hasMongoURI: !!process.env.MONGODB_URI
        };

        // Test OpenAI credentials
        let openaiStatus = 'not_configured';
        let openaiError = null;
        if (process.env.OPENAI_API_KEY || process.env.GITHUB_TOKEN) {
            try {
                const openai = new OpenAI({
                    apiKey: process.env.OPENAI_API_KEY || process.env.GITHUB_TOKEN,
                    baseURL: process.env.OPENAI_API_KEY ? undefined : "https://models.inference.ai.azure.com"
                });

                await openai.chat.completions.create({
                    model: "gpt-4o",
                    messages: [{ role: "user", content: "test" }],
                    max_tokens: 5
                });

                openaiStatus = 'working';
            } catch (error) {
                console.error('OpenAI test failed:', error);
                openaiStatus = 'error';
                openaiError = error instanceof Error ? error.message : 'Unknown OpenAI error';
            }
        }

        // Test Twitter credentials
        let twitterStatus = 'not_configured';
        let twitterError = null;
        if (credentials.hasTwitterCredentials) {
            try {
                let twitterClient;
                if (process.env.X_BEARER_TOKEN) {
                    twitterClient = new TwitterApi(process.env.X_BEARER_TOKEN);
                } else {
                    twitterClient = new TwitterApi({
                        appKey: process.env.X_API_KEY!,
                        appSecret: process.env.X_API_SECRET!,
                        accessToken: process.env.X_ACCESS_TOKEN!,
                        accessSecret: process.env.X_ACCESS_SECRET!
                    });
                }
                twitterStatus = 'working';
            } catch (error) {
                console.error('Twitter test failed:', error);
                twitterStatus = 'error';
                twitterError = error instanceof Error ? error.message : 'Unknown Twitter error';
            }
        }

        // Prepare response object
        const response = {
            status: 'success',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            credentials: {
                ...credentials,
                openaiStatus,
                twitterStatus
            },
            missingCredentials: Object.entries(credentials)
                .filter(([_, value]) => !value)
                .map(([key]) => key),
            errors: {
                openai: openaiError,
                twitter: twitterError
            }
        };

        // Determine if there are any critical errors
        const hasCriticalErrors = response.missingCredentials.length > 0 ||
                                openaiStatus === 'error' ||
                                twitterStatus === 'error';

        return {
            statusCode: hasCriticalErrors ? 500 : 200,
            data: response
        };

    } catch (error) {
        console.error('Credential check failed:', error);
        return {
            statusCode: 500,
            data: {
                status: 'error',
                message: error instanceof Error ? error.message : 'Unknown error occurred',
                timestamp: new Date().toISOString()
            }
        };
    }
}

export default credentialCheckStatus
