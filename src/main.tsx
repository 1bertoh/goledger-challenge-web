import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.tsx'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  // </StrictMode>,
)
