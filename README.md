# rUv - Social Media Platform

rUv is a cutting-edge social media platform designed to help users capture and share their most memorable moments through images and connect with others who share similar interests.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and profile management
- Image uploading and sharing
- Social networking capabilities
- Real-time chat with AI-powered responses
- Customizable user settings
- Subscription plans

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account and project

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

4. Initialize Supabase:
   - Create a new Supabase project
   - Run the SQL commands from `./sql/init.sql` in the Supabase SQL editor

5. Start the development server:
   ```
   npm run dev
   ```

## Configuration

### Supabase Setup

1. Create a new Supabase project
2. Copy the project URL and API key to your `.env` file
3. Run the SQL commands from `./sql/init.sql` in the Supabase SQL editor to set up the necessary tables and functions

### Theme Configuration

The project uses `next-themes` for theme management. You can customize the theme in `tailwind.config.js`.

### API Integration

The project uses Supabase for backend services. Ensure that your Supabase project is properly configured and the connection details are correctly set in the `.env` file.

## Usage

After starting the development server, you can access the application at `http://localhost:5173` (or the port specified by Vite).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.