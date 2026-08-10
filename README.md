<div align="center">
  <h1>🎨 NexusPulse AI — Client</h1>
  <p>AI-Powered Micro-Task Gigs, Smart Asset Rentals & Cryptographic Escrow Super-App</p>
  <p>
    <a href="https://nexuspulseai-client.vercel.app"><img src="https://img.shields.io/badge/Vercel-Live_Production-000000?style=for-the-badge&logo=vercel&logoColor=white" /></a>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
    <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" />
  </p>
</div>

---

## 📖 Overview

**NexusPulse AI** is a next-generation Web3-ready super-app ecosystem connecting creators, freelancers, and luxury asset owners through cryptographic Escrow ledgers and Gemini AI dispute mediation.

- 🌐 **Live Production App:** [https://nexuspulseai-client.vercel.app](https://nexuspulseai-client.vercel.app)
- 📡 **Live Backend API:** [https://nexuspluseai-server.onrender.com/api/v1](https://nexuspluseai-server.onrender.com/api/v1)
- 🖥️ **Server Repository:** [`nexuspulseai-server`](https://github.com/iMoloy/nexuspluseai-server)

---

## ✨ Features & Module Breakdown

| Feature / Tab | Icon | Description |
|---------------|------|-------------|
| 🏠 **Explore All** | `✨` | Hero cinematic slider, live platform metrics, capability showcase, and unified dashboard view |
| 🚗 **Asset Rentals** | `🏎️` | Book luxury vehicles (BMW M4, Tesla), cinema cameras (RED, Mac Studio), & studios with Escrow deposits |
| 📋 **Gig Kanban** | `💼` | Interactive micro-tasking workflow tracking (`Open` ➔ `In Progress` ➔ `Under Review` ➔ `Completed & Paid`) |
| 💳 **Escrow Wallet** | `👛` | Ledger balance management, deposit holds, & multi-payout channels (Visa, bKash, Nagad, Bank Transfer) |
| 🤖 **AI Assistant** | `🤖` | Floating modal with Gemini AI Task Spec Generator & AI Dispute Settlement Mediator |
| 👤 **User Profile** | `👤` | Profile management, KYC verification badge, role configuration (`Client`, `Freelancer`, `Asset Owner`) |
| 📜 **Governance** | `📑` | Terms of Escrow, About Us, & 24/7 Support contact portal |
| ☀️/🌙 **Day/Night Theme**| `☀️` | Floating glassmorphic theme toggle button with light/dark persistence across all pages |

---

## 🚀 Key AI & Interactive Capabilities

### 🤖 1. Gemini AI Task Spec Generator & Dispute Mediator
Launch the AI Assistant modal anywhere on the app to:
- **Task Spec Generator:** Input a broad project idea (e.g., *"Build an automated rental engine"*) to generate a structured scope, required stack, estimated timeframe, and recommended milestone budget.
- **Dispute Settlement Mediator:** Submit claim summaries during contract disputes. Gemini AI analyzes deliverable proof and recommends fair percentage split payouts (e.g., 80% Freelancer release / 20% Client refund).

### 🚗 2. Smart Asset & Vehicle Rentals with Escrow
Rent luxury vehicles and high-value workstation gear safely:
- Automated security deposit calculation.
- Owner rating badges and instant insurance lock.
- Real-time rental availability status.

### 📋 3. Micro-Task Kanban Workflow
Complete milestone-driven freelance projects with real-time status transitions:
- `Open` ➔ `In Progress` ➔ `Under Review` ➔ `Completed & Paid`.
- Milestone budget locked securely in Escrow ledger during active work phase.

### 💳 4. Multi-Channel Wallet & Payout System
Support for local and international payment methods:
- **International Card:** Visa / Mastercard / Stripe
- **Local Mobile Financial Services (MFS):** bKash, Nagad
- **Direct Banking:** SWIFT Bank Wire Transfer

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Core Framework** | Next.js 16 (App Router, Turbopack) |
| **UI Library** | React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Custom CSS Design Tokens |
| **Animation** | Framer Motion, CSS Micro-Animations |
| **Icons & Media** | Lucide React, FontAwesome, ImgBB API Integration |
| **Authentication** | NextAuth.js (Google OAuth & Local JWT fallback) |
| **State & Data** | React Hooks, Context API, TanStack Query |
| **Notifications** | React Toastify |

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

# Third-Party Integrations
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on `http://localhost:3000` |
| `npm run build` | Build production bundle (verified 0-error build) |
| `npm run start` | Run production server |
| `npx tsc --noEmit` | Run TypeScript type checking |

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

## 👤 Author & License

Developed with ❤️ by **[Moloy Paul (iMoloy)](https://github.com/iMoloy)**.  
Released under the **MIT License**. Copyright © 2026 NexusPulse AI.
