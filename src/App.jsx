import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Books from './pages/Books';
import Contact from './pages/Contact';
import CourseDetail from './pages/CourseDetail';
import Lectures from './pages/Lectures';
import PerformanceMonitor from './components/PerformanceMonitor';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <PerformanceMonitor />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/books" element={<Books />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              <Route path="/lecture" element={<Lectures />} />
              <Route path="/lecture/:playlistId" element={<Lectures />} />
              <Route
                path="/lecture/:playlistId/:videoId"
                element={<Lectures />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
