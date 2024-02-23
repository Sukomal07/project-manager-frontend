import './styles/App.css'

import { Route, Routes } from 'react-router-dom'

import Login from './pages/auth/Login'
import ProtectedRoute from './pages/auth/ProtectedRoute';
import Signup from './pages/auth/Signup'
import UnprotectedRoute from './pages/auth/UnprotectedRoute';
import Analytics from './pages/dashboard/Analytics'
import Board from './pages/dashboard/Board'
import Settings from './pages/dashboard/Settings'

function App() {

  return (
    <>
      <Routes>
        <Route element={<UnprotectedRoute />}>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/board' element={<Board />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
