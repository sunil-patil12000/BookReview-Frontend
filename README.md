# BookReview Platform

A modern web application for discovering, reviewing, and sharing book recommendations. This platform helps readers connect with books they'll love and share their reading experiences with others.

## Features

- **Browse Books**: Discover new reads with our comprehensive book catalog
- **Book Details**: View detailed information about books, including descriptions, author info, and reader reviews
- **User Reviews**: Read and write reviews for your favorite books
- **User Authentication**: Create an account to save your favorite books and share your reviews
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive interface built with Next.js and Tailwind CSS

## Technology Stack

- **Frontend**: Next.js 15
- **UI Framework**: React 19
- **Styling**: Tailwind CSS
- **Component Library**: Shadcn/UI with Radix UI primitives
- **Authentication**: Custom authentication system
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/bookreview.git
   cd bookreview/frontend
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Start the development server
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/app`: Next.js app directory containing routes and page components
- `/components`: Reusable UI components
- `/contexts`: React context providers for state management
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and shared logic
- `/public`: Static assets like images
- `/styles`: Global styles and theme configuration

## Available Scripts

- `pnpm dev`: Start the development server
- `pnpm build`: Build the application for production
- `pnpm start`: Start the production server
- `pnpm lint`: Run ESLint to check for code quality issues

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
