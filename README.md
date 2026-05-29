# codemind-ai
{
  "name": "codemind-ai",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })
<!DOCTYPE html>
<html>
  <head><meta charset="UTF-8" /><title>CodeMind AI</title></head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
codemind-ai/
├── index.html        ✅
├── package.json      ✅
├── vite.config.js    ✅
└── src/
    ├── main.jsx      ✅
    └── App.jsx       ✅
