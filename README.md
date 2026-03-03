# TechSummit 2026 - Event Schedule App

A modern, responsive, and data-driven one-page website for a 1-day technical conference. This application features a dynamic schedule with real-time filtering, built using a Node.js backend and vanilla frontend technologies.

## 🚀 Features

- **Automated Timeline:** Displays a 1-day schedule starting at 10:00 AM with 6 one-hour technical talks.
- **Smart Transitions:** Automatically includes 10-minute transition periods between talks and a 1-hour lunch break.
- **Real-time Search:** Instantly filter talks by category keywords (e.g., "AI", "Cloud", "Frontend").
- **Responsive Design:** A "Tech Blue" themed UI optimized for both desktop and mobile viewing.
- **Data-Driven Architecture:** Schedule content is decoupled into a JSON file for easy updates without code changes.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3 (Grid & Flexbox), Vanilla JavaScript
- **Data:** JSON-based API

## 📁 Project Structure

```text
tech-event-site/
├── data/
│   └── talks.json      # The "Source of Truth" for event content
├── public/
│   ├── app.js          # Frontend logic: fetching, rendering, and filtering
│   ├── index.html      # Semantic structure of the single-page app
│   └── style.css       # Modern responsive styling and theme
├── server.js           # Express server for static files and Data API
├── package.json        # Project dependencies and scripts
└── .gitignore          # Files to exclude from version control
```

## 💻 Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)

### Installation

1. **Clone or download** the project directory.
2. **Navigate** to the project folder:
   ```bash
   cd tech-event-site
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the App

1. **Start the server**:
   ```bash
   node server.js
   ```
2. **Open your browser** and visit:
   `http://localhost:3000`

## 🧪 Testing the Features

- **Search:** Type "React" or "CSS" in the search bar to see the schedule update instantly.
- **Responsiveness:** Open the browser's Developer Tools and toggle "Device Toolbar" to see the mobile-optimized layout.
- **Update Content:** Modify `data/talks.json` and refresh the page to see your changes reflected in the UI.

---
*Built with ❤️ for TechSummit 2026.*
