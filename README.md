# FurryFrame

Your Farcaster frame for crafting and sharing purrfect cat moments.

## Overview

FurryFrame is a Farcaster frame application that allows users to:

1. Upload and enhance cat photos with AI-powered filters
2. Participate in themed photo challenges
3. Send virtual treats to their favorite cat photos

## Features

### AI Photo Enhancement

Upload a cat photo and apply AI-powered filters to automatically improve lighting, sharpness, and color. Users can choose from a selection of free basic filters or opt for premium filters.

### Themed Photo Challenges

Participate in weekly or daily themed photo challenges (e.g., 'Cats in Boxes', 'Sleepy Kitties'). Users can submit their enhanced photos to the challenge within the Farcaster frame.

### Virtual Treat Gifting

Users can send small 'virtual treats' (e.g., custom emoji stickers like a fish or a ball of yarn) to their favorite submitted photos within a challenge. Gifting requires a small micro-transaction.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: Privy (Farcaster login)
- **Storage**: IPFS via Pinata
- **AI Enhancement**: OpenAI
- **Blockchain**: Base L2 for micro-transactions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Privy account
- Pinata account
- OpenAI API key
- Neynar API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Copy `.env.example` to `.env.local` and fill in the required environment variables
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

- `NEXT_PUBLIC_PRIVY_APP_ID`: Your Privy app ID
- `PINATA_API_KEY`: Your Pinata API key
- `PINATA_SECRET_KEY`: Your Pinata secret key
- `OPENAI_API_KEY`: Your OpenAI API key
- `NEYNAR_API_KEY`: Your Neynar API key for Farcaster

## Business Model

FurryFrame uses a micro-transaction business model:

- Optional premium AI enhancement filters ($0.25/photo)
- Virtual treat gifting ($0.10/treat)

## License

This project is licensed under the MIT License.

