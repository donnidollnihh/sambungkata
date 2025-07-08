# Sambung Kata - Indonesian Word Chain Game

## Overview

Sambung Kata is a mobile-friendly Indonesian word chain game where players form words that start with the last letter of the previous word. The application features multiple difficulty levels, score tracking, and customizable settings. It's built as a full-stack web application using React, TypeScript, Express, and PostgreSQL.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks with custom state management
- **Routing**: Wouter (lightweight router)
- **HTTP Client**: TanStack Query for data fetching and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (via Neon serverless)
- **Session Management**: Express sessions with PostgreSQL storage
- **Build Process**: ESBuild for server bundling

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database
- **Session Storage**: PostgreSQL with connect-pg-simple
- **Local Storage**: Browser localStorage for client-side preferences
- **In-Memory Storage**: Fallback implementation for development

## Key Components

### Game Engine
- **Game State Management**: Custom hook (`useGameState`) managing level progression, scoring, and word validation
- **Timer System**: Custom hook (`useTimer`) for level-based time constraints
- **Word Validation**: Indonesian word dictionary with client-side validation
- **Scoring System**: Points based on word correctness, time bonuses, and level difficulty

### Database Schema
- **Users**: User authentication (prepared for future implementation)
- **Game Scores**: Score tracking with level, performance metrics, and timestamps
- **Game Settings**: User preferences for sound, music, animations, and default levels

### UI Components
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Component Library**: Custom shadcn/ui components with game-specific styling
- **Theme System**: CSS custom properties for consistent color schemes
- **Accessibility**: Focus management and keyboard navigation support

## Data Flow

1. **Game Initialization**: User selects difficulty level → game state initialized with level parameters
2. **Word Submission**: User input → client-side validation → score calculation → state update
3. **Level Progression**: Question count tracking → completion detection → score submission to backend
4. **Score Persistence**: Final scores sent to PostgreSQL → high score calculations → leaderboard updates
5. **Settings Management**: User preferences → localStorage + database sync → real-time UI updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Client-side routing
- **@radix-ui/react-**: Accessible UI primitives

### Development Dependencies
- **Vite**: Development server and build tool
- **TypeScript**: Type checking and compilation
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Server-side bundling

## Deployment Strategy

### Production Build
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Database Migration**: Drizzle Kit handles schema migrations
4. **Static Assets**: Served directly by Express in production

### Environment Configuration
- **Development**: Vite dev server with HMR, TSX execution
- **Production**: Express serves static files + API routes
- **Database**: Environment-based connection strings

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (Neon recommended)
- Support for ES modules
- Environment variable configuration

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```