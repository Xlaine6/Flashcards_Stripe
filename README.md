# Flashcardyo

## Why This Project Exists

As a student struggling with the overwhelming amount of information to memorize, I found traditional study methods inefficient and time-consuming. To address this, I created a Flashcardyo application that revolutionizes how students like me approach learning and retention.

By leveraging AI to generate flashcards from any text input, this tool significantly reduces the time spent creating study materials. The spaced repetition algorithm ensures optimal review intervals, maximizing long-term retention. What began as a personal project to improve my own study habits has evolved into a powerful platform that benefits students across various disciplines.

## Features

- **AI-powered flashcard generation**: Simply input your study material, and our AI will create comprehensive flashcards for you.
- **Spaced repetition algorithm**: Optimizes your study schedule for maximum retention.
- **User authentication**: Secure login and personalized flashcard sets.
- **Pro subscription**: Access advanced features like unlimited flashcard sets, multimedia cards, and priority AI generation.
- **Mobile-responsive design**: Study anytime, anywhere, on any device.
- **Progress tracking**: Monitor your learning progress with detailed analytics.
- **Collaborative learning**: Share flashcard sets with peers and study together.
- **Customizable themes**: Personalize your study environment to suit your preferences.
- **Export functionality**: Download your flashcards for offline study.

## Tech Stack

- **Frontend**: Next.js, React, Material-UI
- **Backend**: Firebase
- **Authentication**: Clerk
- **AI Integration**: OpenAI API
- **Payment Processing**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Firebase account
- Clerk account
- OpenAI API key
- Stripe account
  
## Usage

1. Sign up for an account or log in
2. Navigate to the "Create Flashcards" page
3. Input your study material or upload a file
4. Click "Generate Flashcards"
5. Review and edit the generated flashcards
6. Start studying!

## API Reference

Our API allows you to programmatically create and manage flashcards. Here are some key endpoints:

- `POST /api/flashcards`: Create a new flashcard set
- `GET /api/flashcards`: Retrieve all flashcard sets for the authenticated user
- `GET /api/flashcards/{id}`: Retrieve a specific flashcard set
- `PUT /api/flashcards/{id}`: Update a flashcard set
- `DELETE /api/flashcards/{id}`: Delete a flashcard set

## Deployment

I use Vercel for deployment. To deploy your own instance:

1. Sign up for a Vercel account
2. Connect your GitHub repository
3. Configure your environment variables in the Vercel dashboard
4. Deploy!

Made with ❤️ by Elaine
Instructor: Bill Z
