# Kredia - Student Ecosystem Platform

Kredia is a premium, modular React web application built for the OAU student community. It aims to transform the student experience by providing a unified ecosystem for skill trading, AI-powered learning, and real-time campus navigation.

## 🚀 Features & Modules

*   **Home (`/`)**: A dynamic landing page with a hero section, marquee ticker, and overviews of the platform's core modules.
*   **Skill Barter (`/barter`)**: A cashless skill trading system where students use credits to exchange value. It features a Credit Wallet and an **Explore the Marketplace** section.
*   **Marketplace (`/marketplace`)**: A dedicated hub to browse and book student-offered Services, Goods, and Academic Tutoring. Features a sidebar for easy filtering.
*   **OAU Brain (`/brain`)**: An AI-powered tutor for OAU-specific courses. It includes a simulated interactive chat interface, exam modes, countdown timers, and weak point detection.
*   **Space Grid (`/grid`)**: A real-time campus navigation tool. Includes interactive venue maps, live crowd simulation, and study pod bookings.

## 🛠 Tech Stack

*   **Framework**: React (Bootstrapped with Vite)
*   **Routing**: React Router Dom
*   **Styling**: Vanilla CSS (Custom design system, CSS Variables, modular architecture)
*   **Icons**: Lucide React

## 📂 Project Structure

```text
kredia-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Shared components
│   │   ├── Footer.jsx      # Global footer
│   │   ├── Navigation.jsx  # Global navigation bar
│   │   └── Ticker.jsx      # Marquee ticker component
│   ├── pages/              # Route components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Marketplace.jsx # Skill Barter Marketplace
│   │   ├── OAUBrain.jsx    # AI Study Module
│   │   ├── SkillBarter.jsx # Skill Barter Module
│   │   └── SpaceGrid.jsx   # Campus Navigation Module
│   ├── App.jsx             # Main router configuration
│   ├── index.css           # Global design system & styles
│   └── main.jsx            # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## 💻 Getting Started

To run this project locally on your machine, follow these steps:

1.  **Navigate to the project directory:**
    ```bash
    cd kredia-app
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Open your browser and visit `http://localhost:5173` to view the application.

## 🎨 Design System

Kredia uses a bespoke design system implemented entirely in CSS (`src/index.css`). It features a premium, dark-mode-inspired aesthetic with carefully selected colors (e.g., `#c8860a` for Barter, `#1a6e4a` for Brain, `#2a4fc8` for Grid) and typography (`Fraunces` for headings, `DM Sans` for body).
