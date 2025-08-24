import { createRoot } from 'react-dom/client'
import { QueryProvider } from './providers/QueryProvider'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </QueryProvider>
);
