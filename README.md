# FurryFrame

Your Farcaster frame for crafting and sharing purrfect cat moments.

## Overview

FurryFrame is a Farcaster frame application that allows users to create, enhance, and share cat photos through themed challenges. Users can upload their cat photos, apply AI-powered filters, and participate in themed photo challenges.

## Features

- **AI Photo Enhancement**: Upload a cat photo and apply AI-powered filters to automatically improve lighting, sharpness, and color.
- **Themed Photo Challenges**: Participate in weekly or daily themed photo challenges (e.g., 'Cats in Boxes', 'Sleepy Kitties').
- **Virtual Treat Gifting**: Send small 'virtual treats' (e.g., custom emoji stickers like a fish or a ball of yarn) to favorite submitted photos.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Authentication**: Privy (Farcaster authentication)
- **Storage**: IPFS via Pinata
- **AI**: OpenAI for image enhancement
- **Blockchain**: Base L2 for micro-transactions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/furryframe.git
   cd furryframe
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file based on `.env.example` and fill in your API keys:
   ```
   NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id
   PINATA_API_KEY=your-pinata-api-key
   PINATA_SECRET_KEY=your-pinata-secret-key
   OPENAI_API_KEY=your-openai-api-key
   NEYNAR_API_KEY=your-neynar-api-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Business Model

FurryFrame uses a micro-transaction model:
- Optional premium AI enhancement filters ($0.25/photo)
- Virtual treat gifting ($0.10/treat)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

