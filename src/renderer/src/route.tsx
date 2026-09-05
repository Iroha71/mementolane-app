import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
function AppRoutes(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default AppRoutes
