import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PracticePage from './pages/PracticePage'
import ResourcePage from './pages/ResourcePage'
import JournalPage from './pages/JournalPage'
import LearnPage from './pages/LearnPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/resources" element={<ResourcePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App