# rUv - Social Media Application

rUv is a modern social media application built with React and integrated with Supabase for backend services.

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