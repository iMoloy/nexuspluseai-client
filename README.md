# NexusPulse AI — Next-Gen Super-App Client 🎨⚡

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nexuspulseai-client.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An AI-Powered Gig Marketplace, Asset & Vehicle Rental, and Cryptographic Escrow Financial Super-App Ecosystem.

🌐 **Live Demo:** [https://nexuspulseai-client.vercel.app](https://nexuspulseai-client.vercel.app)  
📡 **Live Backend API:** [https://nexuspluseai-server.onrender.com/api/v1](https://nexuspluseai-server.onrender.com/api/v1)

---

## ✨ Features & Highlights

- **🤖 AI Task Spec & Dispute Mediator (Gemini AI)**: Automated project specification, budget estimation, and binding dispute settlement recommendations.
- **🛡️ Cryptographic Escrow Ledger**: Locked security deposits and funds for asset rentals and micro-tasking gigs.
- **🚗 Asset & Vehicle Rental Marketplace**: High-value asset listings (Tesla Model 3, RED Cinema Cameras, Studio Spaces) with daily rates and deposit verification.
- **📋 Micro-Tasking Kanban Board**: Interactive gig workflow (`Open`, `In Progress`, `Under Review`, `Completed & Paid`).
- **💳 Multi-Channel Wallet & Payments**: Minimal, dark-themed payment integration supporting **Visa / Credit Card**, **bKash**, **Nagad**, and **SWIFT Bank Transfer**.
- **🔑 NextAuth.js Google OAuth**: Seamless, resilient Google authentication fallback with local storage session synchronization.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling & Theme:** Tailwind CSS, Pitch Obsidian Dark Theme (`bg-black/90`, `glassmorphism`, `backdrop-blur-xl`)
- **Authentication:** NextAuth.js (Google OAuth & Local JWT Sync)
- **State Management & Data Fetching:** TanStack React Query (`@tanstack/react-query`) & React Hooks
- **Icons & Visuals:** Lucide React, High-Res SVG Logo Assets (`/public/logos/`)
- **Notifications:** React Toastify (`react-toastify`)
- **Image Hosting:** ImgBB API Integration (`src/lib/imgbb.ts`)

---

## 🚀 Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
# API Connection
NEXT_PUBLIC_API_URL=https://nexuspluseai-server.onrender.com/api/v1
NEXT_PUBLIC_APP_NAME="NexusPulse AI"

# NextAuth.js Configuration
NEXTAUTH_URL=https://nexuspulseai-client.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret_key_here
NEXTAUTH_BACKEND_URL=https://nexuspluseai-server.onrender.com/api/v1

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Third-Party Integrations (Optional)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

---

## 🔧 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iMoloy/nexuspluseai-client.git
   cd nexuspluseai-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Verify TypeScript & Production Build:**
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## 🌐 Deploy to Vercel

```bash
npx vercel --prod
```

---

## 👤 Author & Credits

Developed with ❤️ by [iMoloy (Moloy Paul)](https://github.com/iMoloy).  
Copyright © 2026 NexusPulse AI. All Rights Reserved.
