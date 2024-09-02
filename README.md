# rUv - Capturing Moments, Creating Memories

rUv is a social media platform designed to help users capture and share their most memorable moments through images and connect with others who share similar interests.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ruv.git
   cd ruv
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   VITE_SUPABASE_PROJECT_URL=your_supabase_project_url
   VITE_SUPABASE_API_KEY=your_supabase_api_key
   ```

4. Set up Supabase:
   - Create a new project in Supabase
   - Run the SQL commands from `./sql/init.sql` in the Supabase SQL editor

5. Start the development server:
   ```
   npm run dev
   ```

## Features

- User authentication (signup, login, logout)
- Profile management
- Image uploading and sharing
- Chat functionality
- Dark/Light mode toggle
- Subscription plans

## Configuration Options

- Theme: Users can toggle between dark and light mode in the settings.
- Language: Users can select their preferred language (English, Spanish, French).
- Privacy: Users can set their profile privacy level (Public, Friends Only, Private).
- Notifications: Users can enable or disable notifications.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Supabase (Backend and Authentication)
- React Router
- Tanstack Query (React Query)
- Lucide React (Icons)
- Recharts (for analytics graphs)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.