# Generative Engineering

Generative Engineering is a cutting-edge social media platform designed to help users capture and share their most memorable moments through images and connect with others who share similar interests. Powered by Supabase, Generative Engineering offers a seamless and secure experience for users to create, share, and explore content.

## Features

- User authentication and profile management
- Image uploading and sharing
- Social networking capabilities
- Real-time chat functionality
- Analytics dashboard for user insights
- Subscription plans for enhanced features

## Technology Stack

- Frontend: React.js with Vite
- Backend: Supabase (PostgreSQL database and authentication)
- Styling: Tailwind CSS
- State Management: React Query
- Routing: React Router
## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_PROJECT_URL=your_supabase_project_url
VITE_SUPABASE_API_KEY=your_supabase_api_key
```

Replace `your_supabase_project_url` and `your_supabase_api_key` with your actual Supabase project URL and API key.

### Supabase Setup

1. Create a new Supabase project.
2. Run the SQL script in `./sql/init.sql` in your Supabase SQL editor to set up the necessary tables, views, and functions.

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Features

- User authentication (signup, login, logout)
- Profile management
- Chat functionality
- Settings management
- Dark/Light mode toggle

## Tech Stack

- React
- Vite
- Supabase
- Tailwind CSS
- React Router
- React Query

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
