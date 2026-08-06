# NexusPulse AI - Next-Gen Super-App Frontend Client 🎨⚡

The modern Next.js web application for **NexusPulse AI** — an AI-Powered Gig, Rental & Escrow Financial Super-App Ecosystem.

---

## 🚀 Tech Stack & Design System Architecture

- **Framework & Language:** Next.js 16 (App Router), React, TypeScript
- **Styling & Motion:** Tailwind CSS, Framer Motion
- **Typography:** Premium Fontshare Fonts (*General Sans* & *Satoshi*)
- **State Management & Data Fetching:** TanStack Query (`@tanstack/react-query`)
- **In-App Toast Notifications:** `react-toastify`
- **Image Hosting & Avatars:** ImgBB API Helper (`src/lib/imgbb.ts`) & Curated Unsplash Assets
- **Iconography:** Lucide React

---

## 💡 Key UI Dashboards & Components Breakdown

### 1. Brand Navigation Bar (`src/components/layout/Navbar.tsx`)
- Custom Glassmorphism Logo component (`src/components/ui/Logo.tsx`).
- Navigation Tabs (`Explore`, `Asset Rentals`, `Gig Kanban`, `Wallet & Escrow`).
- Live Escrow Balance indicator and Auth Modal trigger.

### 2. High-Converting Hero Section (`src/app/page.tsx`)
- Headline with HSL gradient accents.
- Call-to-Action buttons ("Launch AI Assistant", "Explore Vehicles & Assets", "Gig Kanban Board").
- Live Platform Metrics Ticker ($1.2M+ Secured in Escrow, 4,500+ Assets & Gigs Completed, 99.8% AI Dispute Accuracy).

### 3. Interactive Escrow Wallet Dashboard (`src/components/dashboard/WalletSection.tsx`)
- Available Balance Card & Escrow Hold Balance Card.
- In-App Deposit Modal.
- Real-time Financial Ledger Table (Deposit, Escrow Lock, Release & Refund items with status badges).

### 4. Smart Asset & Vehicle Rental Marketplace (`src/components/dashboard/RentalSection.tsx`)
- Category Filters (`Vehicles`, `Tech & Cameras`, `Workspaces`).
- Unsplash Visual Cards (Tesla Model 3, RED Cinema 8K, Drone, Studio Space).
- Security Deposit badges and Rental Booking Escrow Modal.

### 5. Micro-Tasking Interactive Kanban Board (`src/components/dashboard/KanbanSection.tsx`)
- Live Task Columns (`Open Gigs`, `In Progress`, `Under Review`, `Completed & Paid`).
- Freelancer Assignment, Work Submission & Escrow Payment Approval buttons.

### 6. AI Assistant Modal Widget (`src/components/ai/AiAssistantModal.tsx`)
- Gemini AI Task Spec & Budget Generator.
- AI Dispute Mediator Agent settlement calculator.

### 7. Reusable Component Library (`src/components/ui/`)
- `Button.tsx`: Framer Motion hover effects and loading state spinner.
- `Card.tsx`: Glassmorphism dark container.
- `Badge.tsx`: Color-coded status badge.
- `Input.tsx`: Floating text input with icon support.
- `Modal.tsx`: Framer Motion animated dialog overlay.

---

## 🛠️ Environment Configuration & Setup

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/iMoloy/nexuspluseai-client.git
cd nexuspluseai-client
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to create your local `.env.local` configuration file:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here
NEXT_PUBLIC_APP_NAME="NexusPulse AI"
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 4. Production Build
```bash
npm run build
npm start
```

---

## 🛡️ License & Credits

Built with ❤️ by [iMoloy](https://github.com/iMoloy) for NexusPulse AI.
