# ChatGPT Integration Setup Guide

## Overview
This feature adds a "Summarize" button to each post that uses ChatGPT to generate a concise summary of lengthy content.

## Setup Steps

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key (it starts with `sk-`)

### 2. Configure Environment Variables
1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=sk-your_actual_api_key_here
   ```

### 3. Features Added

#### New Components:
- **SummaryModal.tsx**: Modal component to display original and summarized content
- **API Route**: `/api/summarize` - Handles ChatGPT API calls

#### Updated Components:
- **PostCard.tsx**: Added "Summarize" button with brain icon

### 4. How It Works

1. **User clicks "Summarize" button** on any post
2. **Modal opens** showing loading state
3. **API call** is made to `/api/summarize` with post content
4. **ChatGPT processes** the content and returns a 2-3 sentence summary
5. **Modal displays** both original and summarized content side by side

### 5. API Configuration

The ChatGPT integration uses:
- **Model**: `gpt-3.5-turbo` (cost-effective and fast)
- **Max tokens**: 150 (keeps summaries concise)
- **Temperature**: 0.7 (balanced creativity and consistency)

### 6. Error Handling

- Shows toast notifications for API errors
- Handles missing API key gracefully
- Provides fallback messages for failed requests

### 7. Cost Considerations

- Each summary costs approximately $0.001-0.002
- Consider implementing rate limiting for production use
- Monitor usage in OpenAI dashboard

### 8. Customization Options

You can modify the summary prompt in `/api/summarize/route.ts`:
```javascript
content: `Please summarize the following content in a concise way (aim for 2-3 sentences): ${content}`
```

### 9. Testing

1. Start your development server: `npm run dev`
2. Create a post with lengthy content
3. Click the "Summarize" button
4. Verify the modal opens and shows both original and summarized content

## Troubleshooting

### Common Issues:
1. **"OpenAI API key not configured"**: Check your `.env.local` file
2. **"Failed to generate summary"**: Verify your API key is valid and has credits
3. **Modal not opening**: Check browser console for errors

### Support:
- Check OpenAI API documentation for rate limits and quotas
- Monitor API usage in OpenAI dashboard
- Review server logs for detailed error messages 