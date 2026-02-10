import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.tsx'
import { AuthProvider } from './authcontext';

createRoot(document.getElementById('root')!).render(

  <AuthProvider>
    <App />
  </AuthProvider>,
)
