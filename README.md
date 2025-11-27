# Bellonime - Brutal Anime Explorer

A modern, brutalist-styled anime streaming frontend built with Next.js 15, Tailwind CSS, and Shadcn UI.

## 🚀 Features

- **Brutalist Design**: Bold typography, high contrast, and raw aesthetics.
- **Responsive UI**: Optimized for mobile and desktop with a compact hamburger menu on small screens.
- **Dynamic Content**: Fetches real-time data from the Winbu Scraper API.
- **Catalog System**: Advanced filtering by genre, status, type, and sort order.
- **SEO Optimized**: Dynamic metadata for all pages (Anime, Film, Series, Episode) with Open Graph support.
- **Video Player**: Integrated video player with server selection.
- **Download Links**: Direct download options for episodes and films.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Shadcn UI
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Data Fetching**: Server Components & Client Components

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd winbu-fe
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
    NEXT_PUBLIC_APP_URL=http://localhost:9002
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:9002`.

## 📱 Mobile Optimization

- **Hamburger Menu**: Compact navigation using a Sheet component.
- **Search Bar**: Always visible on mobile for quick access.
- **Responsive Grid**: Content cards adjust automatically to screen size.

## 🔍 SEO

- **Global Metadata**: Configured in `layout.tsx`.
- **Dynamic Metadata**: Generated for each detail page using `generateMetadata`.
- **Open Graph**: Optimized for social media sharing.

## 📂 Project Structure

```
src/
├── app/                # Next.js App Router pages
├── components/         # Reusable UI components
│   ├── content/        # Content-specific components (Card, Grid, Player)
│   ├── layout/         # Layout components (Header, Footer)
│   ├── navigation/     # Navigation components
│   └── ui/             # Shadcn UI primitives
├── lib/                # Utilities and API functions
└── styles/             # Global styles
```

## 📄 License

MIT
