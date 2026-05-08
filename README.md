# Saral Gamification

A pixel-perfect implementation of the Saral platform's **Gamification** feature — a React application that lets campaign managers create time-bound reward systems for their ambassadors.

---

## Live Demo

> 🔗 **[saral-gamification.vercel.app](https://saral-gamification-beta.vercel.app/)**

---

## Features

- **Gamification Landing Page** — hero section with an "Enable Gamification" CTA and three feature highlight cards
- **Reward Creation Modal** — multi-step guided flow:
  - Step 1: Select a reward event (e.g. *Cross $X in sales*, *Posts X times every Y period*, *Is Onboarded*)
  - Step 2: Select a reward incentive (e.g. *Flat $X Bonus*, *Upgrade to Y% commission*)
  - Step 3 _(optional)_: Toggle time-bound and pick an end date — past dates and today are disabled
- **Real-time label updates** — the dropdown trigger reflects the typed value instantly (e.g. `Cross $100 in sales`)
- **Robust Validations** — strict numeric validations (preventing zero and negative inputs) and conditional hover-tooltips for disabled actions.
- **Auto-progression** — saving an event auto-opens the reward dropdown; saving a reward reveals the time-bound toggle
- **Mobile-First Responsiveness** — smart scrollable overlays and bottom-sheet styling ensure the UI never breaks on small devices.
- **Success toast** — animated confirmation badge auto-dismisses after 2.5 seconds

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React 19** (Vite) | Fast HMR, modern ecosystem |
| Styling | **Tailwind CSS v4** | Utility-first, custom `@theme` tokens |
| State | **Redux Toolkit** | Predictable, scalable state for the full modal flow |
| Icons | **Lucide React + Custom SVGs** | Consistent iconography combined with pixel-perfect custom assets |
| Date utilities | **date-fns** | Lightweight, functional date helpers |
| Build | **Vite 8** | Sub-second dev server, optimised bundles |

---

## Project Structure

```
src/
├── main.jsx                    # Entry — Redux Provider + StrictMode
├── App.jsx                     # Root — AppLayout + GamificationPage + RewardModal
├── index.css                   # Global styles + Tailwind @theme tokens
│
├── assets/
│   ├── avatar.jpg              # User avatar asset
│   └── icons/                  # Custom SVG icon components (Bell, Success)
│
├── constants/
│   └── rewardOptions.js        # Event & reward option definitions (single source of truth)
│
├── store/
│   ├── index.js                # Redux store configuration
│   └── gamificationSlice.js   # All gamification state & actions
│
├── pages/
│   └── GamificationPage.jsx   # Hero section + feature cards
│
└── components/
    ├── layout/
    │   ├── AppLayout.jsx       # Sidebar + TopBar + main content wrapper
    │   ├── Sidebar.jsx         # Fixed navigation sidebar
    │   └── TopBar.jsx          # Page header with notification bell & avatar
    │
    ├── modal/
    │   ├── RewardModal.jsx     # Modal shell — orchestrates the multi-step flow
    │   ├── EventDropdown.jsx   # Event selection with inline value input
    │   ├── RewardDropdown.jsx  # Reward selection (auto-opens after event save)
    │   ├── TimeBoundToggle.jsx # Toggle switch + description
    │   ├── DatePicker.jsx      # Custom calendar (past dates disabled)
    │   └── SuccessToast.jsx    # Auto-dismissing creation confirmation
    │
    └── ui/
        ├── Button.jsx          # Reusable button (primary / secondary variants)
        ├── Toggle.jsx          # Accessible toggle switch
        └── Tooltip.jsx         # Validation tooltip (dark, centered)
```

---

## State Management

All UI state lives in a single **Redux slice** (`gamificationSlice`). The flow is intentionally linear:

```
openModal
  → selectEvent → setEventValue → saveEvent
    → selectReward → setRewardValue → saveReward
      → toggleTimeBound → setEndDate
        → createRewardSuccess → dismissSuccess (auto)
```

Each action is atomic. Side effects (like auto-opening the next dropdown) are handled inside the reducer, keeping components thin.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-org/saral-gamification.git
cd saral-gamification

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Scripts

```bash
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
npm run lint     # ESLint check
```

---

## Design Decisions

### Why Redux over `useState`?
The modal flow has multiple interdependent steps with auto-progression logic (saving event → auto-opens reward dropdown). Centralising this in Redux makes the flow easy to trace, test, and extend without prop-drilling through multiple nested components.

### Why a custom DatePicker?
The Figma design specified an exact calendar layout with a specific disabled-date behaviour (past + today = disabled). A custom component gave full control over styling without fighting a third-party library's CSS specificity.

### Why Tailwind v4?
The project uses Tailwind v4's `@theme` directive to define brand tokens (magenta/fuchsia palette) as CSS custom properties. This keeps design tokens in one place and makes future theme updates trivial.

### `rewardOptions.js` as single source of truth
Both the dropdown options and their display labels are co-located in constants. Adding a new event or reward type requires a change in one place only — the components derive everything from the option definition.

---

## Reviewer Notes

- The **Figma design** was matched pixel-by-pixel: modal dimensions, border-radius, custom SVG icons, selected-state pink highlights, and the dark tooltips.
- **Input Validation**: The app strictly enforces positive integers for reward values. Empty or zero values correctly block form submission and display helpful nudges.
- **Responsive Layout**: Dropdowns automatically render outside the modal bounds (upwards or downwards based on available space) to prevent layout jumps
- The **"Create Reward" button** is disabled (with tooltip) until all required fields are filled — matches the Figma tooltip states exactly.
- **Date validation**: `date-fns` ensures only tomorrow onwards is selectable.
- **Accessibility**: Toggle uses `role="switch"` + `aria-checked`; all interactive elements have unique `id` attributes for automated testing.

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Production deploy
vercel --prod
```

Or connect the GitHub repo in the [Vercel dashboard](https://vercel.com) for automatic deployments on every push to `main`.
