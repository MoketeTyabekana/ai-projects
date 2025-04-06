import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Add speech recognition polyfill
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
