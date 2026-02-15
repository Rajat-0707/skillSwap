import './css/App.css'
import Home from './components/home'
import Login from './pages/login'
import Signup from './pages/signup'
import SearchPage from './pages/searchPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/profile'
import ViewProfile from './pages/viewprofile';
import ProtectedRoute from './routeGuards/protectedRoute'
import PublicRoute from './routeGuards/publicRoute'
import Chat from './pages/messages'
import MessagesList from './pages/MessagesList'



function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/viewProfile/:id" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
        <Route path="/message/:id" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/message" element={<ProtectedRoute><MessagesList /></ProtectedRoute>} />


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
