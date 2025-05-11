import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginRegister from './Pages/LoginRegister'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </Router>
  )
}

export default App
