import './css/App.css'
import Home from './components/home'
import Login from './pages/login'
import Signup from './pages/signup'
import SearchPage from './pages/searchPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/profile'
import ViewProfile from './pages/viewprofile';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/viewProfile/:id" element={<ViewProfile />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
