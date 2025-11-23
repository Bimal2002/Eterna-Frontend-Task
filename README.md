# Token Trading Dashboard

Hey there! This is a real-time token trading dashboard inspired by Axiom's Pulse interface. It shows live cryptocurrency prices across three categories with smooth updates and interactive features.

## What's This About?

You know those crypto dashboards where you can track new tokens, trending coins, and migrated projects all in one place? That's what this is. Built it with Next.js because it's fast, and added some nice touches like real-time price updates, search functionality, and sortable columns.

## Getting Started

Pretty straightforward - just clone this, install the stuff, and run it:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` and you're good to go.

## What You'll See

The dashboard has three main sections:

**New Pairs** - Fresh tokens just hitting the market  
**Final Stretch** - Tokens approaching key milestones  
**Migrated** - Established projects that have moved chains

Each token card shows you the important stuff:
- Current price and market cap
- 24-hour price change (green = up, red = down)
- Number of holders and comments
- How old the token is
- Bumps (basically trending indicators)

## Cool Features

**Search Bar** - Type anything to find tokens by name, symbol, or address. Works in real-time.

**Sorting** - Click the little arrows next to column headers to sort by market cap, price, volume, whatever you want.

**Live Updates** - Prices update automatically every few seconds. You'll see the numbers change with smooth color transitions.

**Hover Details** - Mouse over token images to see expanded info cards with charts and stats.

**Filters** - Use the Filter and Advanced buttons to narrow down what you're looking at (coming soon with more options).

## Built With

- Next.js 14 - The React framework that makes everything fast
- TypeScript - Because catching bugs before runtime is nice
- Tailwind CSS - For styling without leaving your HTML
- Redux Toolkit - Keeping all that token data organized
- Radix UI - Accessible components that just work
- Lucide Icons - Clean, modern icons

## How It Works

The app grabs token data and then simulates real-time updates (in production, this would connect to actual WebSocket feeds). Redux manages the state so filtering and sorting happen instantly. Everything's responsive, so it works on your phone or a 4K monitor.
- Active state indicators

### 5. Loading States
- Skeleton loaders during data fetch
- Progressive content loading
- Shimmer effects

## 🎯 Performance Optimizations

- **React.memo**: Memoized components prevent unnecessary re-renders
- **useMemo**: Optimized filtering and calculations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **CSS Optimization**: Tailwind CSS purging

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1920px
- **Large Desktop**: 1920px+

## 🧪 Testing & Quality

- TypeScript strict mode enabled
- ESLint configuration
- Error boundaries for graceful error handling
- Comprehensive type coverage

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Project Structure

Quick rundown of where everything lives:

```
├── app/                    # Next.js app router stuff
│   ├── layout.tsx         # Main layout wrapper
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── features/          # Main feature components
│   │   ├── Header.tsx     # Top nav with search
│   │   ├── TokenItem.tsx  # Individual token card
│   │   └── PageContainer.tsx
│   ├── pages/
│   │   └── HomePage.tsx   # Main dashboard page
│   ├── providers/
│   │   └── StoreProvider.tsx  # Redux setup
│   └── ui/                # Reusable UI components
│       ├── Dialog.tsx
│       ├── Popover.tsx
│       ├── Tooltip.tsx
│       └── DropdownMenu.tsx
├── store/                 # Redux state management
│   ├── store.ts          # Store configuration
│   └── tokens.ts         # Token slice
├── lib/                   # Helper functions
│   ├── utils.ts          # General utilities
│   ├── data.ts           # Mock data
│   └── realtime.ts       # WebSocket simulation
├── types/
│   └── token.ts          # TypeScript types
└── hooks/
    └── useStore.ts       # Redux hooks
```

## Making Changes

Want to tweak something? Here's what you might want to edit:

- **Token data**: Check `lib/data.ts` for the mock tokens
- **Styling**: Most styles are inline with Tailwind, but global stuff is in `app/globals.css`
- **Update frequency**: Change the WebSocket timing in `lib/realtime.ts`
- **Layout spacing**: Adjust padding in `components/features/PageContainer.tsx`

## Building for Production

When you're ready to ship it:

```bash
npm run build
npm start
```

Or just deploy to Vercel - they make it stupidly easy.

## Things to Know

The real-time updates are simulated right now. In production, you'd swap out `lib/realtime.ts` to connect to actual WebSocket endpoints for live blockchain data.

Search is client-side filtering at the moment. For thousands of tokens, you'd want server-side search with debouncing.

All the token images are placeholder URLs - replace them with actual token logos when you have real data.

## Questions?

If something breaks or doesn't make sense, check the browser console first. Most issues are pretty obvious there. Otherwise, the code's pretty well commented - dig into the component files to see what's happening.

---

## Contact

**Bimal Gayali**

- LinkedIn: [linkedin.com/in/bimal-gayali-76085521a](https://www.linkedin.com/in/bimal-gayali-76085521a/)
- Email: bimalgayali@gmail.com
- Phone: +91 9800922490

---

Built for crypto traders who want clean data presentation without all the noise. No ads, no BS, just the info you need.
