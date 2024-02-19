import './styles/App.css'

import { Route, Routes } from 'react-router-dom'

import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Analytics from './pages/dashboard/Analytics'
import Board from './pages/dashboard/Board'
import Settings from './pages/dashboard/Settings'
function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/board' element={<Board />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </>
  )
}

export default App
