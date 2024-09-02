# rUv - Capturing Moments, Creating Memories

rUv is a social media application that allows users to capture and share moments, create memories, and interact with an AI-powered chat interface.

## Features

- User authentication (sign up, log in, log out)
- Profile management
- AI-powered chat interface
- Image upload and sharing
- Analytics dashboard

## Technologies Used

- React
- Vite
- Tailwind CSS
- Supabase (for backend and authentication)
- Tanstack Query (for data fetching and state management)
- Recharts (for analytics visualization)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL commands in `./sql/init.sql` in the Supabase SQL editor
   - Copy the Supabase project URL and API key
4. Create a `.env` file in the root directory with the following content:
   ```
   VITE_SUPABASE_PROJECT_URL=your_supabase_project_url
   VITE_SUPABASE_API_KEY=your_supabase_api_key
   ```
5. Start the development server: `npm run dev`

## Configuration Options

The application uses various configuration options stored in Supabase tables:

### LLM Settings

These settings are stored in the `llm_settings` table and can be customized per user:

- `model`: The AI model to use (default: 'gpt-3.5-turbo')
- `temperature`: Controls randomness in responses (default: 0.7)
- `max_tokens`: Maximum number of tokens in the response (default: 150)
- `top_p`: Controls diversity of responses (default: 1)
- `frequency_penalty`: Reduces repetition of similar phrases (default: 0)
- `presence_penalty`: Encourages the model to talk about new topics (default: 0)

### Profile Settings

User profiles are stored in the `profiles` and `public_profiles` tables. Users can update their:

- First name
- Last name
- Avatar URL

### Chat Settings

Chat conversations can be saved and managed using the `saved_chats` table. Users can:

- Save chat conversations
- Rename saved chats
- Delete saved chats

## Deployment

To deploy the application:

1. Build the project: `npm run build`
2. Deploy the contents of the `dist` folder to your preferred hosting service (e.g., Vercel, Netlify, or GitHub Pages)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.