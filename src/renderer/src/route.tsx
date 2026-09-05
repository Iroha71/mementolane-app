import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Create from './pages/task/Create'

function AppRoutes(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/task/create" element={<Create />} />
    </Routes>
  )
}

export default AppRoutes
